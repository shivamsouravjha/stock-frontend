import { useContext } from 'react'
import { stockContext } from '../context'

const useStockDetails = () => {
  const { stockDetails, setStockDetails } = useContext(stockContext)
  return { stockDetails, setStockDetails }
}

export default useStockDetails
