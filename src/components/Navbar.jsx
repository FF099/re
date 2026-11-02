function Navbar({ title, username }) {
  return (
    <header className="flex justify-between items-center bg-white p-5 rounded-xl mb-6 shadow-sm">
      <h2 className="text-[22px] font-bold">{title}</h2>
      <span>{username}</span>
    </header>
  )
}
export default Navbar