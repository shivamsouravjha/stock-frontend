import { useGoogleLogin } from '@react-oauth/google'
import Lottie from 'lottie-react'
import stockAnimationData from '../animation/stock.json'
import useUpload from '../hooks/useUpload'
import { useState, useEffect } from 'react'
import { UploadCloud } from 'lucide-react'
import ReactGA from 'react-ga'
import Result from '../components/Result'

const Homepage = () => {
  const [search, setSearch] = useState('')
  const { loading, handleUploadFile, error, stockDetails, setStockDetails } =
    useUpload()
  const [shortBy, setShortBy] = useState('')

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: '/homepage' })
  }, [])

  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
    onSuccess: async (tokenResponse) => {
      const { access_token } = tokenResponse

      try {
        const response = await fetch(
          'https://stock-backend-hz83.onrender.com/api/fetchGmail',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ token: access_token }),
          }
        )

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder('utf-8')

        let done = false
        let accumulatedData = ''

        while (!done) {
          const { value, done: readerDone } = await reader.read()
          done = readerDone
          accumulatedData += decoder.decode(value, { stream: true })

          const jsonObjects = accumulatedData.split('\n').filter(Boolean)

          jsonObjects.forEach((jsonString) => {
            try {
              const stockDetail = JSON.parse(jsonString)
              setStockDetails((prevDetails) => [...prevDetails, stockDetail])
              ReactGA.event({
                category: 'Stock',
                action: 'Added stock detail',
                label: stockDetail.ISIN,
              })
            } catch (error) {
              console.error('Failed to parse stock data:', error, jsonString)
            }
          })

          // Reset accumulatedData to handle partial JSON chunks
          accumulatedData = ''
        }
      } catch (error) {
        console.error(
          'Error sending token to backend or reading stream:',
          error
        )
      }
    },
    onError: () => console.log('Login Failed'),
  })

  if (stockDetails.length > 0) {
    return (
      <Result
        search={search}
        setSearch={setSearch}
        shortBy={shortBy}
        setShortBy={setShortBy}
        stockDetails={stockDetails}
      />
    )
  }

  return (
    <div className="w-full h-screen flex justify-center items-center p-3">
      <div className="w-[600px] p-4 border-[0.5px] border-slate-200 rounded-md bg-white">
        <div className="flex justify-center">
          <div className="w-[300px] h-[300px]">
            <Lottie animationData={stockAnimationData} />
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-500 p-3 rounded-md mb-3 text-xs">
            {error}
          </div>
        )}
        <div className="md:flex justify-between items-center bg-slate-50 p-3 rounded-md">
          <div>
            <h2 className="text-xl">
              Upload your stock xlsx file to get started.
            </h2>
            <div className="text-xs">
              To download supported format.{' '}
              <a
                download={true}
                href="/sample.xlsx"
                className="text-primary font-semibold"
              >
                Click here
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <label
              className="px-3 mt-3 py-2 bg-primary w-full text-white rounded-md flex gap-2 items-center cursor-pointer"
              htmlFor="file-upload"
            >
              <UploadCloud width={24} height={24} />
              <div className="flex-grow flex justify-center">
                {loading ? 'Uploading ...' : 'Upload'}
              </div>
            </label>
            <input
              onChange={(ev) => handleUploadFile(ev.currentTarget.files)}
              accept=".xlsx"
              className="hidden"
              id="file-upload"
              type="file"
            />
            <button
              type="button"
              onClick={googleLogin}
              className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
            >
              <svg
                className="mr-2 -ml-1 w-4 h-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Sign up with Google<div></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
