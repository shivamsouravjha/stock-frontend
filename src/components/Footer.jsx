import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-gray-200">
      <div className="container mx-auto px-4 flex justify-between items-start">
        <div className="flex flex-col items-start">
          <Link to={'/'}>
            <div className="flex gap-3 items-center">
              <img src="/icon.png" alt="logo" width={44} height={44} />
              <h1 className="font-bold">StockSight</h1>
            </div>
          </Link>
        </div>
        <span className="text-sm text-gray-600 flex items-center py-4">
          ⓒ 2024 StockSight
        </span>
      </div>
      <hr className="border-gray-300 w-[90%] mx-auto my-4" />
      <div className="container mx-auto px-4 mt-4">
        <h3 className="text-xl font-bold mb-4">Disclaimer</h3>
        <p className="mb-4">
          The information and ratings provided on this platform are for
          educational and informational purposes only. The ratings, analysis,
          and stock details are based on publicly available information and
          proprietary algorithms designed to simulate the analysis process for
          educational purposes. The platform does not provide financial advice,
          recommendations, or professional investment services.
        </p>
        <p className="mb-4">
          We are not licensed as a Registered Investment Advisor or any other
          regulated financial entity under SEBI or any other financial
          regulatory authority. The platform should not be used as the basis for
          making any financial or investment decisions. Users are strongly
          advised to consult with a certified financial professional before
          making any actual investments.
        </p>
        <p>
          By using this platform, you acknowledge that the information presented
          is for learning and demonstration purposes only, and any decisions
          made based on this information are done at your own risk.
        </p>
      </div>
    </footer>
  )
}

export default Footer
