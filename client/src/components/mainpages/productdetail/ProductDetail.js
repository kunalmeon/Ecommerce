import React, { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productitem/ProductItem";

function ProductDetail(props) {
  const params = useParams();
  const state = useContext(GlobalState);
  state.id=params.id;
  
  const [product] = state.productsApi.products;
  const [token] = state.token;

  const [selectedProduct, setSelectedProduct] = useState([]);
  useEffect(() => {
    if (params) {
      product.forEach((item) => {
        if (item._id === params.id) setSelectedProduct(item);
      });
    }
  }, [params, product]);

  if (selectedProduct.length === 0) {
    return <div>Loading....</div>;
  }
  if (token) {
    return (
      <>
        <div className="product_detail">
          <img src={selectedProduct.productImage.url} alt=""  />
          <div className="description">
            <h2> {selectedProduct.title}</h2>
            <h4>
              Price= <span>{selectedProduct.priceDetails}</span>
            </h4>
            <h5>{selectedProduct.content}</h5>
            <br />
            <br />
            <p>{selectedProduct.description}</p>
            <h3>Sold: {selectedProduct.sold}</h3>

            <Link to="/cart" id="cart">
              Buy Now
            </Link>
          </div>
        </div>
        <h3>Related Product</h3>
        <div className="relatedProduct">
          {product.map((item) => {
            return item.category === selectedProduct.category ? (
              <ProductItem product={item} key={product._id} />
            ) : null;
          })}
        </div>
      </>
    );
  }

  return (
    <div className="notLoggedIn">
      <h3>Please Login or Register </h3>
    </div>
  );
}

export default ProductDetail;
