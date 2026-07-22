import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { Package, Clock, CheckCircle } from "lucide-react";


export default function Orders() {


const userId = localStorage.getItem("userId");

const [orders,setOrders] = useState([]);

const [loading,setLoading] = useState(true);



const loadOrders = async()=>{

try{

const res = await api.get(`/order/${userId}`);

setOrders(res.data.orders || res.data);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}

};




useEffect(()=>{

loadOrders();

},[]);





if(loading){

return (

<div className="
text-center
mt-20
text-xl
font-semibold
">

Loading Orders...

</div>

)

}





return (

<div className="
min-h-screen
bg-gray-100
py-10
px-5
">


<div className="
max-w-6xl
mx-auto
">


<h1 className="
text-4xl
font-bold
mb-8
">

My Orders

</h1>





{
orders.length===0 ?


<div className="
bg-white
rounded-2xl
p-10
text-center
shadow
">


<h2 className="
text-xl
font-semibold
">

No Orders Found

</h2>


</div>



:


<div className="
space-y-6
">


{

orders.map((order)=>(


<div

key={order._id}

className="
bg-white
rounded-2xl
shadow
p-6
"


>


<div className="
flex
justify-between
items-center
border-b
pb-4
">


<div>

<p className="
font-bold
">

Order ID

</p>

<p className="
text-gray-500
text-sm
">

{order._id}

</p>

</div>




<div className="
flex
items-center
gap-2
text-green-600
font-semibold
">

<CheckCircle size={20}/>

{order.status}

</div>


</div>







<div className="
mt-5
space-y-4
">


{

order.items.map((item)=>(


<div

key={item.productId._id}

className="
flex
justify-between
border-b
pb-3
"


>


<div>

<h3 className="
font-semibold
">

{item.productId.title}

</h3>


<p className="
text-gray-500
">

Quantity : {item.quantity}

</p>


</div>




<p className="
font-bold
">

₹{item.price * item.quantity}

</p>



</div>


))


}



</div>







<div className="
mt-5
flex
justify-between
font-bold
text-xl
">


<span>
Total
</span>


<span className="
text-green-600
">

₹{order.totalAmount}

</span>


</div>






<div className="
mt-4
flex
items-center
gap-2
text-gray-500
">


<Clock size={18}/>

Cash on Delivery


</div>



</div>


))


}



</div>


}



</div>


</div>


)

}