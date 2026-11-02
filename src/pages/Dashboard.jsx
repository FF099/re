import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

import Navbar from '../components/Navbar'

function Dashboard({ users, posts }) {
  // เตรียมข้อมูลกราฟ
  const chartData = users.map((user) => ({
    name: user.name.split(' ')[0],
    posts: posts.filter((post) => post.userId === user.id).length
  }))

  return (
    <>
      <Navbar title="Dashboard" username="ผู้ดูแลระบบ" />

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-[15px] text-slate-500">ผู้ใช้งานทั้งหมด</h3>
          <p className="mt-4 text-3xl font-bold text-slate-800">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-[15px] text-slate-500">โพสทั้งหมด</h3>
          <p className="mt-4 text-3xl font-bold text-slate-800">{posts.length}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-[15px] text-slate-500">โพสโดยเฉลี่ย</h3>
          <p className="mt-4 text-3xl font-bold text-slate-800">
            {users.length > 0
              ? (posts.length / users.length).toFixed(1)
              : 0}
          </p>
        </div>

      </section>

      {/* Chart */}
      <section className="bg-white p-6 rounded-xl mb-6 shadow-sm overflow-x-auto md:overflow-visible">
        <h3 className="mb-5 font-bold text-slate-800">โพสโดยผู้ใช้งาน</h3>

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
    </>
  )
}

export default Dashboard