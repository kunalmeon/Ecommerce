import  { useEffect,useState } from "react";
import axios from "axios";

function CategoryApi(token) {
  
  const [categories, setCategories] = useState([]);

  const[reloadCategory,setReloadCategory]=useState(false)
  useEffect(() => {
    async function getCategories() {
      const res = await axios.get("/api/getCategory", {
        headers: { Authorization: token },
      });
      setCategories(res.data.category)
      
    }
    getCategories()
  }, [reloadCategory]);

  return{
      categories:[categories, setCategories],
      reloadCategoryApi:[reloadCategory,setReloadCategory]
  }
}

export default CategoryApi;
