import React from 'react'
import { useState } from 'react'
import api from '../api/axios'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [msg, setMsg] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {

    
    e.preventDefault()


    try{
      const response =await api.post('/auth/signup', formData)
      setMsg(response.data.message)
    }
    catch(err){
      setMsg(err.response?.data?.message || "An error occurred")
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm'>

        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>

          {msg && ( <p className='text-red-500 mb-4'>{msg}</p>
         )}
        
        <form onSubmit={handleSubmit} className='space-y-4'>

          <input 
          name='username'
          placeholder='Enter your Username'
          value={formData.username}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
          
          />

          <input 
          name='email'
          placeholder='Enter your Email'
          value={formData.email}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
          
          />

          <input 
          name='password'
          type='password'
          placeholder='Enter your Password'
          value={formData.password}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          required
          
          />

          <button type='submit' className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300'>
            Sign Up
          </button>


        </form>

      </div>
    </div>
  )
}

export default Signup
