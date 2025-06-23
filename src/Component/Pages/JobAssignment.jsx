import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import { toast, ToastContainer } from "react-toastify"
import 'tailwind-scrollbar-hide/v4';
import 'react-toastify/dist/ReactToastify.css'
const JobAssignment = () => {
  const shifts = ["9AM-12PM", "12PM-3PM", "3PM-6PM", "6PM-9PM", "9PM-12AM"];
  // const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState("month");
  const [employeeEvents, setEmployeeEvents] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [jobs, setJobs] = useState([]);
  const [rejobs, setReJobs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const [teams, setTeams] = useState([]);
const [expandedTeamId, setExpandedTeamId] = useState(null);
const [selectedEmployee, setSelectedEmployee] = useState(() => {
  const storedEmp = localStorage.getItem("selectedemployee");
  return storedEmp ? JSON.parse(storedEmp) : null;
});

const [selectedTeam, setSelectedTeam] = useState(() => {
  const storedTeam = localStorage.getItem("selectedteam");
  return storedTeam ? JSON.parse(storedTeam) : null;
});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.JOB.JOB_LIST}?page=1&limit=10`);
        if (response.data?.data?.data) {
          setJobs(response.data.data.data);
        } else {
          console.error("Invalid job data structure", response.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
    
  }, [refresh]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.JOB.REJOB_LIST}`);
        console.log("Re Jobs Response:", response.data);

        if (response.data?.data?.data) {
          setReJobs(response.data.data.data);
        } else {
          console.error("Invalid job data structure", response.data);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, [refresh]);

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

    const fetchTeam = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.TEAM_MANAGEMENT.TEAM_LIST);
        console.log(response.data.data.teams,"reeeeeeeeeeeeeee")
        if (response.data?.data?.teams) {
          setTeams(response.data.data.teams); // nested safely
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeam();
    fetchTechnicians();
  
  }, [refresh]);
  useEffect(() => {
    return () => {
      localStorage.removeItem("selectedemployee");
    }},[]
    
  )
  console.log(teams,"teeeeeeeeeeeeeeee")

  const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  console.log(start,end,"startend")

  const generateDays = () => {
    const days = [];
    if (view === "month") {
      const start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }
    } else if (view === "week") {
      const start = new Date(currentDate);
      start.setDate(start.getDate() - start.getDay());
      for (let i = 0; i < 7; i++) {
        days.push(new Date(start.getFullYear(), start.getMonth(), start.getDate() + i));
      }
    } else {
      for (let i = 0; i < 12; i++) {
        days.push(new Date(currentDate.getFullYear(), i, 1));
      }
    }
    return days;
  };
  console.log(selectedEmployee, "selected emp")
  useEffect(() => {
    let target = null;
  
    if (selectedEmployee && selectedEmployee.assignedJobs) {
      target = {
        id: selectedEmployee._id,
        name: selectedEmployee.name,
        assignedJobs: selectedEmployee.assignedJobs
      };
    } else if (selectedTeam && selectedTeam.assignedJobs) {
      target = {
        id: selectedTeam._id,
        name: selectedTeam.name,
        assignedJobs: selectedTeam.assignedJobs
      };
    }
  
    if (!target) return;
  
    const newEvents = target.assignedJobs.flatMap((job) => {
      let availabilityArray = [];
  
      if (Array.isArray(job.customerAvailability)) {
        availabilityArray = job.customerAvailability;
      } else if (job.customerAvailability && typeof job.customerAvailability === "object") {
        availabilityArray = [job.customerAvailability];
      }
  
      return availabilityArray.map((availability) => {
        const startHour = parseInt(availability.startTime?.split(":")[0], 10);
  
        let shift = null;
        if (startHour >= 9 && startHour < 12) shift = "9AM-12PM";
        else if (startHour >= 12 && startHour < 15) shift = "12PM-3PM";
        else if (startHour >= 15 && startHour < 18) shift = "3PM-6PM";
        else if (startHour >= 18 && startHour < 21) shift = "6PM-9PM";
        else if (startHour >= 21 || startHour < 9) shift = "9PM-12AM";
  
        return shift
          ? {
              id: job._id,
              title: job.service?.name || "Unnamed Job",
              date: availability.date ? new Date(availability.date).toDateString() : "Invalid Date",
              shift,
            }
          : null;
      });
    }).filter(Boolean);
  
    setEmployeeEvents({ [target.id]: newEvents });
  }, [selectedEmployee, selectedTeam]);
  
  






  const handleDrop = async (event, date, shift) => {
    const jobId = event.dataTransfer.getData("jobId");
    const job = jobs.find((j) => j._id === jobId) || rejobs.find((j) => j._id === jobId);
  
    // Determine target (either employee or team)
    const target = selectedEmployee?.assignedJobs
      ? { type: 'employee', id: selectedEmployee._id }
      : selectedTeam?.assignedJobs
      ? { type: 'team', id: selectedTeam._id }
      : null;
  
    if (!job || !target) return;
  
    const updatedEvents = { ...employeeEvents };
  
    if (!updatedEvents[target.id]) {
      updatedEvents[target.id] = [];
    }
  
    updatedEvents[target.id].push({
      id: Date.now(),
      title: job.service?.name || "Unnamed Job",
      date: date.toDateString(),
      shift,
    });
  
    // Choose correct endpoint
    const endpoint =
      target.type === "employee"
        ? `${API_ENDPOINTS.JOB.JOB_ASSINGED}/${target.id}/${jobId}`
        : `${API_ENDPOINTS.TEAM_MANAGEMENT.JOB_ASSINGED}${target.id}/${jobId}`;
  
    console.log("Assigning Job API URL:", endpoint);
  
    try {
      const response = await axiosInstance.put(endpoint);
      console.log("Job assigned successfully:", response.data);
      setEmployeeEvents(updatedEvents);
      setRefresh(!refresh);
      toast.success("Job Assigned Successfully", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error assigning job:", error.response?.data || error.message);
      toast.error("Job Not Assigned", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };
  

  console.log(jobs, "jobs")

  const generateYearView = () => {
    return Array.from({ length: 12 }, (_, i) => {
      const firstDay = new Date(currentDate.getFullYear(), i, 1);
      const lastDay = new Date(currentDate.getFullYear(), i + 1, 0);
      const days = [];
      for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
        days.push(new Date(d));
      }
      return { month: firstDay.toLocaleString("default", { month: "long" }), days };
    });
  };


  console.log("selectedteam", selectedTeam);
  return (
    <div className=" flex h-screen ml-20 p-4 gap-4">
      <ToastContainer />

      <div className="w-3/4 h-screen overflow-y-auto scrollbar-hide mx-auto p-4 rounded-[13px] shadow-md bg-[#FFFFFF]">
      {selectedEmployee ? (
  <>
    {/* EMPLOYEE VIEW */}
    <h2 className="text-center mb-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img
            src={`https://i.pravatar.cc/150?u=${selectedEmployee._id}`}
            className="w-[35px] h-[36px] rounded-full mr-3"
          />
          <div className="text-center text-[1.4rem] font-normal capitalize">
            {selectedEmployee.name}
          </div>
        </div>

        <div className="rounded-md px-2 py-1 text-[#6B7A99] shadow-sm flex gap-2 items-center">
          <button
            className="p-2 rounded bg-[#FFF]"
            onClick={() => {
              if (view === "week") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
              } else if (view === "month") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
              }
            }}
          >
            {"<"}
          </button>

          <h2 className="text-center mt-1">
            {view === "year"
              ? currentDate.getFullYear()
              : view === "week"
              ? `Week of ${currentDate.toLocaleDateString()}`
              : currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>

          <button
            className="p-2 rounded bg-[#FFF]"
            onClick={() => {
              if (view === "week") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
              } else if (view === "month") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
              }
            }}
          >
            {">"}
          </button>
        </div>

        <div className="flex justify-center">
          <button className={`py-2 px-3 rounded-l-[12px] ${view === "week" ? "bg-[#5A8DFF] text-[#fff]" : "bg-[#FAFBFD]"}`} onClick={() => setView("week")}>Week</button>
          <button className={`py-2 px-3 rounded-r-[12px] ${view === "month" ? "bg-[#5A8DFF] text-[#fff]" : "bg-[#FAFBFD]"}`} onClick={() => setView("month")}>Month</button>
        </div>
      </div>
    </h2>

    {/* EMPLOYEE SCHEDULE */}
    <div className={`grid ${view === "year" ? "grid-cols-4" : "grid-cols-8"} scrollbar-hide mx-auto px-6 gap-4 py-4 rounded bg-[#fff]`}>
      {generateDays().map((day, index) => (
        <div key={index} className="py-2 mx-auto px-4 rounded-[10px] bg-[#F0F9FF] w-[142px] ">
          <div className="flex items-center justify-center text-[1.2rem] gap-1">
            <div className="text-center text-[1.2rem] font-normal text-[#393939]">{day.getDate()}</div>
            <div> - </div>
            <div className="text-center text-[1.2rem] font-normal text-[#393939]">
              {day.toLocaleString("default", { weekday: "short" })}
            </div>
          </div>

          {shifts.map((shift) => (
            <div key={shift} className="my-2 py-2 px-5 bg-[#FFFFFF] text-[#565656] rounded-[5px] text-center text-sm font-normal hover:bg-gray-300 cursor-pointer" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, day, shift)}>
              {shift}

              {(employeeEvents[selectedEmployee._id] || [])
                .filter((ev) => ev.date === day.toDateString() && ev.shift === shift)
                .map((ev) => (
                  <div key={ev.id} className="mt-1 p-1 bg-blue-400 text-white rounded shadow text-xs font-semibold">
                    {ev.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  </>
) : selectedTeam ? (
  <>
    {/* TEAM VIEW */}
    <h2 className="text-center mb-2">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="text-center text-[1.4rem] font-normal capitalize">
            {selectedTeam.teamName}
          </div>
        </div>

        <div className="rounded-md px-2 py-1 text-[#6B7A99] shadow-sm flex gap-2 items-center">
          <button
            className="p-2 rounded bg-[#FFF]"
            onClick={() => {
              if (view === "week") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
              } else if (view === "month") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
              }
            }}
          >
            {"<"}
          </button>

          <h2 className="text-center mt-1">
            {view === "year"
              ? currentDate.getFullYear()
              : view === "week"
              ? `Week of ${currentDate.toLocaleDateString()}`
              : currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </h2>

          <button
            className="p-2 rounded bg-[#FFF]"
            onClick={() => {
              if (view === "week") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
              } else if (view === "month") {
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
              }
            }}
          >
            {">"}
          </button>
        </div>

        <div className="flex justify-center">
          <button className={`py-2 px-3 rounded-l-[12px] ${view === "week" ? "bg-[#5A8DFF] text-[#fff]" : "bg-[#FAFBFD]"}`} onClick={() => setView("week")}>Week</button>
          <button className={`py-2 px-3 rounded-r-[12px] ${view === "month" ? "bg-[#5A8DFF] text-[#fff]" : "bg-[#FAFBFD]"}`} onClick={() => setView("month")}>Month</button>
        </div>
      </div>
    </h2>

    {/* TEAM SCHEDULE */}
    <div className={`grid ${view === "year" ? "grid-cols-4" : "grid-cols-8"} scrollbar-hide mx-auto px-6 gap-4 py-4 rounded bg-[#fff]`}>
      {generateDays().map((day, index) => (
        <div key={index} className="py-2 mx-auto px-4 rounded-[10px] bg-[#F0F9FF] w-[142px]">
          <div className="flex items-center justify-center text-[1.2rem] gap-1">
            <div className="text-center text-[1.2rem] font-normal text-[#393939]">{day.getDate()}</div>
            <div> - </div>
            <div className="text-center text-[1.2rem] font-normal text-[#393939]">
              {day.toLocaleString("default", { weekday: "short" })}
            </div>
          </div>

          {shifts.map((shift) => (
            <div
              key={shift}
              className="my-2 py-2 px-5 bg-[#FFFFFF] text-[#565656] rounded-[5px] text-center text-sm font-normal hover:bg-gray-300 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, day, shift)}
            >
              {shift}
              {(employeeEvents[selectedTeam._id] || [])
                .filter((ev) => ev.date === day.toDateString() && ev.shift === shift)
                .map((ev) => (
                  <div key={ev.id} className="mt-1 p-1 bg-blue-400 text-white rounded shadow text-xs font-semibold">
                    {ev.title}
                  </div>
                ))}
              {/* {selectedTeam.members?.flatMap((member) => {
                const events = employeeEvents[member._id] || [];
                return events
                  .filter((ev) => ev.date === day.toDateString() && ev.shift === shift)
                  .map((ev) => ({
                    ...ev,
                    technicianName: member.name,
                  }));
              }).map((ev, idx) => (
                <div
                  key={`${ev.id}-${idx}`}
                  className="mt-1 p-1 bg-green-500 text-white rounded shadow text-xs font-semibold"
                >
                  {ev.title} - <span className="text-[10px] font-light">({ev.technicianName})</span>
                </div>
              ))} */}
            </div>
          ))}
        </div>
      ))}
    </div>
  </>
) : (
  <h2 className="text-center">Select an Employee or Team to View Schedule</h2>
)}


      </div>

      <div className="w-1/3  mx-auto h-screen overflow-y-auto scrollbar-hide p-4 shadow-md rounded-[12px] bg-[#FFFFFF]">

        <h3 className="font-bold text-[#676767] text-[1.4rem] mb-2">Recurring Jobs</h3>
        {rejobs && rejobs.length > 0 ? (
          rejobs.map((job) => (
            <div key={job._id} draggable onDragStart={(e) => e.dataTransfer.setData("jobId", job._id)} className="bg-[#F0F9FF] my-4 p-4 rounded-lg shadow-sm">

              <h3 className="text-lg font-semibold">
                {job.service?.name || "No Service Name"}
              </h3>
              <p className="text-sm text-gray-700">
                {job.subService?.name || "No Sub-Service Name"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong> {job.description || "No Description"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> {job.status || "No Status"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Phone:</strong> {job.phoneNumber || "No Phone Number"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {job.address?.street} {job.address?.state} {job.address?.city} {job.address?.zipCode || "No Address"}
              </p>
              {console.log(job.customerAvailability, "customer")}
              {job.customerAvailability ? (
                <>
                  <p className="text-sm text-gray-700">
                    <strong>Customer Availability Date:</strong>
                    {job.customerAvailability.date
                      ? new Date(job.customerAvailability.date).toLocaleDateString("en-CA")
                      : "No Date Given"}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Customer Availability Start Time:</strong>
                    {job.customerAvailability.startTime || "No Start Time Given"}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Customer Availability End Time:</strong>
                    {job.customerAvailability.endTime || "No End Time Given"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-700">No Customer Availability Information</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No Jobs Requested</p>
        )}

        <h3 className="text-[#676767] text-[1.4rem] font-bold mb-2">Jobs</h3>
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job._id} draggable onDragStart={(e) => e.dataTransfer.setData("jobId", job._id)} className="bg-[#F0F9FF] my-4 p-4 rounded-lg shadow-sm">

              <h3 className="text-lg font-semibold">
                {job.service?.name || "No Service Name"}
              </h3>
              <p className="text-sm text-gray-700">
                {job.subService?.name || "No Sub-Service Name"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Description:</strong> {job.description || "No Description"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Status:</strong> {job.status || "No Status"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Phone:</strong> {job.phoneNumber || "No Phone Number"}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {job.address?.street} {job.address?.state} {job.address?.city} {job.address?.zipCode || "No Address"}
              </p>

              {/* Check if customerAvailability exists and is not empty */}
              {job.customerAvailability ? (
                <>
                  <p className="text-sm text-gray-700">
                    <strong>Customer Availability Date:</strong>
                    {job.customerAvailability.date
                      ? new Date(job.customerAvailability.date).toLocaleDateString("en-CA")
                      : "No Date Given"}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Customer Availability Start Time:</strong>
                    {job.customerAvailability.startTime || "No Start Time Given"}
                  </p>

                  <p className="text-sm text-gray-700">
                    <strong>Customer Availability End Time:</strong>
                    {job.customerAvailability.endTime || "No End Time Given"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-700">No Customer Availability Information</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No Jobs Requested</p>
        )}

      </div>
    </div>
  );
};

export default JobAssignment;
