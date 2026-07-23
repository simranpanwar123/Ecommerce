import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, Package } from "lucide-react";


export default function Navbar() {

  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(
    localStorage.getItem("cartCount") || 0
  );

  const userId = localStorage.getItem("userId");


  useEffect(() => {

    const updateCart = () => {

      setCartCount(
        localStorage.getItem("cartCount") || 0
      );

    };


    window.addEventListener(
      "cartUpdated",
      updateCart
    );


    return () => {
      window.removeEventListener(
        "cartUpdated",
        updateCart
      );
    };


  },[]);



  const logout = () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("cartCount");

    navigate("/login");

  };


  return (

<nav className="
bg-gray-900
text-white
shadow-lg
">


<div className="
max-w-7xl
mx-auto
px-6
py-4
flex
justify-between
items-center
">


{/* LOGO */}

<Link 
to="/"
className="
text-2xl
font-bold
text-blue-400
"
>

ShopMart

</Link>



{/* MENU */}

<div className="
flex
items-center
gap-6
">


<Link
to="/"
className="
hover:text-blue-400
transition
"
>
Home
</Link>



<Link
to="/cart"
className="
relative
hover:text-blue-400
transition
flex
items-center
gap-1
"
>

<ShoppingCart size={22}/>




{
cartCount > 0 &&

<span
className="
absolute
-top-3
-left-1
bg-red-500
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"
>

{cartCount}

</span>

}


</Link>





{/* MY ORDERS */}

{
userId &&

<Link

to="/orders"

className="
flex
items-center
gap-1
hover:text-blue-400
transition
"

>

<Package size={22}/>

My Orders


</Link>

}




{
userId ?

(

<button

onClick={logout}

className="
bg-red-500
px-4
py-2
rounded-lg
hover:bg-red-600
transition
"

>

Logout

</button>

)

:

(

<Link

to="/login"

className="
flex
items-center
gap-1
hover:text-blue-400
"

>

<User size={20}/>

Login

</Link>

)

}


</div>


</div>


</nav>

  );

}