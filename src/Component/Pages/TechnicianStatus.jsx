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


    const handleStatusChange = async (e) => {
        try {
            const newStatus = e.value;  
            const statusToSend = newStatus ? 'available' : 'inactive';  
        
            await axiosInstance.put(API_ENDPOINTS.TECHNICIAN.STATUS_UPDATE, {
                status: statusToSend
            });

            setStatus(newStatus);  
            alert(`Technician status updated to ${statusToSend}`);
            toast.success("Status Updated Successfully", {
                position: "top-center", 
                autoClose: 2000,    
          })
        } catch (error) {
            console.error('Error updating technician status:', error);
            alert('Failed to update technician status. Please try again.');
            toast.error("Status Update Failed! Please try again.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                theme: "colored",
            });
        }
    };

    return (
        <div>
                <ToastContainer />
                {notification && (
        <div
          style={{ padding: 10, backgroundColor: "#f8d7da", borderRadius: 5 }}
        >
          <h4>{notification.title}</h4>
          <p>{notification.body}</p>
        </div>
      )}
        </div>
    );
}

export default TechnicianStatus;
