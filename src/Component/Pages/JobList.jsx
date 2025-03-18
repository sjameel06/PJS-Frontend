import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import axiosInstance from "../../utils/axiosInstance";


function JobList() {
  const [jobs, setJobs] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.JOB.JOB_LIST}?page=1&limit=10`);
        console.log("Jobs Response:", response.data);

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
  }, []);
  useEffect(() => {

    const fetchTechnicians = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.TECHNICIAN.ACTIVE_LIST}?page=1&limit=10`); 
        if (response.data?.data) {
          console.log(response,"resresres")
          setTechnicians(response.data.data.data);
        } else {
          console.error("Invalid technician data structure", response.data);
        }
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };


    fetchTechnicians();

  }, []);
  console.log(technicians,"techs")
  return (
    <div className="bg-[#4DA1A9] py-10 min-h-screen text-white px-6">
      <h1 className="text-2xl font-bold mb-4">Job List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Jobs</h2>
          {jobs.length === 0 ? (
            <p>Loading jobs...</p>
          ) : (
            <ul className="space-y-4">
             {jobs.map((job) => (
  <li key={job._id} className="bg-[#f7f7f7] p-4 rounded-lg shadow-sm">
    {console.log(job.customerAvailability[0]?.endTime, job.customerAvailability[0]?.startTime, job.customerAvailability[0]?.date, "jobs")}

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
      <strong>Address:</strong> {`${job.address.street} ${job.address.state} ${job.address.city} ${job.address.zipCode}` || "No Address"}
    </p>

    {/* Check if customerAvailability exists and is not empty */}
    {job.customerAvailability && job.customerAvailability.length > 0 ? (
      <>
        <p className="text-sm text-gray-700">
          <strong>Customer Availability Date:</strong> 
          {job.customerAvailability[0]?.date 
            ? new Date(job.customerAvailability[0].date).toLocaleDateString("en-CA") 
            : "No Date Given"}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Customer Availability Start Time:</strong> 
          {job.customerAvailability[0]?.startTime || "No Start Time Given"}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Customer Availability End Time:</strong> 
          {job.customerAvailability[0]?.endTime || "No End Time Given"}
        </p>
      </>
    ) : (
      <p className="text-sm text-gray-700">No Customer Availability Information</p>
    )}
  </li>
))}

            </ul>
          )}
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Active Technicians</h2>
          {technicians.length === 0 ? (
            <p>Loading active technicians...</p>
          ) : (
            <ul className="space-y-4">
              {technicians?.map((tech) => (
                <li key={tech.id} className="bg-[#f7f7f7] p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold">
                    {tech.name || "No Technician Name"}
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Status:</strong> {tech.status || "No Status"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Phone:</strong> {tech.phoneNumber || "No Phone Number"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobList;
