import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, Copy, ShoppingBag, Package } from "lucide-react";
import { useState } from "react";


const OrderSuccess = () => {


const {id} = useParams();

const navigate = useNavigate();

const [copied,setCopied] = useState(false);




const copyOrderId = ()=>{

navigator.clipboard.writeText(id);

setCopied(true);


setTimeout(()=>{

setCopied(false);

},2000);


};






return (


<div className="
min-h-screen
bg-gray-100
flex
items-center
justify-center
px-5
py-10
">



<div className="
bg-white
max-w-xl
w-full
rounded-3xl
shadow-xl
p-8
text-center
">






{/* ICON */}


<div className="
flex
justify-center
mb-5
">


<div className="
bg-green-100
p-5
rounded-full
">

<CheckCircle

size={70}

className="text-green-600"

/>


</div>


</div>







<h1 className="
text-3xl
font-bold
text-gray-800
">

Order Placed Successfully 🎉

</h1>




<p className="
text-gray-500
mt-3
">

Thank you for shopping with us.
Your order has been confirmed.

</p>








{/* ORDER ID CARD */}


<div className="
mt-8
bg-gray-50
border
rounded-2xl
p-5
">


<p className="
text-gray-500
text-sm
">

Order ID

</p>



<div className="
flex
items-center
justify-center
gap-3
mt-3
">


<p className="
font-bold
text-lg
break-all
">

{id}

</p>



<button

onClick={copyOrderId}

className="
text-blue-600
hover:text-blue-800
"

>


<Copy size={20}/>


</button>



</div>


{

copied &&

<p className="
text-green-600
text-sm
mt-2
">

Copied!

</p>

}


</div>










{/* STATUS */}


<div className="
mt-6
flex
justify-around
text-sm
">


<div className="
flex
flex-col
items-center
gap-2
">


<div className="
bg-green-100
p-3
rounded-full
">

<Package
className="text-green-600"
/>

</div>


<span>
Order Confirmed
</span>


</div>





<div className="
flex
flex-col
items-center
gap-2
">


<div className="
bg-blue-100
p-3
rounded-full
">


<ShoppingBag
className="text-blue-600"
/>


</div>


<span>
Preparing
</span>


</div>



</div>









{/* BUTTONS */}


<div className="
mt-8
space-y-3
">



<button

onClick={()=>navigate("/")}

className="
w-full
bg-green-600
hover:bg-green-700
text-white
py-4
rounded-xl
font-bold
text-lg
transition
"

>

Continue Shopping

</button>







<button

onClick={()=>navigate("/orders")}

className="
w-full
border
border-gray-300
py-4
rounded-xl
font-semibold
hover:bg-gray-100
transition
"

>

View My Orders

</button>




</div>







</div>



</div>


)

}


export default OrderSuccess;