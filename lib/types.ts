export type Task = {
  id: string
  title: string
  description: string | null
  priority: 'low' | 'medium' | 'high'
  category: 'pro' | 'perso'
  completed: boolean
  created_at: string
  updated_at: string
}

export type CreateTaskInput = Omit<Task, 'id' | 'created_at' | 'updated_at'>
export type UpdateTaskInput = Partial<CreateTaskInput>
