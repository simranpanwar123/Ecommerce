import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    addressLine: {
        type: String,
        required: true
    },
    city: String,
    state: String,
    pincode: String
}, {
    timestamps: true
});

export default mongoose.model("Address", addressSchema);