import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom"; // FIXED: react-router-dom se import kiya

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // FIXED: curly braces {} ko badalkar square brackets [] kiya gaya h
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = ["title", "description", "price", "category", "image", "stock"];

  const loadProduct = async () => {
    try {
      const res = await api.get(`/products`);
      
      // FIXED: p.id aur parseInt hatakar p._id === id kiya kyunki MongoDB hex ID use ho rhi h
      const product = res.data.find((p) => p._id === id);
      
      if (product) {
        setForm({
          title: product.title || "",
          description: product.description || "",
          price: product.price || "",
          category: product.category || "",
          image: product.image || "",
          stock: product.stock || "",
        });
      }
    } catch (err) {
      console.error("Error loading product:", err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Numbers ko string se numeric types me convert kar rha h safety ke liye
      const payload = {
        ...form,
        price: parseFloat(form.price) || 0,
        stock: parseInt(form.stock, 10) || 0,
      };

      await api.put(`/products/edit/${id}`, payload);
      alert("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  return (
    // FIXED: max-auto ko badalkar mx-auto kiya centering ke liye
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {allowedFields.map((key) => {
          const isNumeric = key === "price" || key === "stock";
          
          return (
            <input
              key={key}
              type={isNumeric ? "number" : "text"}
              name={key}
              value={form[key] || ""} // FIXED: fallback diya taaki controlled vs uncontrolled input ka warning na aaye
              onChange={handleChange}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          );
        })}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
