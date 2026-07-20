import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const updateCart = () => {
      setCartCount(Number(localStorage.getItem("cartCount")) || 0);
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-xl text-gray-800">
        E-Commerce
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          to="/cart"
          className="relative text-lg font-medium text-gray-700 hover:text-blue-600"
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-3 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </Link>

        {!userId ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}