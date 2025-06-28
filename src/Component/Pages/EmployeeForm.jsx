import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../utils/Service/api.confiq';
import axios from "axios";
import axiosInstance from '../../utils/axiosInstance';
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Logout from './Logout';
import Login from './Login';
import SVG from '../../assets/Svg/Svg';
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
    
      setTimeout(() => {
        navigate('/EmployeeList') 
      }, 2000);
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
    <div className='bg-[#FAF8FB]   ml-24 p-10       min-h-screen '>
      {/* <div className='flex justify-end items-center px-16'>
        <Logout/>
      </div> */}
  <div >
  <div className='flex flex-col items-center justify-center  '>
           <ToastContainer />
         </div>  
         <div className=' flex items-center gap-2'>
         <div><SVG.User fill="#1E73BE"/></div>
         <div className='text-[#1E73BE] text-[2rem] font-medium'>
         User Management → Add User
         </div>
         </div>
       
      <h2 className='text-[1.6rem] text-[#4E4E4E] font-semibold py-4 '>Add User</h2>
      <div className='bg-white h-screen p-6  rounded-[6px]  '>
      <form className='space-y-4 flex items-center gap-4 flex-wrap'>
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
          className="w-[291px] text-[1.2rem] p-3 my-2 border-[1px] border-[#E5E5E5] rounded-[3px] focus:outline-none focus:border-blue-500"
          placeholder={`Enter ${field}`}
        />
        {field === 'password' && (
          <button
            type="button"
            className="absolute text-[1.2rem] cursor-pointer right-3 top-6 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {errors[field] && <p className='text-red-500 text-[1.2rem]'>{errors[field]}</p>}
    </div>
  ))}

  {/* Role Dropdown */}
  <div>
    <label className='px-1 font-medium text-[1.4rem]'>Role</label>
    <div className='relative cursor-pointer'>
      <input
        type='text'
        value={formData.role}
        readOnly
        className="p-3 my-2 cursor-pointer w-[291px] text-[1.2rem] border border-[#E5E5E5] rounded-[3px] focus:outline-none focus:border-blue-500"
        placeholder='Select Role'
        onClick={() => setShowRoles(!showRoles)}
      />
      <span className='absolute right-3 top-9 text-gray-600 cursor-pointer' onClick={() => setShowRoles(!showRoles)}>
        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.375 1.25L4.5 4.375L7.625 1.25" stroke="#4E4E4E" strokeWidth="0.9375" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      {showRoles && (
        <ul className='absolute z-2 text-[1.2rem] w-full bg-white border border-[#E5E5E5] rounded-md shadow-md mt-2'>
          {roles.map((r, index) => (
            <li
              key={index}
              className='px-3 py-2 hover:bg-gray-200 cursor-pointer'
              onClick={() => {
                setFormData((prev) => ({ ...prev, role: r }));
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
</form>

{/* Buttons */}
<div className='flex justify-end gap-5'>
  <div className='pt-2'>
    <button onClick={() => navigate('/EmployeeList')} className="text-[1.2rem] cursor-pointer bg-[#676767] text-white px-15 py-2 rounded-[4px]">
      Cancel
    </button>
  </div>
  <div className='pt-2'>
    <button
      type='button'
      onClick={handleSubmit}
      className="text-[1.2rem] cursor-pointer bg-[#1E73BE] text-white px-15 py-2 rounded-[4px]"
    >
      Add User
    </button>
  </div>
</div>

       
      </div>
    </div>
    </div>
  
  );
}

export default EmployeeForm;
