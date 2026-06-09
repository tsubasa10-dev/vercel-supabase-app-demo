'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Task } from '@/lib/types'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { CheckCircle } from 'lucide-react'

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setTasks(data)
    setIsLoading(false)
  }

  const handleAddTask = (newTask: Task) => {
    setTasks([newTask, ...tasks])
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const handleToggleTask = (id: string, completed: boolean) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed } : t)))
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle size={40} className="text-blue-600" />
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Task Manager
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Organisez vos tâches professionnelles et personnelles</p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <TaskForm onAdd={handleAddTask} />
            </div>
          </div>

          {/* Task List - Main */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-gray-600 mt-4">Chargement des tâches...</p>
              </div>
            ) : (
              <TaskList
                tasks={tasks}
                onTaskDelete={handleDeleteTask}
                onTaskToggle={handleToggleTask}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
