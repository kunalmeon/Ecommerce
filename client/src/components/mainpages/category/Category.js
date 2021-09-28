import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";

function Category() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [categories] = state.categoryApi.categories;
  const [
    reloadCategory,
    setReloadCategory,
  ] = state.categoryApi.reloadCategoryApi;

  const [newCategory, setNewCategory] = useState(" ");
  const [onEdit, setOnEdit] = useState(false);
  const [id, setId] = useState("");

  async function handleCreateCategory(e) {
    e.preventDefault();
    try {
      if (onEdit) {
        await axios.patch(
          `/api/category/${id}`,
          { name: newCategory },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        await axios.post(
          "/api/createCategory",
          { name: newCategory },
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }
      setOnEdit(false);
      setNewCategory(" ");
      setReloadCategory(!reloadCategory);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  async function handleCategoryEdit(id, name) {
    setOnEdit(true);
    setNewCategory(name);
    setId(id);
  }

  async function handleCategoryDelete(id) {
    try {
      await axios.delete(`/api/category/${id}`, {
        headers: { Authorization: token },
      });
      setReloadCategory(!reloadCategory);
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="categories">
      <form onSubmit={handleCreateCategory}>
        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
        
      </form>

      <div className="row">
        {categories.map((item) => {
          return (
            <div key={item._id}>
              <p>{item.name}</p>
              <div>
                <button onClick={() => handleCategoryEdit(item._id, item.name)}>
                  Edit
                </button>
                <button onClick={() => handleCategoryDelete(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
