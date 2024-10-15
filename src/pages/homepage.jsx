import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-28">
      <div className="flex flex-col items-center justify-center text-center px-5 py-20 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-secondaryColor mb-5 animate-slideInFromTop">
          Find where your money is invested.
        </h1>
        <p className="text-lg text-secondaryColor mb-8 animate-slideInFromTop">
          Discover how and where your investments are being managed, and take
          control of your financial future.
        </p>

        <Link to="/scanMutualFunds">
          <button className="px-6 py-3 rounded-md bg-primaryColor hover:bg-secondaryColor text-white font-semibold shadow-lg transition-transform transform hover:scale-105 animate-slideInFromTop">
            Discover More
          </button>
        </Link>
      </div>

      <div className="flex justify-center">
        <img
          src="https://via.placeholder.com/600x400"
          alt="Investment graphic"
          className="w-full lg:w-1/2 h-auto rounded-lg shadow-md mb-10"
        />
      </div>
    </div>
  )
}

export default Homepage
