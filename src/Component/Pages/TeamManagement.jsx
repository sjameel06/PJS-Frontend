import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_ENDPOINTS } from '../../utils/Service/api.confiq';
import axios from 'axios';

function TeamManagement() {
    const [employees, setEmployees] = useState([]);
    const [teamName, setTeamName] = useState('');
const [description, setDescription] = useState('');
const [selectedEmployees, setSelectedEmployees] = useState([]);


    const handleCheckboxChange = (employeeId) => {
        if (selectedEmployees.includes(employeeId)) {
         
          setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
        } else {
          
          setSelectedEmployees([...selectedEmployees, employeeId]);
        }
      };

      console.log(selectedEmployees,"employess selected")
    useEffect(() => {

        const fetchTechnicians = async () => {
          try {
            const response = await axiosInstance.get(`${API_ENDPOINTS.TECHNICIAN.ACTIVE_LIST}?page=1&limit=10`);
            if (response.data?.data) {
              console.log(response, "resresres")
              setEmployees(response.data.data.data);
            } else {
              console.error("Invalid technician data structure", response.data);
            }
          } catch (error) {
            console.error("Error fetching technicians:", error);
          }
        };
    
    
        fetchTechnicians();
    
      }, []);
      const handleSaveTeam = async () => {
        const teamData = {
          teamName,
          description,
          technicians: selectedEmployees,
        };
      
        console.log(API_ENDPOINTS.TEAM_MANAGEMENT.CREATE_TEAM, "urlurl");
      
        try {
          const response = await axiosInstance.post(API_ENDPOINTS.TEAM_MANAGEMENT.CREATE_TEAM, teamData);
          console.log("Team saved successfully:", response.data);
          // Optionally: reset form or show success message
        } catch (error) {
          console.error("Error saving team:", error);
        }
      };

      console.log(API_ENDPOINTS.TEAM_MANAGEMENT.CREATE_TEAM,"urlurl")
  return (
    <div className=" min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center sm:py-2 2xl:py-10">
    <h1 className="text-[1.8rem] font-medium py-10">Team Management</h1>
   <div className='w-full flex-col items-center justify-center px-15'>
   <div className="  bg-[#ECF3FE]  rounded-lg shadow  mb-2">
    <div className='mx-auto w-[50%] '>
    <h3 className="text-[1.6rem]  py-4 font-normal 
     text-center">Team Info</h3>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        className="w-full mb-4 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300  rounded-lg bg-[#F9F9F9] placeholder-gray-400"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-4 p-3 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg bg-[#F9F9F9] placeholder-gray-400 h-32 resize-none"
      />
    </div>
      
    </div>
   </div>
   
  <div> <h4 className="text-[1.8rem] font-medium  sm:py-4 2xl:py-10">Employee</h4></div>
  <div className="px-15 w-full">
  <div className="w-full mx-auto bg-[#ECF3FE] rounded-lg shadow p-6 mb-8">
    <div className="flex flex-wrap  justify-between">
      {employees.map((employee) => (
        <div
          key={employee._id}
          className="w-[40%] px-2 mb-4 "
        >
          <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm">
            <div className="flex items-center">
              <img
                src={`https://i.pravatar.cc/150?u=${employee._id}`}
                alt={employee.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-gray-800 font-medium">{employee.name}</span>
            </div>

            <button
              onClick={() =>handleCheckboxChange(employee._id)}
              className={`w-[23px] h-[24px] rounded-full flex items-center justify-center text-white ${
                selectedEmployees.includes(employee._id) ? "bg-red-500" : "bg-[#D9E7FF]"
              }`}
            >
              {selectedEmployees.includes(employee._id) ? "−" : "+"}
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

   
  <div>
  <button
      onClick={handleSaveTeam}
      className="bg-[#ECF3FE] text-[#020202] text-[1.8rem] cursor-pointer px-15 py-3 rounded-[5px]"
    >
      Save
    </button>
  </div>
   
  </div>
  )
}

export default TeamManagement
