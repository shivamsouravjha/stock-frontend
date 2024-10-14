import { Link, NavLink } from 'react-router-dom'
import { ModeToggle } from './ModeToggle'

const Navbar = () => {
  const handleHomeClick = () => {
    if (window.location.pathname === '/') {
      window.location.reload()
    }
  }

  return (
    <nav className="w-full fixed top-0 left-0 right-0 bg-white z-50 dark:bg-black">
      <div className="container mx-auto py-3 px-2 flex justify-between">
        <Link to={'/'} onClick={handleHomeClick}>
          <div className="flex gap-2 items-center">
            <img src="/icon.png" alt="logo" width={60} height={60} />
            <h1 className="font-bold">STOCKSIGHT</h1>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <NavLink
            to={'/'}
            onClick={handleHomeClick}
            className={({ isActive }) =>
              isActive
                ? 'px-3 py-1 rounded-md text-sm bg-secondaryColor text-white hover:opacity-75'
                : 'px-3 py-1 hover:bg-slate-100 rounded-md text-sm'
            }
          >
            Home
          </NavLink>
          <NavLink
            to={'/agreement'}
            className={({ isActive }) =>
              isActive
                ? 'px-3 py-1 rounded-md text-sm bg-secondaryColor text-white hover:opacity-75'
                : 'px-3 py-1 hover:bg-slate-100 rounded-md text-sm'
            }
          >
            Agreement
          </NavLink>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
