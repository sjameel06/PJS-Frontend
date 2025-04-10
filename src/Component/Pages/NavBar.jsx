import React from 'react';
import Logout from './Logout';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import dashboard from '../../assets/Group.png'
function NavBar() {
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  const role = decoded.role;
  console.log(role, "role");
  const navigate = useNavigate();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#1E73BE] w-84 h-screen fixed top-0 left-0 text-white  flex flex-col space-y-4 border-r border-gray-300">
        

        {/* Role-based Menu */}
        <div className=" ">
  <img 
    src={dashboard} 
    alt="pjs" 
    style={{ height: "120px", width: "303px" }} 
  />
</div>

        <div className="space-y-4 text-[1.6rem] px-6 py-6">
          {role === "admin" && (
            <>
              <button 
                onClick={() => navigate("/AdminDashboard")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Dashboard
              </button>
              <button 
                onClick={() => navigate("/EmployeeForm")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Add Employee
              </button>
              <button 
                onClick={() => navigate("/EmployeeList")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Employee List
              </button>
              <button 
                onClick={() => navigate("/OurServices")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Our Services
              </button>
            </>
          )}

          {role === "dispatcher" && (
            <div>
              <button 
                onClick={() => navigate("/JobAssignment")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Job Assignment
              </button>
              <button 
                onClick={() => navigate("/Profile")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Profile
              </button>
            </div>
          )}

          {role === "technician" && (
            <div>
              <button 
                onClick={() => navigate("/Profile")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Profile
              </button>
              <button 
                onClick={() => navigate("/Status")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                Status
              </button>
            </div>
          )}

          {role === "customer" && (
            <div>
              <button 
                onClick={() => navigate("/MyOrder")} 
                className="hover:text-gray-200 cursor-pointer transition duration-300 w-full text-left"
              >
                My Orders
              </button>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <div className="flex flex-col text-[1.6rem]  justify-end py-10 h-full">
          <Logout />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 border  overflow-y-auto">
        {/* Content will be rendered here */}
      </div>
    </div>
  );
}

export default NavBar;
