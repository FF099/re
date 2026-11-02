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

import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

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
      <div className="p-10">
        <h2 className="text-2xl font-bold">กำลังโหลดข้อมูล...</h2>
        <p>กรุณารอสักครู่</p>
      </div>
    )
  }

  // Error
  if (error) {
    return (
      <div className="p-10 text-red-500">
        <h2 className="text-2xl font-bold">เกิดข้อผิดพลาด</h2>
        <p>{error}</p>
        <p>กรุณาตรวจสอบ Internet หรือ API</p>
      </div>
    )
  }

  // Dashboard
  return (
    <div className="flex min-h-screen">

      <Sidebar appName="MyDashboard" />

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-3 md:p-6">

        <Navbar title="Dashboard" username="Admin" />

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-[15px] text-slate-500">Total Users</h3>
            <p className="mt-4 text-3xl font-bold text-slate-800">{users.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-[15px] text-slate-500">Total Posts</h3>
            <p className="mt-4 text-3xl font-bold text-slate-800">{posts.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-[15px] text-slate-500">Average Posts</h3>
            <p className="mt-4 text-3xl font-bold text-slate-800">
              {users.length > 0
                ? (posts.length / users.length).toFixed(1)
                : 0}
            </p>
          </div>

        </section>

        {/* Chart */}
        <section className="bg-white p-6 rounded-xl mb-6 shadow-sm overflow-x-auto md:overflow-visible">
          <h3 className="mb-5 font-bold text-slate-800">Posts by User</h3>

          <div className="w-full h-[350px]">
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
        <section className="bg-white p-6 rounded-xl mb-6 shadow-sm overflow-x-auto md:overflow-visible">
          <h3 className="mb-5 font-bold text-slate-800">User List</h3>

          <table className="w-full min-w-[500px] md:min-w-0 border-collapse text-left">
            <thead>
              <tr>
                <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">ID</th>
                <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">Name</th>
                <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 text-slate-700 border-b border-slate-200">{user.id}</td>
                  <td className="p-4 text-slate-700 border-b border-slate-200">{user.name}</td>
                  <td className="p-4 text-slate-700 border-b border-slate-200">{user.email}</td>
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