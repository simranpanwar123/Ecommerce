import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AddProduct() {
  const [ form, setForm ] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });


  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/products/add", form);
     alert("product added successfully")
      navigate("/admin/products");
    }
    catch (error) {
      console.error("Error adding product:", error);
    }
  }
    return (
        <div className="max-w-lg max-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold mb-6 text-center">Add New Product </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                {Object.keys(form).map((key) => (
                        <input
                         key={key}
                         name={key}
                         value={form[key]}
                         onChange={handleChange}
                         placeholder={key}
                         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    ))  
                }

                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Add Product
                </button>
            </form>

        </div>

    )
}
