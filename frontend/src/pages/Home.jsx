import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Search } from "lucide-react";
import api from "../api/axios";


export default function Home(){

const [products,setProducts] = useState([]);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("");


const loadProducts = async()=>{

try{

const res = await api.get(
  `/products?search=${search}&category=${category}`
);

setProducts(res.data.products);


}
catch(error){

console.log(error);

}

};


useEffect(() => {
   loadProducts();
}, [search, category]);




return (

<div className="bg-gray-100 min-h-screen">



{/* HERO SECTION */}


<section className="
bg-gradient-to-r
from-gray-950
via-gray-900
to-green-900
text-white
">


<div className="
max-w-7xl
mx-auto
px-5
py-20
grid
md:grid-cols-2
items-center
gap-10
">


<div>


<h1 className="
text-5xl
font-extrabold
leading-tight
">

Shop Smart,
<br/>

Live Better

</h1>


<p className="
mt-5
text-gray-300
text-lg
">

Discover premium products at the best prices.
Quality products delivered to your doorstep.

</p>



<a

href="#products"

className="
inline-block
mt-8
bg-green-500
text-black
font-bold
px-8
py-3
rounded-full
hover:bg-green-400
transition
"

>

Shop Now

</a>


</div>





<div className="
flex
justify-center
">


<img

src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"

className="
rounded-3xl
shadow-2xl
w-full
max-w-md
"

/>


</div>



</div>


</section>
{/* product section */}


<section className="max-w-7xl mx-auto px-5 py-8">

<div className="grid md:grid-cols-2 gap-5">

<div className="relative">

<Search
size={20}
className="absolute left-4 top-4 text-gray-400"
/>

<input
type="text"
placeholder="Search Products..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="w-full border rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500"
/>

</div>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
>

<option value="">All Categories</option>
<option value="Electronics">Electronics</option>
<option value="Fashion">Fashion</option>
<option value="Accessories">Accessories</option>
<option value="Home">Home</option>

</select>

</div>

</section>




{/* CATEGORY SECTION


<section className="
max-w-7xl
mx-auto
px-5
py-12
">


<h2 className="
text-3xl
font-bold
mb-8
">

Shop By Category

</h2>




<div className="
grid
grid-cols-2
md:grid-cols-4
gap-6
">



{
[
"Electronics",
"Fashion",
"Accessories",
"Home"
].map((cat,index)=>(


<div

key={index}

className="
bg-white
rounded-2xl
p-8
text-center
shadow
hover:-translate-y-2
transition
cursor-pointer
"

>


<div className="
text-4xl
mb-3
">

🛒

</div>


<h3 className="
font-semibold
text-lg
">

{cat}

</h3>


</div>


))

}



</div>


</section>
 */}






{/* PRODUCTS */}



<section id="products" className="
max-w-7xl
mx-auto
px-5
pb-16
">


<h2 className="
text-3xl
font-bold
mb-8
">

Latest Products

</h2>





<div className="
grid
sm:grid-cols-2
md:grid-cols-3
lg:grid-cols-4
gap-7
">



{
products.map((product)=>(



<div

key={product._id}

className="
bg-white
rounded-2xl
shadow
overflow-hidden
hover:shadow-xl
transition
group
"


>



<div className="
h-60
bg-gray-100
flex
items-center
justify-center
">


<img

src={product.image}

alt={product.title}

className="
h-full
object-contain
group-hover:scale-110
transition
duration-300
"

/>


</div>





<div className="p-5">


<h3 className="
font-bold
text-lg
truncate
">

{product.title}

</h3>



<div className="
flex
items-center
gap-1
mt-2
text-yellow-500
">


{
[1,2,3,4,5].map(i=>

<Star
key={i}
size={16}
fill="currentColor"
/>

)

}


</div>




<p className="
text-green-600
font-bold
text-xl
mt-3
">

₹{product.price}

</p>




<Link

to={`/product/${product._id}`}

className="
mt-4
flex
items-center
justify-center
gap-2
bg-gray-950
text-white
py-3
rounded-xl
hover:bg-green-600
transition
"

>

<ShoppingCart size={18}/>

View Product

</Link>


</div>


</div>



))

}



</div>


</section>




</div>

);


}