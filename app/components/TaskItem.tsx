'use client'

import { Task } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import { Trash2, Check } from 'lucide-react'
import { useState } from 'react'

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
}

const categoryColors = {
  pro: 'bg-purple-100 text-purple-800',
  perso: 'bg-green-100 text-green-800',
}

export default function TaskItem({ task, onDelete, onToggle }: {
  task: Task
  onDelete: (id: string) => void
  onToggle: (id: string, completed: boolean) => void
}) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await supabase.from('tasks').delete().eq('id', task.id)
    onDelete(task.id)
    setIsDeleting(false)
  }

  const handleToggle = async () => {
    await supabase
      .from('tasks')
      .update({ completed: !task.completed, updated_at: new Date().toISOString() })
      .eq('id', task.id)
    onToggle(task.id, !task.completed)
  }

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
        task.completed
          ? 'bg-gray-50 border-gray-200'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <button
        onClick={handleToggle}
        className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {task.completed && <Check size={16} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-lg ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
            {task.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`text-xs font-medium px-2 py-1 rounded ${priorityColors[task.priority]}`}>
            {task.priority === 'low' && '🔵 Basse'}
            {task.priority === 'medium' && '🟡 Moyenne'}
            {task.priority === 'high' && '🔴 Haute'}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded ${categoryColors[task.category]}`}>
            {task.category === 'pro' ? '💼 Pro' : '🏠 Perso'}
          </span>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-shrink-0 text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
      >
        <Trash2 size={20} />
      </button>
    </div>
  )
}
