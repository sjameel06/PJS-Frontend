import { jwtDecode } from 'jwt-decode';
import { Dialog } from 'primereact/dialog';
import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../utils/Service/api.confiq';
import axiosInstance from '../../utils/axiosInstance';
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { Dropdown } from "primereact/dropdown"; 
import "primereact/resources/themes/lara-light-indigo/theme.css";
function ConfirmBooking() {
  const storedService = localStorage.getItem("selectedService");
  const services = storedService ? JSON.parse(storedService) : {};
  const [refresh,setRefresh] =useState(false)
  console.log("Selected Service:", services);
  const id = services._id
  const [service, setService] = useState([{}]);
  const [selectedSubService, setSelectedSubService] = useState(null);
  console.log(`${API_ENDPOINTS.SERVICES.GET_SERVICES}/${id},"url"`)
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

  const role = decoded.role || "";

  const [selectedService, setSelectedService] = useState({
    title: "",
    description: "",
    subServices: []
  });

  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [editingSubService, setEditingSubService] = useState(null);
  {/* {
    // "title": "Plumbing Service",
    "description": "Leak repairs and pipe fitting",
    "requirement": "full-service",
    "service": "67cf2991fa37f3a2e3f3c76a",
    "subService": "67cf2991fa37f3a2e3f3c76c",
    "address": {
        "street": "789 Pine Street",
        "city": "San Francisco",
        "state": "CA",
        "zipCode": "94103"
    },
    "phoneNumber": "+1987654321"
} */}
const [formData, setFormData] = useState({
  description: "",
  requirement: "",
  service: id,
  subService: "",
  phoneNumber: "",
  address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
  },
  isRecurring: false,  // Backend format ke mutabiq isRecurrence ko isRecurring kar diya
  customerAvailability: {
      date: "",
      startTime: "",
      endTime: ""
  },
  recurrence: {
      frequency: ""  // Ye tab fill hoga jab isRecurring true hoga
  }
});

  // "service": "67cf2991fa37f3a2e3f3c76a",
  // "subService": "67cf2991fa37f3a2e3f3c76c",
  const serviceOptions = [
    { label: "Full Service", value: "full-service" },
    { label: "Consultation Only", value: "consultation-only" },
  ];
  const handleChange = (e) => {
    const { name, value } = e.target || e;

    if (["street", "city", "state", "zipCode"].includes(name)) {
        setFormData(prev => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    } 
    else if (name === "frequency") { 
      setFormData(prev => ({
          ...prev,
          recurrence: { ...prev.recurrence, frequency: value },
      }));
  }
    else if (["date", "startTime", "endTime"].includes(name)) {
        setFormData(prev => ({
            ...prev,
            customerAvailability: {
                ...prev.customerAvailability,
                [name]: value,
            },
        }));
    }

    else {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    }
};


  

  const openEditPopup = (subService) => {
    console.log(subService._id,"hahahahah")
    setEditingSubService(subService);
    setEditPopupOpen(true);
  };

  const openDeletePopup = (subService) => {
    setEditingSubService(subService);
    setDeletePopupOpen(true);
  };
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`${API_ENDPOINTS.SERVICES.GET_SERVICES}/${id}`);
            console.log('Response Data:', response.data.data.data);
            setService(response.data.data.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, [refresh]);
