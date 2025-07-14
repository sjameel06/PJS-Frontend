import React, { useEffect, useState } from 'react'
import { API_ENDPOINTS } from '../../utils/Service/api.confiq'
import axiosInstance from '../../utils/axiosInstance';

function CustomerOrder() {

const [requestedJobs, setRequestedJobs] = useState([]); // State for storing jobs

    useEffect(() => {
        const fetchRequestedJobs = async () => {
            try {
                const response = await axiosInstance.get(API_ENDPOINTS.CUSTOMER.CUSTOMER_REQUESTED_JOB);
                setRequestedJobs(response.data.data); // Assuming response.data is an array of 
                console.log(response.data.data,"resresres")
            } catch (error) {
                console.error("Error fetching requested jobs:", error);
            }
        };

        fetchRequestedJobs();
    }, []);
    const pendingJobs = requestedJobs.filter(job => job.status === "pending");
    const completedJobs = requestedJobs.filter(job => job.status === "completed");
    const assignedJobs = requestedJobs.filter(job => job.status === "assigned");

    return (
        <div className='mx-20'>
   <div className=" min-w-[400px] mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Requested Jobs</h2>

            {[
                { title: "Pending Jobs", jobs: pendingJobs, color: "text-yellow-600" },
                { title: "Completed Jobs", jobs: completedJobs, color: "text-green-600" },
                { title: "Assigned Jobs", jobs: assignedJobs, color: "text-blue-600" },
            ].map(({ title, jobs, color }) => (
                <div key={title} className="mt-4">
                    <h3 className={`text-xl font-semibold ${color}`}>{title}</h3>
                    {jobs.length > 0 ? (
                        <ul className="space-y-4">
                            {jobs.map(job => (
                                <li key={job._id} className="flex flex-col justify-between p-4 bg-gray-100 rounded-lg shadow-md">
                                    <p><strong>Description:</strong> {job.description}</p>
                                    <p><strong>Status:</strong> {job.status}</p>
                                    <p><strong>Phone:</strong> {job.phoneNumber}</p>
                                    <p><strong>Address:</strong> {job.address.street}, {job.address.city}, {job.address.state}, {job.address.zipCode}</p>
                                    <p><strong>Job Date:</strong> {new Date(job.customerAvailability.date).toLocaleDateString("en-GB")}</p>
                                    <p><strong>Time:</strong> {job.customerAvailability.startTime} - {job.customerAvailability.endTime}</p>
                                    {job.technicians.length > 0 && (
                                        <p><strong>Technicians:</strong> {job.technicians.map(t => t.name).join(", ")}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No {title}</p>
                    )}
                </div>
            ))}
        </div>
        </div>
     
    );
}

export default CustomerOrder
