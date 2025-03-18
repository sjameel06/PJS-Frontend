import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/Capture.jpg";
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
        ADMIN: "/EmployeeForm",
        CUSTOMER: "/OurServices",
        DISPATCHER: "/Profile",
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
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${bg})`, height: "100vh" }}
            ></div>
               
            <div className="relative min-w-[300px] w-[30%] p-6 bg-white shadow-lg rounded-lg backdrop-blur-md bg-white/90">
                <h2 className="text-[2rem] font-bold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="font-medium text-[1.4rem] px-1 py-2">Email</div>
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full text-[1.2rem]  p-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        value={formdata.email}
                        onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-[1.2rem] mb-3">{errors.email}</p>}
                    
                    <div className="relative ">
                        <div className="font-medium  text-[1.4rem] px-1 py-2">Password</div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full text-[1.2rem] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                            value={formdata.password}
                            onChange={(e) => setFormData({ ...formdata, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            className="absolute cursor-pointer right-3 top-15 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>

                    {errors.password && <p className="text-red-500 text-[1.2rem] mb-3">{errors.password}</p>}
                    <div className=" flex items-center text-[1.2rem] mt-2 justify-center">
                        <div   onClick={() => navigate(role != "CUSTOMER" ? `/${role.toLocaleLowerCase()}ForgetPassword` : '/ForgetPassword')} className="text-blue-500 cursor-pointer">Forget Password ?</div>
                    </div>
                    <button type="submit" className="w-full mt-4 cursor-pointer text-[1.2rem] hover:bg-blue-700 bg-blue-500  text-white p-2 rounded-lg" >
                        Login
                    </button>
                </form>
                <p className="mt-3 text-[1.2rem] text-center">
                    Don't have an account?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/Register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
