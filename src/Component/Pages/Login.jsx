import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/LogInBG.jpg";

import login from '../../assets/Login.png'
import pjs from "../../assets/PJs-image.png"
import username from "../../assets/User.png"
import password from "../../assets/Password.png"
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { requestFCMToken, onMessageListener } from "../../../src/firebase";
const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [fcmToken,setFcmToken] =useState("")
    const [formdata, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        
        requestFCMToken().then((token) => {
          if (token) {
            console.log("Token:", token);
            setFcmToken(token)
          }
        })});

    const [role, setRole] = useState("CUSTOMER");
    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(formdata.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        // if (!passwordRegex.test(formdata.password)) {
        //     newErrors.password = "Password must be at least 8 characters and include a letter and a number with one special character";
        //     valid = false;
        // }

        setErrors(newErrors);
        return valid;
    };


    const roleRoutes = {
        ADMIN: "/AdminDashboard",
        CUSTOMER: "/OurServices",
        DISPATCHER: "/DispatcherDashboard",
        TECHNICIAN: "/Profile"
    };
    useEffect(() => {
        if (location.pathname === "/AdminLogin") setRole("ADMIN");
        else if (location.pathname === "/TechnicianLogin") setRole("TECHNICIAN");
        else if (location.pathname === "/DispatcherLogin") setRole("DISPATCHER");
        else setRole("CUSTOMER"); 
    }, [location.pathname]);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        try {
            const requestBody = {
                email: formdata.email,
                password: formdata.password,
            };
    
            // Add fcmToken only if role is technician or customer
            if (role === "TECHNICIAN"  && fcmToken) {
                requestBody.fcmToken = fcmToken;
            }
    
            const response = await axios.post(
                API_ENDPOINTS[role]?.LOGIN,
                requestBody,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );
    
            console.log("Login Response:", response.data.data);
            console.log(requestBody,"req body")
            if (response.data.data.accessToken) {
                localStorage.setItem("accessToken", response.data.data.accessToken);
                localStorage.setItem("refreshToken", response.data.data.refreshToken);
            }
    
            toast.success("Login Successful!", {
                position: "top-center",
                autoClose: 2000,
            });
    
            setTimeout(() => {
                navigate(roleRoutes[role] || "/OurServices");
            }, 1000);
        } catch (error) {
            console.error("Login Error:", error.response?.data);
            toast.error(error.response?.data?.message || "Login failed!", {
                position: "top-center",
                autoClose: 2000,
            });
        }
    };
    


    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
         <ToastContainer />
            <div
                className="absolute inset-0 bg-cover bg-[#13275B] bg-center "
                style={{ backgroundImage: `url(${bg})`, height: "100vh" }}
            ></div>
               
               <div className="relative w-[90%] md:w-[70%]  pt-[2rem] bg-white shadow-lg rounded-lg h-auto max-h-[100%] mx-auto">
  <div className="flex flex-col md:flex-row justify-between items-center px-[5rem] gap-10  ">
    
  <div className="md:w-[33%] md:px-10  w-full text-center lg:text-left font-bold text-[3rem]">
  <div className="text-center">Welcome to the</div>
  <div className="">
  <img src={pjs} alt="pjs" style={{ width: 'auto' }} />
  </div>

</div>

    <div className="md:w-[20%]   w-full flex md:mt-[100px] justify-center">
      <img src={login} alt="Login" style={{ height: '25rem', width: 'auto' }} />
    </div>

    <form onSubmit={handleLogin} className="w-full md:w-[34%]  p-[1.5rem] rounded-lg">
      <h2 className="text-[2rem] font-bold mb-[1.5rem] text-center">Login</h2>

      {/* <div className="font-medium text-[1.4rem] px-[0.5rem] py-[1rem]">Email</div> */}
      <div className="relative">
      <img
    src={username}
    alt="user icon"
    className="absolute left-[1rem] top-8 transform -translate-y-1/2  "
  />
      <input
        type="text"
        placeholder="Username"
        className="w-full text-[1.2rem] bg-[#ECECEC] placeholder-black pl-[4rem] p-[1rem] mb-[1rem] border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
        value={formdata.email}
        onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
        required
        
      />
      {errors.email && <p className="text-red-500 text-[1.2rem] mb-[1rem]">{errors.email}</p>}
      </div>
      

      <div className="relative">
  <img
    src={password}
    alt="password icon"
    className="absolute left-[1rem] top-1/2 transform -translate-y-1/2  "
  />
  <input
    type={showPassword ? 'text' : 'password'}
    placeholder="Password"
    className="w-full text-[1.2rem] bg-[#ECECEC] placeholder-black pl-[4rem] pr-[5rem] p-[1rem] border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
    value={formdata.password}
    onChange={(e) => setFormData({ ...formdata, password: e.target.value })}
    required
  />

  {/* Show/Hide Password Button */}
  <button
    type="button"
    className="absolute right-[1rem] top-1/2 transform -translate-y-1/2 text-[1.2rem] text-gray-600"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? 'Hide' : 'Show'}
  </button>
</div>


      {errors.password && <p className="text-red-500 text-[1.2rem] mb-[1rem]">{errors.password}</p>}

      <div className="text-[1.2rem] flex justify-center mt-[1rem] ">
       
        <div className="text-[#989898]">Forgot your password ? </div>
        <div
          onClick={() =>
            navigate(
              role !== "CUSTOMER"
                ? `/${role.toLowerCase()}ForgetPassword`
                : '/ForgetPassword'
            )
          }
          className="text-[#5E5BFF] px-2 cursor-pointer"
        >
          Recover
        </div>
      </div>
     <div className="flex justify-center">
     <button
        type="submit"
        className="w-full font-semibold md:w-[50%] mt-[1.5rem] text-[1.2rem] bg-blue-500 hover:bg-blue-700 text-white p-[1rem] rounded-3xl"
      >
        Login Now
      </button>
     </div>
    

      <p className="mt-[1rem] text-[1.2rem] text-center">
        Don't have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => navigate("/Register")}
        >
          Register
        </span>
      </p>
    </form>
  </div>
</div>

        </div>
    );
};

export default Login;
