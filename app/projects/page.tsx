"use client"
import Link from "next/link"
import { PROJECTS } from '../constants'
import Navbar from '../ui/Navbar'
import ProjectCard from '../ui/ProjectCard'
import { motion } from 'motion/react'
import { useState, useMemo } from 'react'
import { Code, Layout, Brain, Box, ArrowLeft } from 'lucide-react'
import PageWithBorderStrips from '../ui/PageWithBorderStrips'

const filterOptions = [
  { label: 'Full-Stack', value: 'full-stack', icon: Code },
  { label: 'Landing Pages', value: 'landing-page', icon: Layout },
  { label: 'AI/ML', value: 'ai', icon: Brain },
  { label: 'Other', value: 'other', icon: Box },
]

function Page() {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    )
  }

  const clearAll = () => setActiveFilters([])

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return PROJECTS
    return PROJECTS.filter((project) =>
      (project.category ?? []).some((cat) => activeFilters.includes(cat))
    )
  }, [activeFilters])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col items-center"
    >
      <PageWithBorderStrips>
        <motion.div className="w-full border border-[var(--border-color)] flex flex-col items-center">
          <Navbar />
          <main className="w-full flex flex-col pb-16">
            <div className="pt-[var(--section-gap)]" />

            <div className="border-t border-b border-[var(--border-color)]">
              <Link
                href="/#projects"
                className="flex items-center gap-1.5 px-3 h-7 text-xs font-mono text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)] transition-colors w-fit"
              >
                <ArrowLeft size={14} />
                back
              </Link>
            </div>

            <div className="flex flex-col gap-8 pt-8">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-[1.8rem] md:text-[2.8rem] text-[var(--text-color)] font-bold">
                  Projects
                </h1>
                <p className="text-md text-[var(--secondary-text)] mt-2">
                  A showcase of projects built across diverse tech stacks.
                </p>
              </div>

              <hr className="border-[var(--border-color)]/40" />

              <div className="flex text-xs font-mono overflow-x-auto border-t border-b border-[var(--border-color)]">
                <button
                  onClick={clearAll}
                  className={`px-3 h-7 shrink-0 flex items-center border-r border-[var(--border-color)] transition-colors ${
                    activeFilters.length === 0
                      ? 'text-[var(--text-color)] bg-[var(--hover-color)]'
                      : 'text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)]'
                  }`}
                >
                  All
                </button>
                {filterOptions.map((filter) => {
                  const Icon = filter.icon
                  const isActive = activeFilters.includes(filter.value)
                  return (
                    <button
                      key={filter.value}
                      onClick={() => toggleFilter(filter.value)}
                      className={`px-3 h-7 shrink-0 flex items-center gap-1.5 border-r border-[var(--border-color)] last:border-r-0 transition-colors ${
                        isActive
                          ? 'text-[var(--text-color)] bg-[var(--hover-color)]'
                          : 'text-[var(--secondary-text)] hover:text-[var(--text-color)] hover:bg-[var(--hover-color)]'
                      }`}
                    >
                      <Icon size={14} />
                      {filter.label}
                    </button>
                  )
                })}
              </div>

              <motion.div
                key={activeFilters.join(',')}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.projectName} {...project} />
                ))}
              </motion.div>
            </div>
          </main>
        </motion.div>
      </PageWithBorderStrips>
    </motion.div>
  )
}

export default Page
