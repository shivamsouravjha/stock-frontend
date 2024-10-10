import PropTypes from 'prop-types'

const Button = ({ title, icon, ...props }) => {
  return (
    <button
      className="flex bg-slate-200 hover:bg-slate-300 px-3 py-2 rounded-md gap-2"
      {...props}
    >
      {icon} {title}
    </button>
  )
}

Button.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
}

export default Button
