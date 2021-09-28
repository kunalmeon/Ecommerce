import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
function Filter() {
  const state = useContext(GlobalState);

  const [category, setCategory] = state.productsApi.category;
  const [search,setSearch] = state.productsApi.search;

  const [categories] = state.categoryApi.categories;

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  return (
    <div className="filter_menu">
      <div className="row">
        <span>Search:</span>
        <select
          name="category"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">All Products</option>
          {categories.map((item) => {
            return (
              <option value={"category=" + item.name} key={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter name to search"
          onChange={(e) => setSearch( e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filter;
