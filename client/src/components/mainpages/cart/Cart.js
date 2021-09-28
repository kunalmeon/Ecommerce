import React, { useContext, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";

function Cart() {
  const state = useContext(GlobalState);
  let [cart] = state.userApi.cart;
  const [token] = state.token;
  const [reloadProducts,setReloadProducts]=state.userApi.reloadProductsApi;
 
 
  
  

  async function handleItemDleteClick(id) {
    const newItem = cart.filter((item) => item._id !== id);

    await axios.patch(
      "/user/addCart",
      { cart: [...newItem] },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  setReloadProducts(!reloadProducts)
  }
  
  


  if (cart.length === 0) {
    return (
      <div>
        <h3>Cart is Empty</h3>

      </div>
    );
  }
 
  return (
    <div className="cart_detail">
      {cart.map((product) => {
        return (
          <div className="single-item">
            <img src={product.productImage.url} alt="" />
            <div className="cart-box-detail">
              <h2> {product.title}</h2>
              <h4>
                Price= <span>{product.priceDetails}</span>
              </h4>
              <h5>{product.content}</h5>
              <br />
              <br />

              
              <Link id="btn_payment" to="/payment">
                Payment
              </Link>

              <div className="remove-btn">
                <button onClick={() => handleItemDleteClick(product._id)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Cart;
