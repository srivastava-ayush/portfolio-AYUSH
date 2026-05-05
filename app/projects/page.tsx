"use client"
import {PROJECTS} from '../constants'
import Navbar from '../ui/Navbar'
import ProjectCard from '../ui/ProjectCard'
import { motion } from 'motion/react'
import { useState, useMemo } from 'react'
import { Grid, Code, Layout, Database, Brain, Box, X } from 'lucide-react'

function Page() {

  const filterOptions = [
    { label: 'Full-Stack', value: 'full-stack', icon: Code },
    { label: 'Landing Pages', value: 'landing-page', icon: Layout },
    { label: 'Frontend', value: 'frontend', icon: Layout },
    { label: 'Backend', value: 'backend', icon: Database },
    { label: 'AI/ML', value: 'ai', icon: Brain },
    { label: 'Other', value: 'other', icon: Box },
  ];

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
  };

  const clearAll = () => setActiveFilters([]);

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return PROJECTS;
    return PROJECTS.filter((project) =>
      (project.category ?? []).some((cat) => activeFilters.includes(cat))
    );
  }, [activeFilters]);

  return (

    <div className='min-h-[130vh] pt-30 pb-16 px-2 flex flex-col  items-center'>
<Navbar />
<motion.main initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{duration:1}} className='  w-full max-w-3xl flex flex-col gap-8'>
      
      <motion.span
        initial={{ opacity: 0, top: "-100px" }}
        animate={{ opacity: 1, top: 0 }}
        transition={{ duration: 1 }}
        className="fixed pointer-events-none z-0 top-0 left-0 w-[60%] h-24 bg-(--blob-color) blur-[200px]"
      />
      <div className='flex flex-col items-center '>
        <h1 className='text-[1.8rem] md:text-[2.8rem] text-[var(--text-color)] font-bold'>Projects</h1>
<p className='text-md text-[var(--secondary-text)]'>A showcase of projects built across diverse tech stacks.</p>
</div>


<hr className='text-[var(--border-color)]/30' />

<div className='flex flex-col items-center gap-4'>
<div className='flex flex-wrap gap-2 justify-center'>
  <button
    onClick={clearAll}
    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
      activeFilters.length === 0
        ? 'bg-[var(--accent-color)]/10 text-white border-[var(--accent-color)]'
        : 'bg-transparent text-[var(--secondary-text)] border-[var(--border-3-color)] hover:border-[var(--accent-color)] hover:text-[var(--text-color)]'
    }`}
  >
    <Grid size={16} />
    <span>All</span>
  </button>
  {filterOptions.map((filter) => {
    const Icon = filter.icon;
    const isActive = activeFilters.includes(filter.value);
    return (
      <button
        key={filter.value}
        onClick={() => toggleFilter(filter.value)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
          isActive
            ? 'bg-[var(--accent-color)]/5 text-white border-[var(--accent-color)]'
            : 'bg-transparent text-[var(--secondary-text)] border-[var(--border-3-color)] hover:border-[var(--accent-color)] hover:text-[var(--text-color)]'
        }`}
      >
        <Icon size={16} />
        <span>{filter.label}</span>
      </button>
    );
  })}
</div>
{activeFilters.length > 0 && (
  <button onClick={clearAll} className='text-xs text-[var(--secondary-text)] hover:text-[var(--accent-color)] transition-colors flex items-center gap-1'>
    <X size={12} />
    Clear all filters
  </button>
)}
</div>

<motion.div key={activeFilters.join(',')} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{duration:.2}} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
{filteredProjects.map((project)=> {
  return (
    <ProjectCard key={project.projectName} {...project} />
  )
})}
</motion.div>
</motion.main>
    </div>
  )
}

export default Page
