import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import PropTypes from 'prop-types'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleHomeClick = () => {
    if (window.location.pathname === '/') {
      window.location.reload()
    }
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto py-3 px-4 flex justify-between items-center">
        <Link
          to={'/'}
          onClick={handleHomeClick}
          className="flex gap-2 items-center"
        >
          <img
            src="/icon.png"
            alt="logo"
            width={60}
            height={60}
            className="w-12 h-12 md:w-15 md:h-15"
          />
          <h1 className="font-bold text-lg md:text-xl">STOCKSIGHT</h1>
        </Link>
        <div className="hidden md:flex items-center gap-3">
          <NavLinks handleHomeClick={handleHomeClick} closeMenu={closeMenu} />
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <NavLinks handleHomeClick={handleHomeClick} closeMenu={closeMenu} />
        </div>
      )}
    </nav>
  )
}

const NavLinks = ({ handleHomeClick, closeMenu }) => {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm ${
      isActive
        ? 'bg-secondaryColor text-white hover:opacity-75'
        : 'hover:bg-slate-100'
    } block text-center w-full whitespace-nowrap`

  return (
    <>
      <NavLink
        to={'/'}
        onClick={() => {
          handleHomeClick()
          closeMenu()
        }}
        className={navLinkClass}
      >
        Home
      </NavLink>
      <NavLink to={'/stocks'} onClick={closeMenu} className={navLinkClass}>
        Stock Ranking
      </NavLink>
      <NavLink to={'/agreement'} onClick={closeMenu} className={navLinkClass}>
        Agreement
      </NavLink>
    </>
  )
}

NavLinks.propTypes = {
  handleHomeClick: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
}

export default Navbar
