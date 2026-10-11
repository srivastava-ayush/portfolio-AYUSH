---
title: "I Made My NVIDIA RTX 3050 Manually Switchable on Arch Linux"
desc: "gpu-off / gpu-on / gpu-status — controlling the discrete GPU through PCI power management"
date: "2026-10-11"
tags: ["linux", "arch", "nvidia", "power"]
links:
  - "https://github.com/srivastava-ayush/gpu-powerctl"
---

I run Arch Linux with Hyprland on an ASUS TUF Gaming A15. It has a Ryzen 7 4800H, 16 GB of RAM, and an NVIDIA RTX 3050 Mobile GPU.

For most of my daily work, I don't need the NVIDIA GPU. I'm usually writing code, browsing the web, using the terminal, or working on my desktop. The integrated AMD GPU is perfectly capable of handling all of that.

So why keep the RTX 3050 running when I'm not using it?

I wanted a simple way to turn the NVIDIA GPU off when I was on battery and turn it back on whenever I needed it. No rebooting, no switching display managers, and no complicated GPU profile setup.

Just three commands:

```bash
gpu-off
gpu-on
gpu-status
```

Getting there took a bit more digging than I expected.

## The problem: my NVIDIA GPU wouldn't stay out of the way

My laptop's battery consumption wasn't always where I wanted it to be. Depending on what was running and how the system was behaving, I saw discharge rates around 12–14 W in some tests, with other readings reaching 18–19 W.

These numbers weren't from a controlled benchmark, so I wouldn't treat them as a precise before-and-after comparison. Still, I wanted to find out how much the NVIDIA GPU was contributing.

I checked the GPU with `nvidia-smi`. At one point, it reported roughly 1 MiB of VRAM usage, 2% GPU utilization, and 17 W of power consumption.

That looked suspicious, especially when I wasn't intentionally running anything on the GPU.

I also checked which processes were accessing the NVIDIA device files:

```bash
sudo fuser -v /dev/nvidia*
```

There weren't any obvious users holding the device at that point.

That didn't prove the GPU was doing absolutely nothing, but it gave me a reason to look beyond ordinary application processes and investigate PCI power management.

## First, I checked how my display was connected

Hyprland was running on Wayland, and my internal display showed up as:

```text
eDP-1
1920x1080@144Hz
```

The laptop uses AMD integrated graphics alongside the NVIDIA GPU. My goal was to leave the AMD GPU handling the desktop while keeping the RTX 3050 available only when I explicitly needed it.

This distinction matters. I wasn't trying to disable graphics altogether. I wanted to stop using the discrete GPU for my everyday desktop session.

## Runtime D3 was enabled, but that wasn't enough

Linux and the NVIDIA driver support runtime power management, which can put a device into a low-power state when it's not being used.

I checked the NVIDIA driver's reported Runtime D3 status and found:

```text
Runtime D3 status: Enabled (fine-grained)
```

The hardware also reported support for Video Memory Self Refresh and Video Memory Off.

So the necessary power-management support was there.

But having Runtime D3 enabled doesn't mean the GPU will always stay suspended. Something can still access the device, causing it to wake up. And if the device never becomes idle enough, it might not suspend in the first place.

I had already spent time looking into power-management tools and GPU-switching options. Rather than adding another layer of configuration, I decided to test what happened if I detached the NVIDIA GPU from its driver directly.

## The experiment that worked: unbinding the GPU

Linux exposes PCI devices through sysfs. My NVIDIA GPU appeared at:

```text
0000:01:00.0
```

Its HDMI audio function appeared separately at:

```text
0000:01:00.1
```

The GPU was using the `nvidia` driver, while its audio function was using `snd_hda_intel`.

I started by unbinding the audio function:

```bash
sudo sh -c 'echo 0000:01:00.1 > /sys/bus/pci/drivers/snd_hda_intel/unbind'
```

Then I unbound the GPU itself:

```bash
sudo sh -c 'echo 0000:01:00.0 > /sys/bus/pci/drivers/nvidia/unbind'
```

