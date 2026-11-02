import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `p-3 rounded-md transition hover:bg-slate-700 hover:text-white ${
    isActive ? 'bg-slate-700 text-white' : 'text-slate-300'
  }`

function Sidebar({ appName }) {
  return (
    <aside className="w-[150px] md:w-[230px] min-h-screen shrink-0 bg-slate-800 text-white px-2.5 py-4 md:px-5 md:py-6">
      <h2 className="text-base md:text-[22px] font-bold mb-9">{appName}</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/" end className={linkClass}>Dashboard</NavLink>
        <NavLink to="/users" className={linkClass}>Users</NavLink>
        <NavLink to="/posts" className={linkClass}>Posts</NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar