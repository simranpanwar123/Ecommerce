import React from 'react'
import { useParams } from 'react-router'

const OrderSuccess = () => {

    const {id} = useParams()

    const goHome = () => {
        window.location.href = '/'
    }
  return (
    <div className='max-w-xl mx-auto p-6 text-center'>
        <h1 >Order Placed Successfully</h1>

        <p>Your Order ID:
        <span>{id}</span></p>

        <button onClick={goHome}>Continue Shopping</button>
    </div>
  )
}

export default OrderSuccess