After that, I ran:

```bash
nvidia-smi
```

It returned:

```text
Failed to initialize NVML: No supported GPUs were found
```

That was expected. I'd detached the GPU from the NVIDIA driver, so NVIDIA's management utility could no longer communicate with it normally.

But there was a catch.

**The GPU being unbound didn't mean it was powered down.**

## Unbinding the driver and suspending the device are two different things

After unbinding the devices, I checked their power-management state.

Initially, the GPU still showed:

```text
runtime_status: active
power/control: on
```

So I'd stopped the NVIDIA driver from managing the GPU, but the device was still active.

This was the part I initially needed to get right.

I changed the PCI runtime power-management setting to `auto` for both functions:

```bash
echo auto | sudo tee /sys/bus/pci/devices/0000:01:00.0/power/control
echo auto | sudo tee /sys/bus/pci/devices/0000:01:00.1/power/control
```

Then I gave the system a few seconds:

```bash
sleep 5
```

Finally, I checked the GPU's runtime status:

```bash
cat /sys/bus/pci/devices/0000:01:00.0/power/runtime_status
```

This time, I got:

```text
suspended
```

That was the result I was looking for.

The important part wasn't just unbinding the driver. It was combining that with PCI runtime power management so the device could actually enter its suspended state.

## Turning the experiment into three commands

Running these commands manually every time would get old pretty quickly. I wanted something I could use from my terminal without remembering the whole sequence.

So I created three scripts: `gpu-off`, `gpu-on`, and `gpu-status`.

### `gpu-off`

This script handles the shutdown side of the process:

- Checks the current GPU state.
- Unbinds the NVIDIA audio function.
- Unbinds the NVIDIA GPU.
- Sets PCI runtime power management to `auto`.
- Waits for the device to suspend and reports its state.

I can now run:

```bash
gpu-off
```

And check whether the GPU actually suspended:

```bash
gpu-status
```

The key is that the script doesn't just report that the GPU was unbound. The runtime power state matters too.

### `gpu-on`

Sometimes I need the NVIDIA GPU, whether for GPU-accelerated work or something else that depends on it.

For that, I use:

```bash
gpu-on
```

The script reverses the process: it brings the PCI devices back into an appropriate power state, rebinds the NVIDIA driver and audio function, and checks that the GPU is available again.

I verify it with:

```bash
nvidia-smi
```

Once the driver has successfully reattached, the RTX 3050 should show up normally.

### `gpu-status`

I didn't want to guess whether the GPU was on or off based on which command I last ran.

So I added:

```bash
gpu-status
```

It checks the driver's binding state and the PCI runtime power state. That gives me a better picture of what's actually happening.

For example, a GPU can be unbound but still active. Reporting only one of those states would be misleading.

## Making the commands work without a password prompt

The PCI driver interfaces require root privileges, so the scripts need elevated permissions.

I didn't want to type my password every time I wanted to switch the GPU. But I also didn't want to give my user unrestricted passwordless root access.

I used a dedicated sudoers rule instead.

I created the configuration with:

```bash
sudo visudo -f /etc/sudoers.d/gpu-control
```

And added:

```text
ayush ALL=(root) NOPASSWD: /usr/local/bin/gpu-off, /usr/local/bin/gpu-on, /usr/local/bin/gpu-status
```

This allows the specified scripts to run through `sudo` without a password prompt.

I also made sure the scripts were owned by root:

```bash
sudo chown root:root \
  /usr/local/bin/gpu-off \
  /usr/local/bin/gpu-on \
  /usr/local/bin/gpu-status
```

And set their permissions:

```bash
sudo chmod 755 \
  /usr/local/bin/gpu-off \
  /usr/local/bin/gpu-on \
  /usr/local/bin/gpu-status
```

This is worth getting right. A script that can execute as root must not be writable by an ordinary user.

One detail to keep in mind: the sudoers rule authorizes those exact paths, not arbitrary commands with the same names. The scripts and their execution paths should remain root-controlled, and the rule should be validated with `visudo`.

