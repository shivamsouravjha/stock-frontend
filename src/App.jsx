import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'tailwindcss/tailwind.css'
import Homepage from './pages/homepage'
import StocksPage from './pages/StocksPage'
import AppWrapper from './components/AppWrapper'
import ScanMutualFunds from './pages/scanMutualFunds'
import Agreement from './pages/agreement'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactGA from 'react-ga'
import { useEffect } from 'react'

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID

const router = createBrowserRouter([
  {
    element: <AppWrapper />,
    children: [
      {
        element: <Homepage />,
        path: '/',
      },
      {
        element: <StocksPage />,
        path: '/stocks',
      },
      {
        element: <Agreement />,
        path: '/agreement',
      },
      {
        element: <ScanMutualFunds />,
        path: '/scanMutualFunds',
      },
    ],
  },
])

function App() {
  useEffect(() => {
    if (TRACKING_ID) {
      ReactGA.initialize(TRACKING_ID)
      ReactGA.send({
        hitType: 'pageview',
        page: window.location.pathname + window.location.search,
      })
    }
  }, [])
  return (
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      redirect={import.meta.env.VITE_GOOGLE_REDIRECT_URL}
    >
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  )
}

export default App
