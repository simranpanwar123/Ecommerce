import Order from "../models/Order.js"
import Cart from "../models/Cart.js"
import Product from "../models/Product.js"

export const PlaceOrder = async (req, res ) => {
    try{
        const { userId, address } = req.body

        // get cart
        const cart = await Cart.findOne({ userId}).populate('items.productId')
        if(!cart || cart.items.length === 0) {
         return res.status(400).json ({message:"cart is empty"})  
        }

        // prepare items
        const orderItems  =  cart.items.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price,
        }))

        // calculate total amount
        const totalAmount = orderItems.reduce((total,item) => total + (item.price*item.quantity),0)
        // deduct stock

        for(let item of cart.items){
            await Product.findByIdAndUpdate(item.productId._id, { $inc: { stock: -item.quantity }})
        }

        // create order

        const order = await Order.create({
            userId,
            items:orderItems,
            address,
            totalAmount,
            paymentMethod:'COD'
        })

        // clear cart
        await Cart.findOneAndUpdate({ userId}, { items: [] })

        res.status(201).json({message: "order placed successfully", order})
    }
   catch(error){
    console.log(error);
    res.status(500).json({
        message: error.message
    });
   }
}