import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    const res = await api.get(`/products?search=${search}&category=${category}`);
    setProducts(res.data.products);
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    alert("Please login to add items to cart");
    return;
  }

  try {
    const res = await api.post("/cart/add", {
      userId,
      productId
    });

    const items = res.data.items || [];

    const total = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    localStorage.setItem("cartCount", total);

    // Navbar + Cart refresh
    window.dispatchEvent(new Event("cartUpdated"));

    alert("Item added to cart successfully!");

  } catch (error) {
    console.error("Cart error:", error);
  }
};

  return (
    <div className="p-6">
      {/* SEARCH & CATEGORY */}
      <div className="mb-4 flex gap-3">
        <input 
          type="text"
          placeholder="Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="laptops">Laptops</option>
          <option value="mobiles">Mobiles</option>
          <option value="tablets">Tablets</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div key={product._id} className="border rounded p-3 shadow hover:shadow-lg transition">
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain bg-white rounded"
              />
              <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
              <p>${product.price}</p>
            </Link>
            
            
            <button 
              onClick={() => addToCart(product._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2 w-full cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
