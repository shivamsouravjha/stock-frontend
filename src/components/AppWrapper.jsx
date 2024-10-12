import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const AppWrapper = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppWrapper
