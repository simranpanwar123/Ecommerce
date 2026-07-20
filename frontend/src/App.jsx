import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/ProductList";
import Layout from "./Layout";
import Cart from "./pages/Cart";


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetails /> },
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/add", element: <AddProduct /> },
      { path: "/admin/products/:id/edit/", element: <EditProduct /> },
      { path: "/cart", element: <Cart /> },
    ]
      
  }

]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}