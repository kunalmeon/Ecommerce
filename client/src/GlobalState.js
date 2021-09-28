import { createContext, useState, useEffect } from "react";
import ProductsApi from "./api/ProductsApi";
import axios from "axios";
import UserApi from './api/UserApi'
import CategoryApi from './api/CategoryApi'
export const GlobalState = createContext();
export const GlobalStateProvider = (props) => {
  const [token, setToken] = useState(false);

  const getToken = async () => {
    try {
      const response = await axios.get("/user/token");
      
      setToken(response.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("firstLogin")) {
      getToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsApi: ProductsApi(),
    userApi:UserApi(token),
    categoryApi:CategoryApi(token)
  };
  

  

  return (
    <GlobalState.Provider value={state}>{props.children}</GlobalState.Provider>
  );
};
