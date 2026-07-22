import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Mail, Lock, LogIn } from "lucide-react";


const Login = () => {

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const [msg,setMsg] = useState("");
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();


  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };



  const handleSubmit = async(e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const response = await api.post(
        "/auth/login",
        form
      );


      localStorage.setItem(
        "token",
        response.data.token
      );


      localStorage.setItem(
        "userId",
        response.data.user.id
      );


      setMsg("Login successful 🎉");


      setTimeout(()=>{
        navigate("/");
      },1000);


    }
    catch(err){

      setMsg(
        err.response?.data?.message ||
        "Invalid email or password"
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

Welcome Back

</h1>


<p className="
text-center
text-gray-500
mt-2
mb-8
">

Login to continue shopping

</p>





{
msg &&

<p className={`
text-center
mb-5
font-medium
${msg.includes("successful")
?"text-green-600"
:"text-red-500"}
`}>

{msg}

</p>

}





<form
onSubmit={handleSubmit}
className="
space-y-5
"
>



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
className="text-gray-400"
/>


<input

type="email"

name="email"

value={form.email}

onChange={handleChange}

placeholder="Enter your email"

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
className="text-gray-400"
/>


<input

type="password"

name="password"

value={form.password}

onChange={handleChange}

placeholder="Enter your password"

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
duration-300
shadow-lg
disabled:opacity-50
"

>


{
loading
?
"Logging in..."
:
"Login"
}


</button>



</form>





<p className="
text-center
text-gray-500
mt-6
">

Don't have an account?

<span

onClick={()=>navigate("/signup")}

className="
text-green-600
font-bold
cursor-pointer
ml-1
hover:underline
"

>

Create Account

</span>


</p>



</div>


</div>


)

}


export default Login;