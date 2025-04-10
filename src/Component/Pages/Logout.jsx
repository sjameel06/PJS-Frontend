import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Logout = () => {
    const navigate = useNavigate();
console.log(API_ENDPOINTS.LOGOUT)
const refreshToken = localStorage.getItem("refreshToken");
console.log(refreshToken)
    const handleLogout = async () => {
       
        try {
            await axios.post(
                API_ENDPOINTS.LOGOUT,
                {token: refreshToken }, 
                // { withCredentials: true }
            );

            // Remove tokens from local storage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            toast.success("Logout Successful!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
            });

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Logout Error:", error.response?.data || error.message);
            toast.error("Logout Failed! Please try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
            });
        }
    };

    return (
        <div>
      <ToastContainer />
       <div className="flex justify-center items-center ">
       <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded"
        >
            Logout
        </button>
       </div>
      
        </div>
 
    );
};

export default Logout;
