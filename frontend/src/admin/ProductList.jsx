import { useEffect, useState } from "react";
// FIXED: react-router ko badalkar react-router-dom kiya gaya h
import { Link } from "react-router-dom"; 
import api from "../api/axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);

 const loadProduct = async () => {
  try {
    const response = await api.get("/products");
    
    // Console log check karne ke liye ki backend se kya structure aa raha hai
    console.log("Backend Response Data:", response.data);

    // STATUS CHECK 1: Agar backend seedhe array bhej raha hai
    if (Array.isArray(response.data)) {
      setProducts(response.data);
    } 
    // STATUS CHECK 2: Agar backend data ko wrap karke kisi property me bhej raha hai
    else if (response.data && typeof response.data === "object") {
      // Yeh automatically aapke object ke andar se array dhoond nikalega (jaise response.data.products)
      const foundArray = Object.values(response.data).find(val => Array.isArray(val));
      
      if (foundArray) {
        setProducts(foundArray);
      } else {
        console.error("Backend response me koi array nahi mila:", response.data);
        setProducts([]); // Safe fallback to avoid crash
      }
    } else {
      setProducts([]);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    setProducts([]);
  }
};


  const deleteProduct = async (id) => {
    if (!id) return alert("Invalid product ID");
    try {
      await api.delete(`/products/delete/${id}`);
      alert("Product deleted successfully");
      loadProduct();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  useEffect(() => {
    loadProduct();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-center">Product List</h2>
        <Link
          to="/admin/products/add"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Product
        </Link>
      </div>
      
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">Price</th>
            <th className="border border-gray-200 px-4 py-2">Stock</th>
            <th className="border border-gray-200 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-gray-100 text-center">
              <td className="border border-gray-200 px-4 py-2">{product.title}</td>
              <td className="border border-gray-200 px-4 py-2">${product.price}</td>
              <td className="border border-gray-200 px-4 py-2">{product.stock}</td>
              <td className="border border-gray-200 px-4 py-2 flex justify-center gap-4">
                <Link
                  to={`/admin/products/${product._id}/edit`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </Link>
                {/* FIXED: deletedProduct ko badalkar deleteProduct kiya gaya h */}
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
