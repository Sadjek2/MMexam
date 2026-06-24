import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type TaskStatus = 'Todo' | 'In progress' | 'Done'
export type TaskPriority = 'High' | 'Medium' | 'Low'

export type Task = {
  id: number
  title: string
  category: string
  status: TaskStatus
  priority: TaskPriority
}

type TasksContextType = {
  items: Task[]
  setItems: React.Dispatch<React.SetStateAction<Task[]>>
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: 'Design dashboard layout',
    category: 'Design',
    status: 'In progress',
    priority: 'High',
  },
  {
    id: 2,
    title: 'Set up routing',
    category: 'Development',
    status: 'Done',
    priority: 'Medium',
  },
  {
    id: 3,
    title: 'Add task filters',
    category: 'Productivity',
    status: 'Todo',
    priority: 'Low',
  },
  {
    id: 4,
    title: 'Build analytics charts',
    category: 'Analytics',
    status: 'In progress',
    priority: 'High',
  },
  {
    id: 5,
    title: 'Test localStorage saving',
    category: 'QA',
    status: 'Todo',
    priority: 'Medium',
  },
]

const TasksContext = createContext<TasksContextType | undefined>(undefined)

const STORAGE_KEY = 'taskpilot-tasks'

const loadTasks = (): Task[] => {
  if (typeof window === 'undefined') return defaultTasks
  const saved = localStorage.getItem(STORAGE_KEY)
  if (!saved) return defaultTasks
  try {
    return JSON.parse(saved) as Task[]
  } catch {
    return defaultTasks
  }
}

export function TasksProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Task[]>(() => loadTasks())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  return <TasksContext.Provider value={{ items, setItems }}>{children}</TasksContext.Provider>
}

export function useTasks() {
  const context = useContext(TasksContext)
  if (!context) {
    throw new Error('useTasks must be used inside TasksProvider')
  }
  return context
}

