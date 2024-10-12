import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import StockDetailsProvider from '../providers/stockdetailsprovider'

const AppWrapper = () => {
  return (
    <StockDetailsProvider>
      <div className="w-full min-h-screen bg-slate-50">
        <Navbar />
        <Outlet />
      </div>
    </StockDetailsProvider>
  )
}

export default AppWrapper
