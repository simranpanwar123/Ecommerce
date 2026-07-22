import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";


const Cart = () => {


const userId = localStorage.getItem("userId");

const [cart,setCart] = useState(null);
const [loading,setLoading] = useState(true);



const navigate = useNavigate();


const loadCart = async () => {

    if (!userId) {
        setCart(null);
        setLoading(false);

        localStorage.setItem("cartCount", 0);
        window.dispatchEvent(new Event("cartUpdated"));

        return;
    }

    try {

        const response = await api.get(`/cart/${userId}`);

        const updatedCart = response.data.cart || response.data;

        setCart(updatedCart);

        const totalQty = (updatedCart?.items || []).reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        localStorage.setItem("cartCount", totalQty);

        window.dispatchEvent(new Event("cartUpdated"));

    } catch (err) {

        console.error(err);

        setCart({ items: [] });

        localStorage.setItem("cartCount", 0);

        window.dispatchEvent(new Event("cartUpdated"));

    } finally {

        setLoading(false);

    }

};







useEffect(()=>{


loadCart();


window.addEventListener(
"cartUpdated",
loadCart
);


return ()=>{

window.removeEventListener(
"cartUpdated",
loadCart
);

};


},[]);






const updateNavbar = (data)=>{


window.dispatchEvent(
new Event("cartUpdated")
);


};






const updateQty = async(productId,quantity)=>{


if(quantity<=0){

removeItem(productId);
return;

}



const res = await api.post("/cart/update",{

userId,
productId,
quantity

});


setCart(
res.data.cart || res.data
);


updateNavbar();

};







const removeItem = async(productId)=>{


const res = await api.post("/cart/remove",{

userId,
productId

});


setCart(
res.data.cart || res.data
);


updateNavbar();


};







if(loading){

return (

<div className="
text-center
mt-20
text-xl
font-semibold
">

Loading Cart...

</div>

)

}





const items = cart?.items || [];



const total = items.reduce(

(sum,item)=>

sum + item.productId.price * item.quantity,

0

);






return (

<div className="
min-h-screen
bg-gray-100
py-10
">


<div className="
max-w-7xl
mx-auto
px-5
">



<h1 className="
text-4xl
font-bold
mb-8
flex
items-center
gap-3
">

<ShoppingBag/>

Your Cart

</h1>






{
items.length===0 ?



<div className="
bg-white
rounded-2xl
p-10
text-center
shadow
">


<h2 className="
text-2xl
font-bold
">

Your cart is empty

</h2>


<button

onClick={()=>navigate("/")}

className="
mt-5
bg-green-600
text-white
px-8
py-3
rounded-xl
"

>

Continue Shopping

</button>


</div>





:


<div className="
grid
lg:grid-cols-3
gap-8
">





{/* PRODUCTS */}


<div className="
lg:col-span-2
space-y-5
">



{
items.map((item)=>(


<div

key={item.productId._id}

className="
bg-white
rounded-2xl
p-5
shadow
flex
items-center
justify-between
gap-5
"


>



<div className="
flex
items-center
gap-5
">


<img

src={item.productId.image}

className="
w-28
h-28
object-contain
bg-gray-100
rounded-xl
"

/>



<div>


<h2 className="
font-bold
text-lg
">

{item.productId.title}

</h2>


<p className="
text-green-600
font-bold
mt-2
">

₹{item.productId.price}

</p>



<div className="
flex
items-center
gap-3
mt-4
border
rounded-lg
w-fit
p-1
">


<button

onClick={()=>
updateQty(
item.productId._id,
item.quantity-1
)
}

className="
p-2
hover:bg-gray-200
rounded
"

>

<Minus size={18}/>

</button>




<span className="
font-bold
">

{item.quantity}

</span>





<button

onClick={()=>
updateQty(
item.productId._id,
item.quantity+1
)
}

className="
p-2
hover:bg-gray-200
rounded
"

>

<Plus size={18}/>

</button>


</div>



</div>


</div>






<div className="text-right">


<p className="
font-bold
text-xl
">

₹{item.productId.price * item.quantity}

</p>



<button

onClick={()=>
removeItem(item.productId._id)
}

className="
mt-4
text-red-500
hover:text-red-700
"

>

<Trash2/>

</button>


</div>



</div>


))

}



</div>









{/* SUMMARY */}


<div>


<div className="
bg-white
rounded-2xl
p-6
shadow
sticky
top-5
">


<h2 className="
text-2xl
font-bold
mb-6
">

Price Details

</h2>




<div className="
flex
justify-between
mb-4
">

<span>
Items
</span>

<span>
{items.length}
</span>


</div>





<div className="
flex
justify-between
mb-4
">

<span>
Delivery
</span>

<span className="text-green-600">
FREE
</span>


</div>





<hr/>





<div className="
flex
justify-between
text-2xl
font-bold
mt-5
">

<span>
Total
</span>


<span className="
text-green-600
">

₹{total}

</span>


</div>







<button

onClick={()=>navigate("/checkout-address")}

className="
mt-8
w-full
bg-green-600
text-white
py-4
rounded-xl
font-bold
hover:bg-green-700
transition
"

>

Proceed To Checkout

</button>



</div>


</div>





</div>

}



</div>


</div>


)

}


export default Cart;