import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import waveAnimation from '../animation/homepage.json' // Ensure the path is correct

const Homepage = () => {
  const animationContainer = useRef(null)

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current, // Referencing the container
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: waveAnimation, // Using animation JSON
    })

    return () => anim.destroy() // Cleanup on unmount
  }, [])

  const handleButtonClick = () => {
    window.gtag('event', 'button_click', {
      event_category: 'button',
      event_label: 'Discover More',
      value: 1,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-28">
      <div className="flex flex-col items-center justify-center text-center px-5 py-10 container mx-auto">
        {' '}
        {/* Reduced py-20 to py-10 */}
        <h1 className="text-4xl md:text-5xl font-bold text-secondaryColor mb-4 animate-slideInFromTop">
          {' '}
          {/* Reduced mb-5 to mb-4 */}
          Find where your money is invested.
        </h1>
        <p className="text-lg text-secondaryColor mb-6 animate-slideInFromTop">
          {' '}
          {/* Reduced mb-8 to mb-6 */}
          Discover how and where your investments are being managed, and take
          control of your financial future.
        </p>
        <Link to="/scanMutualFunds">
          <button
            onClick={handleButtonClick}
            className="px-6 py-3 rounded-md bg-primaryColor hover:bg-secondaryColor text-white font-semibold shadow-lg transition-transform transform hover:scale-105 animate-slideInFromTop mb-6"
          >
            {' '}
            {/* Added mb-6 */}
            Discover More
          </button>
        </Link>
      </div>

      <div className="flex justify-center">
        <div
          ref={animationContainer}
          className="w-full lg:w-1/2 h-[300px] rounded-lg shadow-md" // Reduced height from 400px to 300px
        />
      </div>
    </div>
  )
}

export default Homepage
