
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // เรียก API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, postResponse] = await Promise.all([
          fetch('https://jsonplaceholder.typicode.com/users'),
          fetch('https://jsonplaceholder.typicode.com/posts')
        ])

        if (!userResponse.ok || !postResponse.ok) {
          throw new Error('ไม่สามารถโหลดข้อมูลจาก API ได้')
        }

        const userData = await userResponse.json()
        const postData = await postResponse.json()

        console.log('Users:', userData)
        console.log('Posts:', postData)

        setUsers(userData)
        setPosts(postData)

      } catch (err) {
        console.error('API Error:', err)
        setError(err.message)

      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // เตรียมข้อมูลกราฟ
  const chartData = users.map((user) => ({
    name: user.name.split(' ')[0],
    posts: posts.filter((post) => post.userId === user.id).length
  }))

  // Loading
  if (loading) {
    return (
      <div style={{ padding: '40px' }}>
        <h2>กำลังโหลดข้อมูล...</h2>
        <p>กรุณารอสักครู่</p>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div style={{ padding: '40px', color: 'red' }}>
        <h2>เกิดข้อผิดพลาด</h2>
        <p>{error}</p>
        <p>กรุณาตรวจสอบ Internet หรือ API</p>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2>MyDashboard</h2>

        <nav>
          <a href="#" className="active">Dashboard</a>
          <a href="#">Users</a>
          <a href="#">Posts</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">

        {/* Navbar */}
        <header className="navbar">
          <h2>Dashboard</h2>
          <span>Admin</span>
        </header>

        {/* Summary Cards */}
        <section className="cards">

          <div className="card">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>

          <div className="card">
            <h3>Total Posts</h3>
            <p>{posts.length}</p>
          </div>

          <div className="card">
            <h3>Average Posts</h3>
            <p>
              {users.length > 0
                ? (posts.length / users.length).toFixed(1)
                : 0}
            </p>
          </div>

        </section>

        {/* Chart */}
        <section className="content">
          <h3>Posts by User</h3>

          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* User Table */}
        <section className="content">
          <h3>User List</h3>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  )
}

export default App
