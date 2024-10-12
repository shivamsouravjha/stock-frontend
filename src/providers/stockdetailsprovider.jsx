import { useState } from 'react'
import { stockContext } from '../context'
import PropTypes from 'prop-types'
const StockDetailsProvider = ({ children }) => {
  const [stockDetails, setStockDetails] = useState([])
  return (
    <stockContext.Provider value={{ stockDetails, setStockDetails }}>
      {children}
    </stockContext.Provider>
  )
}

StockDetailsProvider.propTypes = {
  children: PropTypes.node,
}

export default StockDetailsProvider
