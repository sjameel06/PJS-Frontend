import React from 'react';
import Logout from './Logout';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import dashboard from '../../assets/Group.png'
import { useLocation } from 'react-router-dom';
import SVG from '../../assets/Svg/Svg';
function NavBar() {
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }
  const role = decoded.role;
const isActive = (path) =>
  currentPath === path
    ? "bg-white text-[#1E73BE]"
    : "hover:text-gray-200 text-white";
 
  console.log(role, "role");
  const navigate = useNavigate();
 

  const location = useLocation();
  const currentPath = location.pathname;
  console.log(location,"locloc")
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-[#1E73BE]   sm:w-[22rem] 2xl:w-[25rem] fixed   h-screen  text-white  flex flex-col space-y-4 border-r border-gray-300">
        

        {/* Role-based Menu */}
        <div className=" ">
  <img 
    src={dashboard} 
    alt="pjs" 
    style={{ height: "120px", width: "303px" }} 
  />
</div>

        <div className="flex flex-col gap-3 px-3 py-3 text-[1.6rem] ">
          {role === "admin" && (
            <> 
       <div  className={`text-[1.6rem] font-medium cursor-pointer px-3 py-2 flex items-center gap-3 transition duration-300 text-left w-full ${
      location.pathname === "/AdminDashboard"
        ? "text-[#1E73BE] bg-white rounded-[5px] hover:text-blue-700 "
        : "text-white"
    }`}>
  <SVG.Dashboard
  stroke={location.pathname === "/AdminDashboard" ? "#1E73BE" : "white"}
  size={20}
/>
  <button
    onClick={() => navigate("/AdminDashboard")}
   
  >
    Dashboard
  </button>
</div>
             <div  className={`cursor-pointer flex items-center gap-3 px-3 py-2 ${location.pathname === "/EmployeeForm" ? "text-[#1E73BE] bg-[#fff]  rounded-[5px]  hover:text-blue-700 " : "text-[#fff] " }   text-[1.6rem] font-medium  transition duration-300 w-full text-left`}>
            <SVG.User fill ={location.pathname === "/EmployeeForm" ?   "#1E73BE" : "white"} />
            <button 
                onClick={() => navigate("/EmployeeForm")} 
               
              >
                Add User
              </button>
             </div>
     
           
              
             <div    className={` cursor-pointer px-3 py-2  flex items-center gap-3  ${location.pathname === "/EmployeeList" ? "text-[#1E73BE] bg-[#fff] rounded-[5px] hover:text-blue-700 " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}>
            <SVG.EmployeeList  stroke ={location.pathname === "/EmployeeList" ?   "#1E73BE" : "white"} />
            <button 
                onClick={() => navigate("/EmployeeList")} 
             
              >
                Employee List
              </button>
             </div>
         
              <div    className={` cursor-pointer  px-3 py-2 flex items-center gap-3 ${location.pathname === "/OurServices" ? "text-[#1E73BE] bg-[#fff]  rounded-[5px] hover:text-blue-700  " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}>
              <SVG.Service fill={location.pathname === "/OurServices" ? "#1E73BE" : "white"}/>
              <button 
                onClick={() => navigate("/OurServices")} 
             
              >
                Our Services
              </button>
              </div>
             
            </>
          )}

          {role === "dispatcher" && (
            <div className=' flex flex-col gap-3'>
              <div  className={`cursor-pointer px-3 py-2 flex items-center  gap-3  ${location.pathname === "/DispatcherDashboard" ? "text-[#1E73BE] bg-[#fff] rounded-[5px]  hover:text-blue-700 " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}>
                <SVG.Dashboard  stroke={location.pathname === "/DispatcherDashboard" ? "#1E73BE" : "white"}/>
              <button 
                onClick={() => navigate("/DispatcherDashboard")} 
               
              >
                Dashboard
              </button>
                </div>
          
              <div     className={`cursor-pointer px-3 py-2 flex items-center gap-3 ${location.pathname === "/Profile" ? "text-[#1E73BE] bg-[#fff]  rounded-[5px] hover:text-blue-700  " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}> 
              <SVG.UserIcon fill={location.pathname === "/Profile" ? "#1E73BE" : "white"}/>
              <button 
                onClick={() => navigate("/Profile")}  
            
              >
                Profile
              </button>
              </div>
             <div  className={` cursor-pointer px-3 py-2 flex items-center gap-3  ${location.pathname === "/TeamManagement" ? "text-[#1E73BE] bg-[#fff] rounded-[5px]  hover:text-blue-700 " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}>
              <SVG.EmployeeList  stroke ={location.pathname === "/TeamManagement" ?   "#1E73BE" : "white"} />
             <button 
                onClick={() => navigate("/TeamManagement")} 
               
              >
                Team Management
              </button>
             </div>
     
            </div>
          )}

          {role === "technician" && (
            <div>
              <button 
                onClick={() => navigate("/Profile")} 
                className={` cursor-pointer px-3 py-2  ${location.pathname === "/Profile" ? "text-[#1E73BE] bg-[#fff] rounded-[5px] hover:text-blue-700  " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}
              >
                Profile
              </button>
              <button 
                onClick={() => navigate("/Status")}  
                className={` cursor-pointer px-3 py-2  ${location.pathname === "/Status" ? "text-[#1E73BE] bg-[#fff] rounded-[5px] hover:text-blue-700 " : "text-[#fff] " }   text-[1.6rem] font-medium transition duration-300 w-full text-left`}
              >
                Status
              </button>
            </div>
          )}

          {role === "customer" && (
            <div>
              <button 
                onClick={() => navigate("/MyOrder")} 
                className={` cursor-pointer  px-3 py-2 ${location.pathname === "/MyOrder" ? "text-[#1E73BE] bg-[#fff]  rounded-[5px] hover:text-blue-700  " : "text-[#fff] " }  text-[1.6rem] font-medium transition duration-300 w-full text-left`}
              >
                My Orders
              </button>
              <button 
              onClick={() => navigate("/OurServices")} 
              className={` cursor-pointer px-3 py-2  ${location.pathname === "/OurServices" ? "text-[#1E73BE] bg-[#fff] rounded-[5px]  hover:text-blue-700 " : "text-[#fff] " }   text-[1.6rem] font-medium transition duration-300 w-full text-left`}
            >
               Services
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
       
      </div>
    </div>
  );
}

export default NavBar;
