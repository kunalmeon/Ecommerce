import { useState, useEffect } from "react";
import axios from "axios";

function ProductsApi() {
  const [products, setProducts] = useState([]);
  const [productCallback, setProductCallback] = useState(false);
  const [category, setCategory] = useState("");
  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
 

  const getProducts = async () => {
    let url;
    url = `/api/product?limit=${page * 9}&${category}&title[regex]=${search}`;
    const res = await axios.get(url);
    setProducts(res.data.products);
  };
  useEffect(() => {
    getProducts();
  }, [productCallback, category, search]);
  return {
    products: [products, setProducts],
    productCallBack: [productCallback, setProductCallback],
    category: [category, setCategory],
 
    search: [search, setSearch],
    page: [page, setPage],

  };
}

export default ProductsApi;
