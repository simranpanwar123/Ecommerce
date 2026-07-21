import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom"

export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const [cart, setCart] = useState(null);
    const [address, setAddress] = useState([]);
    const [ selectAddress, setSelectAddress] = useState(null)

    const navigate = useNavigate();

    useEffect(() => {
      if(!userId){
        navigate("/")
         return;
      }
        api.get(`/cart/${userId}`)
            .then((response) => {
                setCart(response.data);
            });
        api.get(`/address/${userId}`)
            .then((response) => {
                console.log(response.data);
                setAddress(response.data);
                setSelectAddress(response.data[0])
            });
    }, [userId]);

    if (!cart || !address) {
        return <div>Loading...</div>;
    }

    const total = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    const placeOrder = async () => {
      if(!selectAddress){
        alert("please select an address")
        return
      }

      const res = await api.post("/order/place",{
        userId,
        addressId: selectAddress._id
      })
    }


    return (
 <div className="min-h-screen bg-gray-100 py-10">
    <div className="max-w-7xl mx-auto px-4 lg:px-8">

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}

        <div className="lg:col-span-2 space-y-6">

          {/* Address Card */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-semibold">
                Delivery Address
              </h2>

              <button className="text-blue-600 font-semibold hover:underline">
                Change
              </button>

            </div>

            <div className="border rounded-xl p-5 bg-gray-50">

              <h3 className="text-lg font-bold">
                {address.fullName}
              </h3>

              <p className="text-gray-600 mt-2">
                {address.phone}
              </p>

              <p className="text-gray-700 mt-2 leading-7">
                {address.addressLine}
                <br />
                {address.city}, {address.state}
                <br />
                {address.pincode}
              </p>

            </div>

          </div>

          {/* Order Items */}

          <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-2xl font-semibold mb-5">
              Order Items
            </h2>

            <div className="space-y-5">

              {cart.items.map((item) => (

                <div
                  key={item.productId._id}
                  className="flex items-center justify-between border-b pb-5"
                >

                  <div className="flex items-center gap-5">

                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-24 h-24 object-contain border rounded-lg p-2"
                    />

                    <div>

                      <h3 className="font-semibold text-lg">
                        {item.productId.title}
                      </h3>

                      <p className="text-gray-500 mt-2">
                        Quantity : {item.quantity}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-xl font-bold text-green-600">
                      ₹{item.productId.price * item.quantity}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div>

          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-5">

            <h2 className="text-2xl font-semibold mb-6">
              Price Details
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">

                <span>Items</span>

                <span>{cart.items.length}</span>

              </div>

              <div className="flex justify-between">

                <span>Subtotal</span>

                <span>₹{total}</span>

              </div>

              <div className="flex justify-between text-green-600">

                <span>Shipping</span>

                <span>FREE</span>

              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span>₹{total}</span>

              </div>

            </div>

            <button onClick={placeOrder}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition"
            >
              Place Order (Cash on Delivery)
            </button>

          </div>

        </div>

      </div>

    </div>
  </div>
);
}