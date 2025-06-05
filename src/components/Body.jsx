import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from 'axios';
import { BASE_URL} from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
  
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response && err.response.status === 401) { 
        navigate("/login");
      }
      console.error("Body.js fetchUser error:", err);
    }
  };
  
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, [userData]); // Re-run only when `userData` changes
  

  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body