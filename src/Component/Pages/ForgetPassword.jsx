import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import bg from "../../assets/Capture.jpg";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";

function ForgetPassword() {
    const [formdata, setFormData] = useState({ email: "" });
    const [errors, setErrors] = useState({ email: "" });
    const [successMessage, setSuccessMessage] = useState("");
    const [role, setRole] = useState("CUSTOMER"); 

    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes("admin")) setRole("ADMIN");
        else if (location.pathname.includes("technician")) setRole("TECHNICIAN");
        else if (location.pathname.includes("dispatcher")) setRole("DISPATCHER");
        else setRole("CUSTOMER");
    }, [location.pathname]);

    const validateForm = () => {
        let valid = true;
        let newErrors = { email: "" };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formdata.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!emailRegex.test(formdata.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post(
                API_ENDPOINTS[role]?.FORGET_PASSWORD,
                { email: formdata.email },
                { withCredentials: true }
            );

            console.log(`${role} Forget Password Response:`, response.data);
            setSuccessMessage("Check your email, there's a link to reset your password.");
        } catch (error) {
            console.error(`${role} Forget Password Error:`, error.response?.data?.message || error.message);
            setErrors({ email: "Failed to send reset email. Try again later." });
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${bg})`, height: "100vh" }}
            ></div>
            <div className="relative min-w-[300px] w-[30%] p-6 bg-white shadow-lg rounded-lg backdrop-blur-md bg-white/90">
                <h2 className="text-[2rem] font-bold mb-4 text-center"> Forget Password</h2>
                
                {successMessage ? (
                    <p className="text-green-600 text-[1.4rem] text-center">{successMessage}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="font-medium text-[1.4rem] px-1 py-2">Email</div>
                        <input
                            type="text"
                            placeholder="Email"
                            className="w-full text-[1.2rem] p-2 mb-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            value={formdata.email}
                            onChange={(e) => setFormData({ ...formdata, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-[1.2rem] mb-3">{errors.email}</p>}

                        <button
                            type="submit"
                            className="w-full mt-4 cursor-pointer text-[1.2rem] hover:bg-blue-700 bg-blue-500  text-white p-2 rounded-lg"
                        >
                            Submit
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ForgetPassword;
