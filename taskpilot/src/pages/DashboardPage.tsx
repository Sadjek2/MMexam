import { useTasks } from '../TasksContext'

export default function DashboardPage() {
  const { items } = useTasks()

  const totalTasks = items.length
  const doneTasks = items.filter((task) => task.status === 'Done').length
  const inProgressTasks = items.filter((task) => task.status === 'In progress').length

  return (
    <div>
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="card">Total tasks: {totalTasks}</div>
        <div className="card">Done: {doneTasks}</div>
        <div className="card">In progress: {inProgressTasks}</div>
      </div>
    </div>
  )
}