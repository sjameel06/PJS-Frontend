import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/Service/api.confiq';
import axios from "axios";
import axiosInstance from '../../utils/axiosInstance';
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Logout from './Logout';
import Login from './Login';
function EmployeeForm() {
  const formFields = ['name', 'password', 'email']; // ✅ Lowercase keys to match formData
  const roles = ['Dispatcher', 'Technician'];
  const [role, setRole] = useState('');
  const [showRoles, setShowRoles] = useState(false);
  const [formData, setFormData] = useState({ name: '', password: '', email: '', role: '' });
  const [errors, setErrors] = useState({ password: '', email: '' }); // ✅ Lowercase keys
  const [showPassword, setShowPassword] = useState(false);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
 

  const openEditPopup = (service) => {
    
    setEditPopupOpen(true);
  };

  const openDeletePopup = (service) => {
   
    setDeletePopupOpen(true);
  };
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;
    let newErrors = { password: '', email: '' }; // ✅ Lowercase to match formData keys

    console.log(API_ENDPOINTS.EMPLOYEE.ADD_EMPLOYEE);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.length > 0 && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (formData.password.length > 0 && !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include a letter and a number';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "datata")

    if (!validateForm()) return;

    try {
        const response = await axiosInstance.post(
            API_ENDPOINTS.EMPLOYEE.ADD_EMPLOYEE,
            { ...formData, Role: role },  
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, 
            }
        );
        toast.success("Employee Created Successfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
      });

      // setTimeout(() => {
      //   navigate("/JobAssignment"); 
      // }, 2000);
        console.log("Employee Added:", response.data);
       
    } catch (error) {
        console.error("Error Adding Employee:", error.response?.data || error.message);
        toast.error(error.response?.data.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "colored",
      });
    }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='bg-[#4DA1A9] min-h-screen py-10 w-full'>
      {/* <div className='flex justify-end items-center px-16'>
        <Logout/>
      </div> */}
  <div className='flex flex-col items-center justify-center  '>
           <ToastContainer />
           
      <h2 className='text-[3rem] font-semibold mb-4 '>Employee Form</h2>
      <div className='bg-white p-6 min-w-[300px] w-[30%] rounded-lg shadow-md '>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {formFields.map((field, index) => (
            <div key={index}>
              <label className='block font-medium text-[1.4rem]'>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <div className='relative'>
                <input
                  type={field === 'password' ? (showPassword ? 'text' : 'password') : 'text'}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full text-[1.2rem] p-2 my-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder={`Enter ${field}`}
                />
                {field === 'password' && (
                  <button
                    type="button"
                    className="absolute text-[1.2rem] cursor-pointer right-3 top-4 text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                )}
              </div>
              {errors[field] && <p className='text-red-500 text-[1.2rem]'>{errors[field]}</p>}
            </div>
          ))}

<div>
    <label className='px-1 font-medium text-[1.4rem]'>Role</label>
    <div className='relative cursor-pointer'>
        <input
            type='text'
            value={formData.role}
            readOnly
            className="w-full p-2 my-2 cursor-pointer text-[1.2rem] border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder='Select Role'
            onClick={() => setShowRoles(!showRoles)}
        />
        <span className='absolute right-3 top-5 text-gray-600 cursor-pointer' onClick={() => setShowRoles(!showRoles)}>
            ▼
        </span>
        {showRoles && (
            <ul className='absolute z-2 text-[1.2rem] w-full bg-white border rounded-md shadow-md mt-2'>
                {roles.map((r, index) => (
                    <li 
                        key={index} 
                        className='px-3 py-2 hover:bg-gray-200 cursor-pointer' 
                        onClick={() => { 
                            setFormData((prev) => ({ ...prev, role: r })); // Role update
                            setShowRoles(false); 
                        }}
                    >
                        {r}
                    </li>
                ))}
            </ul>
        )}
    </div>
</div>


          <div className='pt-2'>
            <button type='submit' className="w-full text-[1.2rem] cursor-pointer bg-blue-500 text-white p-2 rounded-lg">
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  
  );
}

export default EmployeeForm;
