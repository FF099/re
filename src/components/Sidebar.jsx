function Sidebar({ appName }) {
  return (
    <aside className="w-[150px] md:w-[230px] min-h-screen shrink-0 bg-slate-800 text-white px-2.5 py-4 md:px-5 md:py-6">
      <h2 className="text-base md:text-[22px] font-bold mb-9">{appName}</h2>

      <nav className="flex flex-col gap-3">
        <a href="#" className="p-3 rounded-md bg-slate-700 text-white">Dashboard</a>
        <a href="#" className="p-3 rounded-md text-slate-300 transition hover:bg-slate-700 hover:text-white">Users</a>
        <a href="#" className="p-3 rounded-md text-slate-300 transition hover:bg-slate-700 hover:text-white">Posts</a>
      </nav>
    </aside>
  )
}
export default Sidebar