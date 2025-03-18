import React, { useState } from "react";
import bg from "../../assets/Capture.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";

function ResetPassword() {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    let userRole = null;
if (token) {
    try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.role.toUpperCase(); 
    } catch (error) {
        console.error("Invalid token", error);
    }
}


    console.log("User Role:", userRole);

    const validateForm = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
        let valid = true;
        let newErrors = { password: "", confirmPassword: "" };

        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be at least 8 characters long, include a letter, a number, and a special character.";
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const endpoint = API_ENDPOINTS[userRole]?.RESET_PASSWORD;

        if (!endpoint) {
            console.error("Invalid role:", userRole);
            return;
        }

        try {
            const response = await axios.post(endpoint, {
                password: formData.password,
                token,
            });

            if (response.status === 200) {
                setSuccessMessage("Your password has been reset successfully!");
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                console.error("Failed to reset password", response.data);
            }
        } catch (error) {
            console.error("Error resetting password:", error.response?.data || error.message);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            <div className="absolute inset-0 bg-cover bg-center opacity-10"
                style={{ backgroundImage: `url(${bg})`, height: "100vh" }}
            ></div>
    
            <div className="relative min-w-[300px] w-[30%] p-6 bg-white shadow-lg rounded-lg backdrop-blur-md bg-white/90">
                <h2 className="text-[2rem] font-bold mb-4 text-center">Reset Password</h2>
    
                {successMessage ? (
                    <p className="text-green-600 text-[1.4rem] text-center">{successMessage}</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        {/* Password Field */}
                        <div className="relative">
                            <div className="font-medium text-[1.4rem] px-1 py-2">New Password</div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                className="w-full text-[1.2rem] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-18 transform -translate-y-1/2 text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                            {errors.password && <p className="text-red-500 text-[1.2rem]">{errors.password}</p>}
                        </div>
    
                        {/* Confirm Password Field */}
                        <div className="relative mt-4">
                            <div className="font-medium text-[1.4rem] px-1 py-2">Confirm Password</div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                className="w-full text-[1.2rem] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 pr-10"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-18  transform -translate-y-1/2 text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-[1.2rem]">{errors.confirmPassword}</p>}
                        </div>
    
                        <button
                            type="submit"
                            className="w-full mt-4 cursor-pointer text-[1.2rem] hover:bg-blue-700 bg-blue-500 text-white p-2 rounded-lg"
                        >
                            Reset Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ResetPassword;
