import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Posts from './pages/Posts'

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

        setUsers(await userResponse.json())
        setPosts(await postResponse.json())

      } catch (err) {
        console.error('API Error:', err)
        setError(err.message)

      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  return (
    <div className="flex min-h-screen">
      <Sidebar appName="MyDashboard" />

      <main className="flex-1 min-w-0 p-3 md:p-6">
        <Routes>
          <Route path="/" element={<Dashboard users={users} posts={posts} />} />
          <Route path="/users" element={<Users users={users} posts={posts} />} />
          <Route path="/posts" element={<Posts users={users} posts={posts} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App