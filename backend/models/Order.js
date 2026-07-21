import mongoose from "mongoose"
import mongoose from "mongoose"


const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "product"
            },
            quantity: Number,
            price: Number
        }
    ],
    address:{
        fullName:"string",
        phone:"string",
        addressLine:"string",
        city:"string",
        state:"string",
        pincode:"string",
    },
    totalAmount: Number,
    paymentMethod:{
        type:string,
        default:'COD'
    },
    status:{
        default: "Placed",

    },
    timestamps:true

})

export default mongoose.model('Order',OrderSchema);