import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {

  const userId = localStorage.getItem("userId");

  const [cart, setCart] = useState(null);
  const [address, setAddress] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {

    if (!userId) {
      navigate("/");
      return;
    }


    const fetchData = async () => {

      try {

        const cartResponse = await api.get(`/cart/${userId}`);
        setCart(cartResponse.data);


        const addressResponse = await api.get(`/address/${userId}`);

        setAddress(addressResponse.data);


        if(addressResponse.data.length > 0){
          setSelectAddress(addressResponse.data[0]);
        }


      } catch(error) {

        console.log(error.response?.data || error.message);

      }

    };


    fetchData();


  }, [userId, navigate]);



  if (!cart) {
    return <div className="text-center mt-10">Loading...</div>;
  }



  const total = cart.items.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

const placeOrder = async () => {

    if (!selectAddress) {
        alert("Please select an address");
        return;
    }

    try {

        const res = await api.post("/order/place", {
            userId,
            address: selectAddress
        });

        localStorage.setItem("cartCount", 0);

        window.dispatchEvent(new Event("cartUpdated"));

        alert("Order Placed Successfully");

        navigate(`/order-success/${res.data.order._id}`);

    } catch (error) {

        console.log(error.response?.data || error.message);

    }

};

 



  return (

<div className="min-h-screen bg-gray-100 py-10">

<div className="max-w-7xl mx-auto px-4">

<h1 className="text-4xl font-bold mb-8">
Checkout
</h1>


<div className="grid lg:grid-cols-3 gap-8">


{/* LEFT */}

<div className="lg:col-span-2">


<div className="bg-white rounded-xl p-6 shadow">


<h2 className="text-2xl font-semibold mb-5">
Delivery Address
</h2>


{
address.map((addr)=>(

<label
key={addr._id}
className="flex gap-3 border p-4 rounded-lg mb-3 cursor-pointer"
>


<input

type="radio"

name="address"

checked={
selectAddress?._id === addr._id
}

onChange={()=>
setSelectAddress(addr)
}

/>


<div>

<h3 className="font-bold">
{addr.fullName}
</h3>


<p>
{addr.phone}
</p>


<p>
{addr.addressLine}
<br/>
{addr.city}, {addr.state}
<br/>
{addr.pincode}
</p>


</div>


</label>

))
}


</div>



<div className="bg-white rounded-xl p-6 shadow mt-6">


<h2 className="text-2xl font-semibold mb-5">
Order Items
</h2>


{
cart.items.map((item)=>(

<div
key={item.productId._id}
className="flex justify-between border-b py-4"
>


<div>

<h3 className="font-semibold">
{item.productId.title}
</h3>


<p>
Quantity : {item.quantity}
</p>

</div>


<p className="font-bold">
₹{item.productId.price * item.quantity}
</p>


</div>


))
}


</div>


</div>





{/* RIGHT */}

<div>

<div className="bg-white rounded-xl p-6 shadow">


<h2 className="text-2xl font-semibold">
Price Details
</h2>


<div className="flex justify-between mt-5">
<span>Items</span>
<span>{cart.items.length}</span>
</div>


<div className="flex justify-between mt-3">
<span>Total</span>
<span>₹{total}</span>
</div>



<button

onClick={placeOrder}

className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg"

>

Place Order (COD)

</button>


</div>


</div>



</div>


</div>


</div>

  );
}