import React, { useContext } from "react";

import axios from "axios";
import {GlobalState} from '../../../GlobalState'
import RenderButton from "../../utils/renderButton/RenderButton";

function ProductImem({ product, isAdmin }) {
  const state=useContext(GlobalState)
  const [productCallback,setProductCallback]=state.productsApi.productCallBack;
  async function deleteProduct() {
    try {
      const deleteImage =  axios.post("/api/deleteImage", {
        public_id: product.productImage.public_id,
      });
      const deleteProduct =  axios.delete(`api/product/${product._id}`);
      await deleteImage
      await deleteProduct
      setProductCallback(!productCallback)

    } catch (error) {
      console.log("something happend vary bad")
    }
  }
  return (
    <div className="product_card">
      
      <img src={product.productImage.url} alt="" />

      <div className="product_box">
        <h2>{product.title.toUpperCase()}</h2>
      </div>

      <RenderButton
        product={product}
        isAdmin={isAdmin}
        deleteProduct={deleteProduct}
      />
    </div>
  );
}

export default ProductImem;
