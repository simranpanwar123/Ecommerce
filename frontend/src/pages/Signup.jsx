import React, { useState } from "react";
import api from "../api/axios";
import { User, Mail, Lock, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";


const Signup = () => {


const navigate = useNavigate();


const [formData,setFormData] = useState({

username:"",
email:"",
password:""

});


const [msg,setMsg] = useState("");

const [loading,setLoading] = useState(false);



const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value

});

};





const handleSubmit=async(e)=>{

e.preventDefault();


try{


setLoading(true);


const response = await api.post(
"/auth/signup",
formData
);



setMsg(
response.data.message || "Account created successfully 🎉"
);



setTimeout(()=>{

navigate("/login");

},1500);



}
catch(err){


setMsg(
err.response?.data?.message ||
"Something went wrong"
);


}
finally{

setLoading(false);

}


};





return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-gray-900
via-gray-800
to-green-900
px-5
">


<div className="
bg-white
w-full
max-w-md
rounded-3xl
shadow-2xl
p-8
">








<h1 className="
text-3xl
font-bold
text-center
text-gray-800
">

Create Account

</h1>



<p className="
text-center
text-gray-500
mt-2
mb-8
">

Join ShopMart today

</p>





{
msg &&

<p

className={`
text-center
mb-5
font-semibold

${
msg.includes("successfully") || msg.includes("created")
?
"text-green-600"
:
"text-red-500"
}

`}

>

{msg}

</p>

}







<form

onSubmit={handleSubmit}

className="
space-y-5
"

>





{/* Username */}


<div>


<label className="
font-semibold
text-gray-700
">

Username

</label>


<div className="
flex
items-center
border
rounded-xl
mt-2
px-4
focus-within:ring-2
focus-within:ring-green-500
">


<User
size={20}
className="text-gray-400"
/>



<input

type="text"

name="username"

value={formData.username}

onChange={handleChange}

placeholder="Enter username"

className="
w-full
p-3
outline-none
"

required

/>


</div>


</div>








{/* Email */}


<div>


<label className="
font-semibold
text-gray-700
">

Email Address

</label>



<div className="
flex
items-center
border
rounded-xl
mt-2
px-4
focus-within:ring-2
focus-within:ring-green-500
">


<Mail
size={20}
className="text-gray-400"
/>


<input

type="email"

name="email"

value={formData.email}

onChange={handleChange}

placeholder="Enter email"

className="
w-full
p-3
outline-none
"

required

/>


</div>


</div>







{/* Password */}


<div>


<label className="
font-semibold
text-gray-700
">

Password

</label>



<div className="
flex
items-center
border
rounded-xl
mt-2
px-4
focus-within:ring-2
focus-within:ring-green-500
">


<Lock
size={20}
className="text-gray-400"
/>



<input

type="password"

name="password"

value={formData.password}

onChange={handleChange}

placeholder="Create password"

className="
w-full
p-3
outline-none
"

required

/>


</div>


</div>






<button

type="submit"

disabled={loading}

className="
w-full
bg-green-600
hover:bg-green-700
text-white
font-bold
py-3
rounded-xl
transition
shadow-lg
disabled:opacity-50
"

>


{

loading
?
"Creating Account..."
:
"Sign Up"

}



</button>





</form>






<p className="
text-center
text-gray-500
mt-6
">


Already have an account?


<span

onClick={()=>navigate("/login")}

className="
text-green-600
font-bold
cursor-pointer
ml-1
hover:underline
"

>

Login

</span>


</p>



</div>


</div>


)

}


export default Signup;