import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
  User,
  Phone,
  MapPin,
  Building2,
  Landmark,
  Hash,
  CheckCircle
} from "lucide-react";


export default function CheckoutAddress(){


const userId = localStorage.getItem("userId");

const navigate = useNavigate();



const [form,setForm]=useState({

fullName:"",
phone:"",
addressLine:"",
city:"",
state:"",
pincode:""

});





const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};







const saveAddress=async(e)=>{

e.preventDefault();


try{


await api.post("/address/add",{

...form,

userId

});


navigate("/checkout");


}

catch(error){

console.log(error);

}


};







const Input = ({
icon:Icon,
label,
name,
placeholder
})=>(


<div>


<label className="
block
font-semibold
mb-2
text-gray-700
">

{label}

</label>


<div className="
flex
items-center
gap-3
border
rounded-xl
px-4
bg-gray-50
focus-within:ring-2
focus-within:ring-green-500
">


<Icon
size={20}
className="text-gray-400"
/>


<input

type="text"

name={name}

value={form[name]}

onChange={handleChange}

placeholder={placeholder}

className="
w-full
bg-transparent
py-3
outline-none
"

/>


</div>


</div>


);








return (

<div className="
min-h-screen
bg-gray-100
py-10
px-5
">



<div className="
max-w-5xl
mx-auto
bg-white
rounded-3xl
shadow-xl
overflow-hidden
">





{/* TOP HEADER */}



<div className="
bg-gray-950
text-white
p-8
">


<h1 className="
text-3xl
font-bold
">

Delivery Address

</h1>


<p className="
text-gray-400
mt-2
">

Where should we deliver your order?

</p>





{/* STEPS */}


<div className="
flex
items-center
gap-5
mt-8
text-sm
">


<div className="
flex
items-center
gap-2
text-green-400
">

<CheckCircle size={20}/>

Cart

</div>



<div className="h-px bg-gray-600 flex-1"></div>




<div className="
flex
items-center
gap-2
text-green-400
">

<CheckCircle size={20}/>

Address

</div>




<div className="h-px bg-gray-600 flex-1"></div>




<div className="text-gray-400">

Payment

</div>



</div>


</div>








<form

onSubmit={saveAddress}

className="
p-8
grid
md:grid-cols-2
gap-6
"

>





<Input

icon={User}

label="Full Name"

name="fullName"

placeholder="Enter your full name"

/>





<Input

icon={Phone}

label="Mobile Number"

name="phone"

placeholder="Enter mobile number"

/>







<div className="
md:col-span-2
">


<label className="
block
font-semibold
mb-2
text-gray-700
">

Complete Address

</label>



<div className="
flex
gap-3
border
rounded-xl
px-4
bg-gray-50
focus-within:ring-2
focus-within:ring-green-500
">


<MapPin
className="text-gray-400 mt-3"
/>


<textarea

name="addressLine"

value={form.addressLine}

onChange={handleChange}

placeholder="House no, street, area"

rows="3"

className="
w-full
bg-transparent
py-3
outline-none
resize-none
"

/>


</div>


</div>







<Input

icon={Building2}

label="City"

name="city"

placeholder="Enter city"

/>





<Input

icon={Landmark}

label="State"

name="state"

placeholder="Enter state"

/>





<Input

icon={Hash}

label="Pincode"

name="pincode"

placeholder="Enter pincode"

/>








<div className="
md:col-span-2
mt-5
">


<button

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
shadow-lg
"

>

Save Address & Continue

</button>



</div>






</form>






</div>






</div>


);


}