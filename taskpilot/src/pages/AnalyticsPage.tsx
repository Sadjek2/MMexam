import { useTasks } from '../TasksContext'

export default function AnalyticsPage() {
  const { items } = useTasks()

  const totalTasks = items.length
  const doneTasks = items.filter((task) => task.status === 'Done').length
  const inProgressTasks = items.filter((task) => task.status === 'In progress').length
  const todoTasks = items.filter((task) => task.status === 'Todo').length

  return (
    <div>
      <h2>Analytics</h2>
      <div className="stats-grid">
        <div className="card">Total tasks: {totalTasks}</div>
        <div className="card">Done: {doneTasks}</div>
        <div className="card">In progress: {inProgressTasks}</div>
        <div className="card">Todo: {todoTasks}</div>
      </div>
    </div>
  )
}