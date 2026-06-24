import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const statusData = [
  { name: 'Done', value: 9 },
  { name: 'In progress', value: 4 },
  { name: 'Todo', value: 3 },
]

const priorityData = [
  { name: 'High', value: 6 },
  { name: 'Medium', value: 7 },
  { name: 'Low', value: 3 },
]

const COLORS = ['#10b981', '#3b82f6', '#f59e0b']

export default function AnalyticsPage() {
  return (
    <div>
      <h2>Analytics</h2>

      <div className="stats-grid">
        <div className="card">Total tasks: 16</div>
        <div className="card">Done: 9</div>
        <div className="card">In progress: 4</div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Status distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Priority distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={priorityData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}