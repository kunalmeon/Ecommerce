import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../../utils/productitem/ProductItem";
import Filter from "../products/Filter";

function Products() {
  const states = useContext(GlobalState);
  const [products] = states.productsApi.products;
  const [isAdmin] = states.userApi.isAdmin;

  return (
    <>
      <Filter />
      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
    </>
  );
}

export default Products;
