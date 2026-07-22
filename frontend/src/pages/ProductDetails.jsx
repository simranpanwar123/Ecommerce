import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star, Truck, ShieldCheck } from "lucide-react";
import api from "../api/axios";


export default function ProductDetails() {


const {id} = useParams();

const [product,setProduct] = useState(null);
const [quantity,setQuantity] = useState(1);



const loadProduct = async()=>{

try{

const res = await api.get("/products");

const products = res.data.products || res.data;


const foundProduct = products.find(
(item)=>item._id === id
);


setProduct(foundProduct);


}
catch(error){

console.log(error);

}


};




useEffect(()=>{

loadProduct();

},[id]);





const addToCart = async()=>{


try{


const userId = localStorage.getItem("userId");


if(!userId){

alert("Please login first");

return;

}



await api.post("/cart/add",{

userId,

productId:product._id,

quantity

});



window.dispatchEvent(
new Event("cartUpdated")
);



alert("Added to cart");


}

catch(error){

console.log(error);

}


};





if(!product){

return (

<div className="
text-center
mt-20
text-xl
font-semibold
">

Loading...

</div>

)

}





return (

<div className="
bg-gray-100
min-h-screen
py-10
">


<div className="
max-w-7xl
mx-auto
px-5
">


<div className="
grid
md:grid-cols-2
gap-10
bg-white
rounded-3xl
p-8
shadow
">





{/* IMAGE */}


<div className="
bg-gray-100
rounded-2xl
flex
items-center
justify-center
h-[450px]
">


<img

src={product.image}

alt={product.title}

className="
max-h-full
object-contain
hover:scale-105
transition
duration-300
"

/>


</div>







{/* DETAILS */}



<div>



<h1 className="
text-4xl
font-bold
text-gray-900
">

{product.title}

</h1>





<div className="
flex
items-center
gap-2
mt-4
">


<div className="
flex
text-yellow-500
">


{
[1,2,3,4,5].map((star)=>(

<Star
key={star}
size={20}
fill="currentColor"
/>

))

}


</div>


<span className="text-gray-500">
(120 Reviews)
</span>


</div>





<p className="
text-gray-600
mt-5
leading-7
">

{product.description}

</p>







<h2 className="
text-4xl
font-bold
text-green-600
mt-6
">

₹{product.price}

</h2>






<p className="
mt-3
text-green-600
font-semibold
">

✓ In Stock

</p>







{/* Quantity */}


<div className="
flex
items-center
gap-4
mt-6
">


<button

onClick={()=>setQuantity(
Math.max(1,quantity-1)
)}

className="
w-10
h-10
border
rounded-lg
text-xl
"

>
-
</button>



<span className="
text-xl
font-bold
">

{quantity}

</span>



<button

onClick={()=>setQuantity(quantity+1)}

className="
w-10
h-10
border
rounded-lg
text-xl
"

>
+
</button>



</div>









{/* Buttons */}


<div className="
flex
gap-4
mt-8
">



<button

onClick={addToCart}

className="
flex-1
bg-green-600
text-white
py-4
rounded-xl
font-bold
flex
items-center
justify-center
gap-2
hover:bg-green-700
transition
"

>

<ShoppingCart/>

Add To Cart

</button>





<button

className="
flex-1
bg-gray-950
text-white
py-4
rounded-xl
font-bold
hover:bg-gray-800
"

>

Buy Now

</button>



</div>






{/* INFO */}


<div className="
grid
grid-cols-2
gap-4
mt-8
">



<div className="
border
rounded-xl
p-4
flex
gap-3
">


<Truck
className="text-green-600"
/>


<div>

<p className="font-semibold">
Free Delivery
</p>

<p className="text-sm text-gray-500">
2-5 days
</p>

</div>


</div>






<div className="
border
rounded-xl
p-4
flex
gap-3
">


<ShieldCheck
className="text-green-600"
/>


<div>

<p className="font-semibold">
Secure Payment
</p>

<p className="text-sm text-gray-500">
100% Safe
</p>


</div>


</div>



</div>





</div>


</div>


</div>


</div>

)

}