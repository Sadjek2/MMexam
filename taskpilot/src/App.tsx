import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import TasksPage from './pages/TasksPage'
import AnalyticsPage from './pages/AnalyticsPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="sidebar__brand">TaskPilot</div>
          <nav className="sidebar__nav">
            <NavLink to="/" end className="sidebar__link">
              Dashboard
            </NavLink>
            <NavLink to="/tasks" className="sidebar__link">
              Tasks
            </NavLink>
            <NavLink to="/analytics" className="sidebar__link">
              Analytics
            </NavLink>
          </nav>
        </aside>

        <div className="app-main">
          <header className="topbar">
            <h1>TaskPilot</h1>
            <p>Simple task tracker for study and productivity</p>
          </header>

          <main className="content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}