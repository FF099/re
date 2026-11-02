import Navbar from '../components/Navbar'

function Posts() {
  return (
    <>
      <Navbar title="Posts" username="Admin" />

      <section className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="font-bold text-slate-800">Posts</h3>
        
        <p className='p-5'>TEST</p>
        <p className='p-5'>ทดสอบ</p>
      </section>
    </>
  )
}

export default Posts