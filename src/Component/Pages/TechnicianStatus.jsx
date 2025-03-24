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
}, []);
console.log(assignedJobs,"assigned")
    return (
        <div className='mt-4 flex  justify-center items-center'>
                <ToastContainer />
                {notification && (
        <div
          style={{ padding: 10, backgroundColor: "#f8d7da", borderRadius: 5 }}
        >
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
    <div className=" min-w-[400px] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Assigned Jobs</h2>
            <ul className="space-y-4">
                {assignedJobs.map((job) => (
                    <li key={job._id} className="flex flex-col justify-between items-center gap-5 p-4 bg-gray-100 rounded-lg shadow">
                         <h3>{job.service.name} - {job.subService.name}</h3>
        <p><strong>Customer:</strong> {job.customer.name} ({job.customer.email})</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Address:</strong> {job.address.street}, {job.address.city}, {job.address.state}, {job.address.zipCode}</p>
        <p><strong>Phone:</strong> {job.phoneNumber}</p>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 cursor-pointer bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                                Clock In
                            </button>
                            <button className="px-4 py-2 cursor-pointer bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition">
                                Clock Out
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
}

export default TechnicianStatus;
