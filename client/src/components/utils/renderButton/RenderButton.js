import React,{useContext} from "react";
import { Link } from "react-router-dom";
import {GlobalState} from '../../../GlobalState'

function RenderButton({ product ,deleteProduct}) {
  const state=useContext(GlobalState)
  const[isAdmin]=state.userApi.isAdmin;
  const addCart=state.userApi.addCart;
  const [isLoggedIn]=state.userApi.isLoggedIn;
  
  return (
    <div>
      {isAdmin ? (
        <div className="row_btn">
          <Link id="btn_view" to={`/edit_product/${product._id}`}>
           Edit
          </Link>
          <Link id="btn_buy" to="#!" color="black" onClick={deleteProduct}>
           Delete
          </Link>
        </div>
      
      ) : (
        <div className="row_btn">
          <Link id="btn_view" to={`/detail/${product._id}`}>
            View
          </Link>
          <Link id="btn_buy"  color="black" to={isLoggedIn?'/cart':'/login'} onClick={()=>addCart(product)}>
            Buy
          </Link>
        </div>
      )}
    </div>
  );
}

export default RenderButton;
