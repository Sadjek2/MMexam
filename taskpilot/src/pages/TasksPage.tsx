import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

type TaskStatus = 'Todo' | 'In progress' | 'Done'
type TaskPriority = 'High' | 'Medium' | 'Low'

type Task = {
  id: number
  title: string
  status: TaskStatus
  priority: TaskPriority
  category: string
}

const tasks: Task[] = [
  { id: 1, title: 'Сделать структуру проекта', status: 'Done', priority: 'High', category: 'Study' },
  { id: 2, title: 'Подключить роутинг', status: 'Done', priority: 'High', category: 'Study' },
  { id: 3, title: 'Сверстать sidebar', status: 'Done', priority: 'Medium', category: 'UI' },
  { id: 4, title: 'Сделать карточки dashboard', status: 'In progress', priority: 'Medium', category: 'UI' },
  { id: 5, title: 'Добавить список задач', status: 'In progress', priority: 'High', category: 'Tasks' },
  { id: 6, title: 'Сделать поиск', status: 'Todo', priority: 'High', category: 'Tasks' },
  { id: 7, title: 'Сделать фильтр статуса', status: 'Todo', priority: 'Medium', category: 'Tasks' },
  { id: 8, title: 'Сделать сортировку', status: 'Todo', priority: 'Medium', category: 'Tasks' },
  { id: 9, title: 'Добавить графики', status: 'Todo', priority: 'High', category: 'Analytics' },
  { id: 10, title: 'Проверить localStorage', status: 'In progress', priority: 'Medium', category: 'Storage' },
  { id: 11, title: 'Написать README', status: 'Todo', priority: 'Low', category: 'Docs' },
  { id: 12, title: 'Сделать deploy', status: 'Todo', priority: 'High', category: 'Deploy' },
  { id: 13, title: 'Подготовить защиту', status: 'Todo', priority: 'High', category: 'Exam' },
  { id: 14, title: 'Сделать форму добавления', status: 'Todo', priority: 'High', category: 'Forms' },
  { id: 15, title: 'Проверить стили', status: 'In progress', priority: 'Low', category: 'UI' },
  { id: 16, title: 'Протестировать страницы', status: 'Todo', priority: 'Medium', category: 'Tests' },
]

const priorityRank: Record<TaskPriority, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
}

const taskSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(2, 'Category is required'),
  status: z.enum(['Todo', 'In progress', 'Done']),
  priority: z.enum(['High', 'Medium', 'Low']),
})

type TaskFormValues = z.infer<typeof taskSchema>

export default function TasksPage() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'All' | TaskStatus>('All')
  const [sortBy, setSortBy] = useState<'priority-desc' | 'priority-asc' | 'title-asc'>('priority-desc')
  const [items, setItems] = useState<Task[]>(tasks)
  const [open, setOpen] = useState(false)

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '',
      category: '',
      status: 'Todo',
      priority: 'Medium',
    },
  })

  const visibleTasks = useMemo(() => {
    const filtered = items.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === 'All' || task.status === status
      return matchesSearch && matchesStatus
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'priority-desc') return priorityRank[b.priority] - priorityRank[a.priority]
      if (sortBy === 'priority-asc') return priorityRank[a.priority] - priorityRank[b.priority]
      return a.title.localeCompare(b.title, 'ru')
    })

    return sorted
  }, [items, search, status, sortBy])

  const onSubmit = (data: TaskFormValues) => {
    setItems((prev) => [
      {
        id: Date.now(),
        title: data.title,
        category: data.category,
        status: data.status,
        priority: data.priority,
      },
      ...prev,
    ])
    form.reset()
    setOpen(false)
  }

  return (
    <div>
      <div className="page-head">
        <h2>Tasks</h2>
        <button className="button" onClick={() => setOpen(true)}>
          Add task
        </button>
      </div>

      <div className="toolbar">
        <input
          className="input"
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="input" value={status} onChange={(e) => setStatus(e.target.value as 'All' | TaskStatus)}>
          <option value="All">All statuses</option>
          <option value="Todo">Todo</option>
          <option value="In progress">In progress</option>
          <option value="Done">Done</option>
        </select>

        <select className="input" value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)}>
          <option value="priority-desc">Priority high → low</option>
          <option value="priority-asc">Priority low → high</option>
          <option value="title-asc">Title A → Z</option>
        </select>
      </div>

      <div className="task-list">
        {visibleTasks.map((task) => (
          <article key={task.id} className="task-card">
            <div className="task-card__top">
              <strong>{task.title}</strong>
              <span className={`badge badge--${task.status.replace(' ', '-').toLowerCase()}`}>{task.status}</span>
            </div>
            <div className="task-card__meta">
              <span>{task.category}</span>
              <span>{task.priority}</span>
            </div>
          </article>
        ))}
      </div>

      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="page-head">
              <h3>Add new task</h3>
              <button className="button button--ghost" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
              <label>
                Title
                <input className="input" {...form.register('title')} />
                {form.formState.errors.title && <span className="error">{form.formState.errors.title.message}</span>}
              </label>

              <label>
                Category
                <input className="input" {...form.register('category')} />
                {form.formState.errors.category && <span className="error">{form.formState.errors.category.message}</span>}
              </label>

              <label>
                Status
                <select className="input" {...form.register('status')}>
                  <option value="Todo">Todo</option>
                  <option value="In progress">In progress</option>
                  <option value="Done">Done</option>
                </select>
              </label>

              <label>
                Priority
                <select className="input" {...form.register('priority')}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </label>

              <button className="button" type="submit">
                Save task
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}