console.log(service,"from api")
  console.log(editingSubService,"editingdata")
  const handleSaveEdit = async (service) => {
    try {
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.SERVICES.UPDATE_SUBSERVICE}/${service._id}/subservices/${editingSubService._id}`,
        editingSubService
      );
  
      console.log("Updated Successfully:", response.data);
      setRefresh(!refresh)
      toast.success("Sub Service Updated Successfully", {
        position: "top-center", 
        autoClose: 2000,    
  })
    } catch (error) {
      console.error("Error updating subservice:", error);
    } finally {
      setEditPopupOpen(false);
    }
  };
  

  const handleDelete = async (service) => {
    try {
        const response = await axiosInstance.delete(
            `${API_ENDPOINTS.SERVICES.UPDATE_SUBSERVICE}${service._id}/subservices/${editingSubService._id}`
        );

        console.log("Deleted Successfully:", response.data);
        setRefresh(!refresh); 
        toast.success("Sub Service Deleted Successfully", {
            position: "top-center",
            autoClose: 2000,
        });
    } catch (error) {
        console.error("Error deleting subservice:", error);
        toast.error("Failed to delete subservice");
    } finally {
        setDeletePopupOpen(false);
    }
};


const handleSelectService = (subService) => {
  console.log(subService._id,"checking error")
  console.log(selectedSubService,"ahahaha")
  setFormData((prev) => ({
    ...prev,
    subService: prev.subService?._id === subService._id ? null : subService._id,
  }));

  console.log(selectedService ,"checking error 2") 
  setSelectedSubService(selectedSubService === subService._id ? null :subService._id )
};

console.log(selectedSubService,"selectedsubservice")
  useEffect(() => {
    console.log("Updated selectedService:", selectedService);
  }, [selectedService]);
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formData");

    try {
        let apiUrl = formData.isRecurring 
            ? API_ENDPOINTS.JOB.JOB_RECURRANCE 
            : API_ENDPOINTS.JOB.JOB_CREATE;

        const response = await axiosInstance.post(apiUrl, formData);

        console.log("Booking Confirmed:", response.data);
        toast.success("Booking Confirmed Successfully!", { position: "top-center", autoClose: 2000 });

    } catch (error) {
        console.error("Error booking service:", error);
        toast.error("Booking Failed. Please try again.", { position: "top-center", autoClose: 2000 });
    }
};


  return (
    // <></>
    <div className='bg-[#4DA1A9] tracking-widest min-h-screen py-10'>
       <ToastContainer />
      <div className='flex items-center justify-center mb-8'>
        <div className='text-[3rem] font-semibold text-[#FFFDEC]'>{services.name || "No Service Selected"}</div>
      </div>
      <div className={`${role === "admin" ? "md:px-[20rem]" : ""} grid grid-cols-3 gap-4 w-full px-10 gap-6`}>
        <div className={`${role === "admin" ? "flex flex-col md:col-span-3" : "col-span-3 md:col-span-2"} text-center bg-white p-4 rounded-lg`}>
        {service?.subServices?.length > 0 ? (
  service.subServices.map((subService, index) => (
    <div key={index} className="flex justify-between mb-4 border-b pb-2">
      <div>
        <div className="text-[2rem] font-medium text-gray-800">{subService.name}</div>
        <p className="text-[1.6rem] text-gray-700">{subService.description}</p>
        <p className="text-[1.4rem] text-gray-600">Estimated Time: {subService.estimatedTime}</p>
        <p className="text-[1.4rem] text-gray-600">Service Price: ${subService.servicePrice}</p>
        <p className="text-[1.4rem] text-gray-600">Consultation Price: ${subService.concentrationPrice}</p>
      </div>
      {role === "admin" && (
        <div className="space-x-2 flex">
          <button
            className="bg-blue-500 cursor-pointer h-[20px] text-white px-3 py-1 rounded"
            onClick={() => openEditPopup(subService)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 cursor-pointer h-[20px] text-white px-3 py-1 rounded"
            onClick={() => openDeletePopup(subService)}
          >
            Delete
          </button>
        </div>
      )}
      {console.log(selectedSubService?._id)}
      {role === "customer" && (
        <div className="space-x-2 flex">
          {console.log(selectedSubService, subService._id,"checking")}
          <button
            className={`cursor-pointer h-[20px] text-white px-3 py-1 rounded 
              ${selectedSubService === subService._id ? "bg-green-500" : "bg-blue-500"}`}
            onClick={() => handleSelectService(subService)}
            
          >
            {selectedSubService === subService._id ? "Unselect" : "Select"}
          </button>
        </div>
      )}
    </div>
  ))
) : (
  <p className="text-[1.6rem] text-gray-700">No sub services listed</p>
)}


        </div>
        {role !== "admin" && role !== "technician" && role !== "dispatcher" && (
  <div className="col-span-3 md:col-span-1 bg-white p-6 shadow-lg rounded-lg mx-10 mt-6">
    <h2 className="text-[2rem] font-semibold mb-4">Confirm Booking</h2>
    <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 text-[1.4rem]">

      <div>Contact Number</div>
      <input 
        type="text" 
        name="phoneNumber" 
        value={formData.phoneNumber} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full" 
        placeholder="Your Phone Number" 
      />

      <div>Street</div>
      <input 
        type="text" 
        name="street" 
        value={formData.address.street} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full" 
        placeholder="Street Address" 
      />

      <div>City</div>
      <input 
        type="text" 
        name="city" 
        value={formData.address.city} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full" 
        placeholder="City" 
      />

      <div>State</div>
      <input 
        type="text" 
        name="state" 
        value={formData.address.state} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full" 
        placeholder="State" 
      />

      <div>Zip Code</div>
      <input 
        type="text" 
        name="zipCode" 
        value={formData.address.zipCode} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full" 
        placeholder="Zip Code" 
      />

      <div>Service Type</div>
      <Dropdown
        value={formData.requirement}
        options={serviceOptions}
        onChange={(e) => handleChange({ name: "requirement", value: e.value })}
        placeholder="Select Service Type"
        className="w-full border border-gray-300 rounded-lg"
      />

      <div>Description</div>
      <textarea 
        name="description" 
        value={formData.description} 
        onChange={handleChange} 
        className="border border-gray-300 rounded-lg p-3 w-full" 
        placeholder="Describe Your Issue (Optional)"
      ></textarea>

      <div>Availability Date</div>
      <input 
        type="date" 
        name="date" 
        value={formData.customerAvailability.date} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full"
      />

      <div>Start Time</div>
      <input 
        type="time" 
        name="startTime" 
        value={formData.customerAvailability.startTime} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full"
      />

      <div>End Time</div>
      <input 
        type="time" 
        name="endTime" 
        value={formData.customerAvailability.endTime} 
        onChange={handleChange} 
        required 
        className="border border-gray-300 rounded-lg p-3 w-full"
      />

      {/* Recurrence Checkbox */}
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          name="isRecurring" 
          checked={formData.isRecurring} 
          onChange={(e) => handleChange({ name: "isRecurring", value: e.target.checked })} 
        />
        <label>Make this a recurring booking?</label>
      </div>

      {/* Recurrence Frequency Dropdown */}
      {formData.isRecurring && (
        <div>
          <label>Recurrence Frequency</label>
          <Dropdown
            value={formData.recurrence.frequency}
            options={[
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" }
            ]}
            onChange={(e) => handleChange({ name: "frequency", value: e.value })}
            placeholder="Select Frequency"
            className="w-full border border-gray-300 rounded-lg"
          />
        </div>
      )}

      <button 
        type="submit" 
        className="bg-blue-500 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
      >
        Book Now
      </button>
    </form>
  </div>
)}


      </div>

      {/* Edit Dialog */}
      <Dialog visible={editPopupOpen} onHide={() => setEditPopupOpen(false)} header="Edit Sub-Service" modal   maskClassName="bg-black bg-opacity-30 backdrop-blur-xs"
  className="bg-[#fff] text-[2rem] p-4">
        <div>SubService Name</div>
        <input type="text" value={editingSubService?.name || ""} onChange={(e) => setEditingSubService({...editingSubService, name: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="SubService Name" />
        <div>SubService Description</div>
        <textarea value={editingSubService?.description || ""} onChange={(e) => setEditingSubService({...editingSubService, description: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="SubService Description"></textarea>
        <div>Estimated Time</div>
        <input type="text" value={editingSubService?.estimatedTime || ""} onChange={(e) => setEditingSubService({...editingSubService, estimatedTime: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Estimated Time" />
        <div>Service Price</div>
        <input type="number" value={editingSubService?.servicePrice || ""} onChange={(e) => setEditingSubService({...editingSubService, servicePrice: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Service Price" />
        <div>Consultation Price</div>
        <input type="number" value={editingSubService?.concentrationPrice || ""} onChange={(e) => setEditingSubService({...editingSubService, concentrationPrice: e.target.value })} className="w-full p-2 border rounded mb-4" placeholder="Concentration Price" />

        <div className="flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditPopupOpen(false)}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> handleSaveEdit(service)}>Save</button>
        </div>
      </Dialog>

      {/* Delete Confirmation Popup */}
      <Dialog visible={deletePopupOpen} onHide={() => setDeletePopupOpen(false)} header="Confirm Deletion" modal   maskClassName="bg-black bg-opacity-30 backdrop-blur-xs"
  className="bg-[#fff] text-[2rem] p-4">
        <p>Are you sure you want to delete "{editingSubService?.name}"?</p>
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDeletePopupOpen(false)}>Cancel</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(service)}>Delete</button>
        </div>
      </Dialog>
    </div>
  );
}

export default ConfirmBooking;
