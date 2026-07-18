import { useEffect, useState } from "react";
import api from "../api/axios"
import { useParams } from "react-router-dom"


export default function ProductDetails() {

  const {id} = useParams();
  const {product, setProduct} = useState(null)

  const loadProduct = async () => {
    const res = await api.get('/product/')
    const p = res.data.find((item) => item.id == id)
    setProduct(p)
  }

    useEffect(() => {
      loadProduct()
    }, [])

    if (!product) {
      return <div>Loading....</div>
    }

    return(
      <div className="p-6"></div>
    )

  }

