const Disclaimer = () => {
  return (
    <div className="container mx-auto py-8 md:px-0 mt-28">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Disclaimer
          </h1>
          <p className="text-center text-gray-600 mt-2">
            Effective Date: 6th October 2024
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div className="h-[400px] overflow-y-auto pr-4 mb-6 space-y-6 text-base lg:text-lg text-gray-700">
              <p className="leading-normal">
                The information and ratings provided on this platform are for
                educational and informational purposes only. The ratings,
                analysis, and stock details are based on publicly available
                information and proprietary algorithms designed to simulate the
                analysis process for educational purposes. The platform does not
                provide financial advice, recommendations, or professional
                investment services.
              </p>
              <p className="leading-normal">
                We are not licensed as a Registered Investment Advisor or any
                other regulated financial entity under SEBI or any other
                financial regulatory authority. The platform should not be used
                as the basis for making any financial or investment decisions.
                Users are strongly advised to consult with a certified financial
                professional before making any actual investments.
              </p>
              <p className="leading-normal">
                By using this platform, you acknowledge that the information
                presented is for learning and demonstration purposes only, and
                any decisions made based on this information are done at your
                own risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
