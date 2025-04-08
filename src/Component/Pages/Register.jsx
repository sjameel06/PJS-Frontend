import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/LogInBG.jpg";
import OurFeatures from "./OurFeatures";
import axios from "axios";
import login from '../../assets/Login.png'
import pjs from '../../assets/PJs-image.png'
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "", password: "" };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.length > 0 && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters and include a letter and a number with one special character";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };
console.log(API_ENDPOINTS,"endpoints")
    const handleRegister = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post(
                API_ENDPOINTS.CUSTOMER.REGISTER,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone: formData.phone,
                },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            toast.success("User Registered Successfully!", {
                position: "top-center", 
                autoClose: 2000,    
          })
            console.log("Register Response:", response.data);

            
           setTimeout(() => {
            navigate('/')
           }, 1000);
        } catch (error) {
            console.error("Register Error:", error.response?.data || error.message);
            toast.error(error.response?.data.message, {
                position: "top-center", 
                autoClose: 2000,    
          })
            
        }
    };

    return (
        <div>
 <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
 <ToastContainer />
            <div
                className="absolute inset-0 bg-cover bg-center  bg-[#13275B]  "
                style={{ backgroundImage: `url(${bg})`, height: "100%" }}
            ></div>

            <div className="relative w-[90%] md:w-[70%]  pt-[2rem] bg-white shadow-lg rounded-lg h-auto max-h-[100%] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center px-[5rem] gap-10  ">
             <div className="md:w-[33%] md:px-10  w-full text-center lg:text-left font-bold text-[3rem]">
             <div className="text-center ">Welcome to the</div>
  <div className="">
  <img src={pjs} alt="pjs" style={{ width: 'auto' }} />
  </div>
             </div>
            
               <div className="md:w-[20%]   w-full flex md:mt-[100px] justify-center">
      <img src={login} alt="Login" style={{ height: '25rem', width: 'auto' }} />
    </div>
               
                <form onSubmit={handleRegister} className="w-full md:w-[34%]  p-[1.5rem] rounded-lg">
                <h2 className="text-[2rem] font-bold mb-4 text-center">Register</h2>
                    {/* <div className="mb-2 font-medium pb-2 text-[1.4rem]">Name</div> */}
                    <input
                        type="text"
                        placeholder="Name"
                        
                        className="w-full text-[1.2rem] bg-[#ECECEC] placeholder-black  p-[1rem] mb-[1rem] border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    {/* <div className="mt-4 font-medium pb-2 text-[1.4rem] mb-2">Email</div> */}
                    <input
                        type="text"
                        placeholder="Email"
                        className="w-full text-[1.2rem] bg-[#ECECEC] placeholder-black p-[1rem] mb-[1rem] border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-[1.2rem] mb-3">{errors.email}</p>}

                    <div className="relative ">
                        {/* <div className="mt-4 mb-2 font-medium pb-2 text-[1.4rem]">Password </div> */}
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full text-[1.2rem] bg-[#ECECEC] placeholder-black p-[1rem] mb-[1rem] border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 cursor-pointer top-5 text-gray-600"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-[1.2rem] mb-3">{errors.password}</p>}
                    <div className="flex justify-center">
                    <button type="submit" className="w-full font-semibold md:w-[50%] mt-[1.5rem] text-[1.2rem] bg-blue-500 hover:bg-blue-700 text-white p-[1rem] rounded-3xl">
                        Register
                    </button>
                    </div>
                
                    <p className="mt-3 text-[1.2rem] text-center">
                    Already have an account?{" "}
                    <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/")}>
                        Login
                    </span>
                </p>
                </form>
               
               
             
             
               </div>
               
                

           
            </div>
            {/* <OurFeatures/>  */}
        </div>
      
        </div>
       
    );
};

export default Register;
