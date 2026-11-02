import Navbar from '../components/Navbar'

function Posts({ users, posts }) {
  // หาชื่อผู้เขียนจาก userId
  const getAuthor = (userId) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : '-'
  }

  return (
    <>
      <Navbar title="Posts" username="Admin" />

      <section className="bg-white p-6 rounded-xl mb-6 shadow-sm overflow-x-auto">
        <h3 className="mb-5 font-bold text-slate-800">โพสทั้งหมด ({posts.length})</h3>

        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">ลำดับ</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">หัวเรื่อง</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">เนื้อหา</th>
              <th className="p-4 bg-slate-50 text-slate-600 border-b border-slate-200">ผู้เขียน</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="p-4 text-slate-700 border-b border-slate-200 align-top">{post.id}</td>
                <td className="p-4 text-slate-700 border-b border-slate-200 align-top font-medium">{post.title}</td>
                <td className="p-4 text-slate-600 border-b border-slate-200 align-top">{post.body}</td>
                <td className="p-4 text-slate-700 border-b border-slate-200 align-top">{getAuthor(post.userId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  )
}

export default Posts