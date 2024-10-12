// import React from 'react'

import { useEffect, useState } from 'react'
import Result from '../components/Result'
import useStockDetails from '../hooks/useStockDetails'
import { useNavigate } from 'react-router-dom'

const StockInfoPage = () => {
  const { stockDetails } = useStockDetails()
  const [shortBy, setShortBy] = useState('')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!stockDetails.length) {
      navigate('/', { replace: true })
    }
  }, [stockDetails, navigate])

  if (!stockDetails.length) {
    return ''
  }

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

export default StockInfoPage
