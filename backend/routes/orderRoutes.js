import express from 'express'
import { placeOrder } from '../controllers/orderController'

const router = express.Router()

router.post('/place-order', placeOrder)

export default router;