I also added Zsh aliases so I could use the commands directly:

```bash
echo 'alias gpu-off="sudo -n /usr/local/bin/gpu-off"' >> ~/.zshrc
echo 'alias gpu-on="sudo -n /usr/local/bin/gpu-on"' >> ~/.zshrc
echo 'alias gpu-status="sudo -n /usr/local/bin/gpu-status"' >> ~/.zshrc
```

Then reloaded the configuration:

```bash
source ~/.zshrc
```

Now I can switch the GPU from anywhere in my terminal.

## What about applications that wake the GPU?

This was one of the reasons I wanted manual control in the first place.

I use Hyprland with Caelestia Shell, and I noticed that some desktop interactions could wake the NVIDIA GPU. I also investigated which processes were accessing the NVIDIA device files and found that Hyprland and `rog-control-center` could be involved in GPU activity.

That doesn't mean every interaction or every process will always wake the GPU. It means that simply leaving the NVIDIA driver loaded and hoping runtime power management handles everything wasn't giving me the level of control I wanted.

Unbinding the GPU changes the situation. While it remains unbound, ordinary applications can't use it through the NVIDIA driver.

When I need it, I can rebind it explicitly.

That's the main advantage of this setup: **the GPU isn't just expected to stay idle; it's made unavailable through the NVIDIA driver until I turn it back on.**

## Why I went with this instead of another GPU-switching tool

I had looked into tools such as Optimus Manager and other power-management options. But for this particular setup, I wanted a small, reversible mechanism that worked with my existing Wayland desktop.

I didn't need a different display configuration or a reboot-based switching workflow. I wanted to control the PCI device directly.

The approach is straightforward:

1. Unbind the NVIDIA audio function and GPU.
2. Set both PCI functions to runtime power management `auto`.
3. Wait for the GPU to suspend.
4. Rebind the devices when NVIDIA functionality is needed again.

There are trade-offs, of course. While the GPU is unbound, applications that depend on it won't be able to use it. The scripts also need to handle driver binding and device power transitions correctly, and a failed rebind can require troubleshooting.

This isn't a replacement for every feature provided by a dedicated GPU-switching tool. It's simply the approach that worked for the behavior I wanted on my laptop.

## A few things this doesn't prove

There are two distinctions worth making.

First, `runtime_status: suspended` confirms that Linux considers the device runtime-suspended. By itself, it isn't a measurement of the exact electrical power being drawn by the GPU.

Second, getting the GPU suspended doesn't automatically tell me how much battery life I've gained. Total system consumption also depends on the CPU, screen brightness and refresh rate, background processes, Wi-Fi, and other hardware.

I'd need controlled before-and-after power measurements to put a reliable number on the improvement.

So I'm not going to claim that this saves a particular number of watts or gives me a fixed amount of extra battery life. What I confirmed is that the GPU could reach the suspended state while detached from its NVIDIA driver.

## How I use it now

For normal coding, browsing, and battery-powered work:

```bash
gpu-off
gpu-status
```

When I need the NVIDIA GPU:

```bash
gpu-on
nvidia-smi
```

And when I'm done:

```bash
gpu-off
```

The AMD integrated GPU continues handling my normal desktop workload, while the RTX 3050 can remain suspended until I explicitly bring it back.

No reboot needed.

## Final thoughts

This was a useful reminder that Linux power management involves more than installing a battery-saving utility and enabling a profile.

In this case, the important distinction was between detaching a device from its driver and actually getting it into a low-power state. Unbinding the GPU alone wasn't enough; setting PCI runtime power management to `auto` was the missing part of the experiment.

The result is a small set of commands that gives me direct control over my RTX 3050 on Arch Linux.

It's not a universal solution for every laptop, and the PCI addresses, drivers, and device dependencies will differ across machines. But on my ASUS TUF Gaming A15, I confirmed that the GPU could be unbound, enter the suspended state, and become available again without rebooting.

That's exactly the workflow I wanted.
