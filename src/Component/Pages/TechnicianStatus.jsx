import React, { useEffect, useState } from 'react';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';
import { API_ENDPOINTS } from '../../utils/Service/api.confiq';
import axiosInstance from '../../utils/axiosInstance';
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {onMessageListener} from '../../../src/firebase'
function TechnicianStatus() {
    const [status, setStatus] = useState(false); 
    const [notification,setNotification] =useState()
  const [assignedJobs, setAssignedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh,setRefresh] =useState(false)
  const [costcalculation,setCostCalculation] = useState()
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null
  });
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
        },
        error => {
          setLocation({
            latitude: null,
            longitude: null,
            error: error.message
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by this browser.'
      });
    }
  }, []);

  console.log(location,"location")


  useEffect(() => {
    onMessageListener()
        .then((payload) => {
            console.log("✅ New Notification Payload:", payload);
            if (payload.notification) {
                setNotification(payload.notification);
            } else {
                console.warn("⚠️ Payload does not contain a notification object:", payload);
            }
        })
        .catch((err) => console.error("❌ Error in onMessageListener:", err));
}, []);

 console.log(API_ENDPOINTS.TECHNICIAN.ASSIGNED_JOB,"assigned jobs") 
 axiosInstance
 useEffect(() => {
    const fetchAssignedJobs = async () => {
        setLoading(true);
        try {
            console.log(API_ENDPOINTS.TECHNICIAN.ASSIGNED_JOB, "assigned jobs");

            const response = await axiosInstance.get(API_ENDPOINTS.TECHNICIAN.ASSIGNED_JOB);
            console.log(response,"resres")
            setAssignedJobs(response.data.data.jobs); // Assuming API returns an array
        } catch (err) {
            console.error("Error fetching assigned jobs:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    fetchAssignedJobs();
}, [refresh]);

const clockin = async (id) => {
    try {
        console.log(id, "job id");
        console.log(`${API_ENDPOINTS.TECHNICIAN.CLOCK_IN}${id}/clock-in`,"api api")
        const response = await axiosInstance.put(
            `${API_ENDPOINTS.TECHNICIAN.CLOCK_IN}${id}/clock-in`,
            {
                "technicianLat" : location.latitude,
                "technicianLng" : location.longitude
            }
        );
        console.log("Clock-in successful:", response.data);
        setRefresh(!refresh)
        toast.success("Clock-in Successful!", {
            position: "top-center",
            autoClose: 2000,
        });
    } catch (error) {
        console.error("Clock-in failed:", error.response?.data || error.message);
        toast.error("Clock-in failed!", {
            position: "top-center",
            autoClose: 2000,
        });
    }
};
const clockout = async (id) => {
    try {
        console.log(id, "job id");
        const response = await axiosInstance.put(`${API_ENDPOINTS.TECHNICIAN.CLOCK_IN}${id}/clock-out`);
        console.log("Clock-out successful:", response.data);
        setRefresh(!refresh)
        toast.success("Clock-out Successful!", {
            position: "top-center",
            autoClose: 2000,
        });
    } catch (error) {
        console.error("Clock-out failed:", error.response?.data || error.message);
        toast.error("Clock-out failed!", {
            position: "top-center",
            autoClose: 2000,
        });
    }
};

console.log(costcalculation,"cost")
    return (
        <div className='pt-4 flex min-h-screen bg-[#4DA1A9] justify-center items-center'>
                <ToastContainer />
                {notification && (
        <div
          style={{ padding: 10, backgroundColor: "#f8d7da", borderRadius: 5 }}
        >
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
  <div className="min-w-[400px] mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Assigned Jobs</h2>

    {assignedJobs.length > 0 ? (
        <>
            {/* Completed Jobs */}
            <h3 className="text-xl font-semibold text-green-600">Completed Jobs</h3>
            <ul className="space-y-4">
                {assignedJobs.filter(job => job.status === "completed").map(job => (
                    <li key={job._id} className="flex flex-col justify-between items-center gap-5 p-4 bg-green-100 rounded-lg shadow">
                        <h3>{job.service.name} - {job.subService.name}</h3>
                        <p><strong>Customer:</strong> {job.customer.name} ({job.customer.email})</p>
                        <p><strong>Description:</strong> {job.description}</p>
                        <p><strong>Address:</strong> {job.address.street}, {job.address.city}, {job.address.state}, {job.address.zipCode}</p>
                        <p><strong>Phone:</strong> {job.phoneNumber}</p>
                        <p><strong>Job Date:</strong> {new Date(job.customerAvailability.date).toLocaleDateString("en-GB")}</p>

                        
                        <p><strong>Total Cost:</strong> ${job.totalCost}</p>
                        <p><strong>Overtime Cost:</strong> ${job.overtimeCost}</p>
                        <p><strong>Total Job Minutes:</strong> {(job.totalTime).toFixed(2)} minutes</p>
                        <p><strong>Total Overtime Minutes:</strong> {(job.overtime).toFixed(2)} minutes</p>

                    </li>
                ))}
            </ul>

            {/* Incomplete Jobs */}
            
            <ul className="space-y-4 pt-4">
                {assignedJobs.filter(job => job.status === "assigned" || job.status === "in-progress").map(job => (
                    <li key={job._id} className={`flex flex-col justify-between items-center gap-5 p-4  ${job.status === "assigned" ? "bg-red-100" : "bg-blue-100"}  rounded-lg shadow`}>
                      <h3 className={`text-xl font-semibold  ${job.status === "assigned" ? "text-red-600" : "text-blue-600"}  mt-6`}> {job.status === "assigned" ? "Incomplete Jobs" : "Job in Progress" }</h3>
                        <h3>{job.service.name} - {job.subService.name}</h3>
                        <p><strong>Customer:</strong> {job.customer.name} ({job.customer.email})</p>
                        <p><strong>Description:</strong> {job.description}</p>
                        <p><strong>Address:</strong> {job.address.street}, {job.address.city}, {job.address.state}, {job.address.zipCode}</p>
                        <p><strong>Phone:</strong> {job.phoneNumber}</p>
                        <p><strong>Job Date:</strong> {new Date(job.customerAvailability.date).toLocaleDateString("en-GB")}</p>
                        <p><strong>Job Start Time:</strong> {job.customerAvailability.startTime}</p>
                        <p><strong>Job End Time:</strong> {job.customerAvailability.endTime}</p>
 
                        <div className="flex space-x-2">
                        <button 
    onClick={() => clockin(job._id)} 
    disabled={job.status === "in-progress"} 
    className={`px-4 py-2  bg-green-500 text-white font-semibold rounded-lg transition 
        ${job.status === "in-progress" ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"}
    `}
>
    Clock In
</button>

                            <button onClick={() => clockout(job._id)} className="px-4 py-2 cursor-pointer bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                                Clock Out
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    ) : (
        <p className="text-gray-500">No Job Assigned To You Yet</p>
    )}
</div>

        </div>
    );
}

export default TechnicianStatus;
