import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../api/axios"

const Login = () => {
  const [form, setForm] = useState({
    email:"",
    password:""

  })
  const [msg, setMsg] = useState('')

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const response = await api.post('/auth/login', form)

      // save token
      localStorage.setItem('token', response.data.token)
      setMsg("login successful")

      // redirect to home page
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
    catch(err){
      setMsg(err.response?.data?.message || "An error occurred")
    }
  }
  
  
  return(
  
  <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
  
        <h2 className='text-2xl font-bold mb-6 text-center'>Login to Your Account</h2>

        {msg && ( <p className='text-red-500 mb-4'>{msg}</p>
         )}
  
        <form onSubmit={handleSubmit} className='space-y-4'>
  
          <input 
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
          />
  
          <input 
          name='password'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          className='border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full'
          />
  
          <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300'
          >
            Login
          </button>
  
        </form>
  
      </div>
  
    </div>
  
)

}
export default Login
