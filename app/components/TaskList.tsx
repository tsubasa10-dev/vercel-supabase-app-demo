'use client'

import { Task } from '@/lib/types'
import TaskItem from './TaskItem'
import { useState } from 'react'

type FilterOption = 'all' | 'pro' | 'perso' | 'completed' | 'pending'

export default function TaskList({
  tasks,
  onTaskDelete,
  onTaskToggle,
}: {
  tasks: Task[]
  onTaskDelete: (id: string) => void
  onTaskToggle: (id: string, completed: boolean) => void
}) {
  const [filter, setFilter] = useState<FilterOption>('all')

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pro') return task.category === 'pro'
    if (filter === 'perso') return task.category === 'perso'
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    pro: tasks.filter((t) => t.category === 'pro').length,
    perso: tasks.filter((t) => t.category === 'perso').length,
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
          <div className="text-xs text-blue-600">Total</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-800">{stats.completed}</div>
          <div className="text-xs text-green-600">Complétées</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="text-2xl font-bold text-orange-800">{stats.pending}</div>
          <div className="text-xs text-orange-600">En attente</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="text-2xl font-bold text-purple-800">{stats.pro}</div>
          <div className="text-xs text-purple-600">Professionnel</div>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
          <div className="text-2xl font-bold text-pink-800">{stats.perso}</div>
          <div className="text-xs text-pink-600">Personnel</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Toutes
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          En attente
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'completed'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Complétées
        </button>
        <button
          onClick={() => setFilter('pro')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'pro'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          💼 Pro
        </button>
        <button
          onClick={() => setFilter('perso')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === 'perso'
              ? 'bg-pink-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          🏠 Perso
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-gray-500 text-lg">
              {filter === 'all'
                ? 'Aucune tâche. Créez-en une!'
                : `Aucune tâche dans cette catégorie`}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={onTaskDelete}
              onToggle={onTaskToggle}
            />
          ))
        )}
      </div>
    </div>
  )
}
