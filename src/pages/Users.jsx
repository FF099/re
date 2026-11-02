import Navbar from '../components/Navbar'

function Users({ users, posts }) {
  return (
    <>
      <Navbar title="Users" username="ผู้ดูแลระบบ" />

      <section className="bg-white p-6 rounded-xl mb-6 shadow-sm overflow-x-auto">
        <h3 className="mb-5 font-bold text-slate-800">ผู้ใช้งาน ({users.length})</h3>

        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead>
            <tr>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">รหัส</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">ชื่อ</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">อีเมล</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">เมือง</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">โพส</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50">
                <td className="p-4 text-slate-700 border-b border-slate-200">{user.id}</td>
                <td className="p-4 text-slate-700 border-b border-slate-200">{user.name}</td>
                <td className="p-4 text-slate-700 border-b border-slate-200">{user.email}</td>
                <td className="p-4 text-slate-700 border-b border-slate-200">{user.company.name}</td>
                <td className="p-4 text-slate-700 border-b border-slate-200">
                  {posts.filter((post) => post.userId === user.id).length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Users