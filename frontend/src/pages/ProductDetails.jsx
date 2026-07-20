// import { useEffect, useState } from "react";
// import api from "../api/axios"
// import { useParams } from "react-router"


// export default function ProductDetails() {

//   const {id} = useParams();
//   const [product, setProduct] = useState(null)

//   const loadProduct = async () => {
//     const res = await api.get("/products/");
//     const p = res.data.find((item) => item._id === id);
//     console.log("Backend से आया डेटा:", res.data);

//     setProduct(p);
//   };

//   useEffect(() => {
//       loadProduct()
//   }, []);

//   if (!product) {
//       return <div>Loading....</div>
//   }

//     return(
//       <div className="p-6 max-w-3xl mx-auto">
//         <img src={product.image} alt={product.title} className="w-full h-40 object-contain rounded bg-white" />
//         <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
//         <p className="text-gray-600 mt-2">{product.description}</p>
//         <p className="text-lg font-semibold mt-4">${product.price}</p>

//         <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Add to Cart
//         </button>
//       </div>
//     )

//   }

import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const loadProduct = async () => {
    try {
      // 1. Fetch data from API
      const res = await api.get("/products/");
      let dataArray = res.data;

      // 2. Safeguard: Extract array if backend wraps it inside an object (e.g., { products: [...] })
      if (dataArray && !Array.isArray(dataArray)) {
        dataArray = dataArray.products || dataArray.data || [];
      }

      // 3. Find the matching product if it is a valid array
      if (Array.isArray(dataArray)) {
        const p = dataArray.find((item) => item._id === id);
        if (p) {
          setProduct(p);
          setError(null); // Clear previous errors
        } else {
          setError("Product not found in the database.");
        }
      } else {
        console.error("API did not return an array:", res.data);
        setError("Invalid data format received from the server.");
      }
    } catch (err) {
      console.error("Failed to fetch product data:", err);
      setError("Failed to connect to the server. Please check your connection.");
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]); // Triggers reload if the URL product ID changes

  // Error UI
  if (error) {
    return (
      <div className="p-6 max-w-3xl mx-auto text-red-500 font-semibold text-center">
        {error}
      </div>
    );
  }

  // Loading UI
  if (!product) {
    return <div className="p-6 max-w-3xl mx-auto text-center font-medium text-gray-500">Loading....</div>;
  }

  // Success UI
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img src={product.image} alt={product.title} className="w-full h-40 object-contain rounded bg-white" />
      <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-lg font-semibold mt-4">${product.price}</p>

      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
