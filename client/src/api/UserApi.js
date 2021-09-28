import { useEffect, useState } from "react";
import axios from "axios";
function UserApi(token) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const[reloadProducts,setReloadProducts]=useState(false)

  async function getUserInfromation() {
    const res = await axios.get("/user/userInfo", {
      headers: { Authorization: token },
      
    });

  

    res.data.user.role === "admin" ? setIsAdmin(true) : setIsAdmin(false);
    setIsLoggedIn(true);
    setCart(res.data.user.cart)
  }
  useEffect(() => {
    if (token) getUserInfromation();
  }, [token , reloadProducts]);

  const addCart = async (product) => {
    if (!isLoggedIn) return alert("Please Login To Buy");
    const checkProductInCart = cart.every((item) => {
      return item._id !== product._id;
    });

    if (checkProductInCart) {
      setCart([...cart, { ...product, quantity: 1 }]);
      await axios.patch(
        "/user/addCart",
       {cart:[...cart, { ...product, quantity: 1 }]},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return alert("Product Added");
    } else {
      return alert("This product already exists in cart");
    }
  };

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
    cart: [cart, setCart],
    reloadProductsApi:[reloadProducts,setReloadProducts]
  };
}

export default UserApi;
