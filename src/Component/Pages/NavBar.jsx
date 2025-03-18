import React from 'react'
import Logout from './Logout'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
function NavBar() {
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  const role = decoded.role
  console.log(role,"role")
  const navigate = useNavigate()
  return (
    <div className="bg-[#4DA1A9] w-full py-3 px-6 flex justify-between items-center border-b border-gray-300 shadow-md">
      
    <div className="flex  space-x-6 text-white font-semibold text-lg">
      {role === "admin" && (
        <>
          <button 
            onClick={() => navigate("/AdminDashboard")} 
            className="hover:text-gray-200 cursor-pointer transition duration-300"
          >
            Home
          </button>
          <button 
            onClick={() => navigate("/EmployeeForm")} 
            className="hover:text-gray-200  cursor-pointer transition duration-300"
          >
            Add Employee
          </button>
          <button 
            onClick={() => navigate("/EmployeeList")} 
            className="hover:text-gray-200 cursor-pointer transition duration-300"
          >
            Employee List
          </button>
          <button 
            onClick={() => navigate("/OurServices")} 
            className="hover:text-gray-200 cursor-pointer transition duration-300"
          >
            Our Services
          </button>
        </>
      )}
    </div>
     {role === "dispatcher" && 
       <div className='flex gap-4'>
         {/* <button 
        onClick={() => navigate("/JobList")} 
        className="hover:text-gray-200 cursor-pointer transition duration-300"
      >
        Job List
      </button> */}
       <button 
       onClick={() => navigate("/JobAssignment")} 
       className="hover:text-gray-200 cursor-pointer transition duration-300"
     >
       Job Assignment
     </button>
     <button 
       onClick={() => navigate("/Profile")} 
       className="hover:text-gray-200 cursor-pointer transition duration-300"
     >
       Profile
     </button>
       </div>
      }

      {
        role === "technician" && 
        <div className='flex gap-4'>
        <button 
       onClick={() => navigate("/Profile")} 
       className="hover:text-gray-200 cursor-pointer transition duration-300"
     >
       Profile
     </button>
     <button 
       onClick={() => navigate("/Status")} 
       className="hover:text-gray-200 cursor-pointer transition duration-300"
     >
       Status
     </button>

          </div>
      }
    {/* Right Section - Logout */}
    <div>
      <Logout />
    </div>
    
  </div>
      
  )
}

export default NavBar
