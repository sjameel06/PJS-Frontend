import React, { useEffect, useState } from "react";
import HVACImg from "../../assets/HVAC.png";
import PlumbingImg from "../../assets/Plumbing.png";
import ElectricalImg from "../../assets/Electrical.png";
import ApplianceImg from "../../assets/Repair.png";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { jwtDecode } from "jwt-decode";
import { Dialog } from "primereact/dialog";
import {toast,ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";


function OurServices() {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate()
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [refresh,setRefresh] =useState(false)
  const [selectedService, setSelectedService] = useState({
    name: "",
    description: "",
    subServices: [] // Ensure it's always an array
});

  const [createPopupOpen,setCreatePopupOpen] =useState(false)
  const [createService, setCreateService] = useState({
    title: "",
    description: "",
    subServices: [] 
});

const openEditPopup = (service) => {
  console.log(service.subService,"checkech")
  setSelectedService({
      ...service,
      subServices: service.subServices || [] 
  });
  setEditPopupOpen(true);
};


const openDeletePopup = (service) => {
  setSelectedService(service); 
  setDeletePopupOpen(true); 
 
};

console.log(selectedService,"sessese")
  const handleSaveEdit =  async (e) => {
    // API call or state update logic for saving the edited service
    e.preventDefault();
   

    try {
      const payload = {
          name: selectedService.name,
          description: selectedService.description,
          subServices: selectedService.subServices || [], // Ensure subServices is included
      };
      console.log(payload,"payyyyy")
      const response = await axiosInstance.put(`${API_ENDPOINTS.SERVICES.GET_SERVICES}/${selectedService._id}`, payload);

      console.log(response, "putres");
      // console.log(payload,"payyyyyyyyyyyyyyyyyyy")
          setRefresh(!refresh)
        setSelectedService();
        setEditPopupOpen(false)
        toast.success("Service Updated Successfully!", {
          position: "top-center", 
          autoClose: 2000,    
    })
    } catch (err) {
        console.log("error")
    } 
  };

 

  const handleDelete = async () => {
    console.log(selectedService,"service")
    try {
      const response = await axiosInstance.delete(`${API_ENDPOINTS.SERVICES.GET_SERVICES}/${selectedService._id
      }`);
      console.log("Service deleted:", response.data);
      setRefresh(!refresh)
      
      toast.success("Delete Done!", {
        position: "top-center", 
        autoClose: 2000,    
  })
  } catch (error) {
      console.error("Error deleting service:", error);
  }
    console.log("Deleting: ", selectedService);
    setDeletePopupOpen(false);
  };
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

const role = decoded.role
console.log(API_ENDPOINTS.SERVICES.GET_SERVICES,"rolerole")
useEffect(() => {
  const fetchServices = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.SERVICES.GET_SERVICES}/?&subService=true`);

          console.log(response,"resres")
          setServices(response.data.data.data); 
          setLoading(false);
      } catch (err) {
          setError(err.message);
          setLoading(false);
      }
  };

  fetchServices();
}, [refresh]);
console.log(services,"serve")
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error}</p>;


  
  const handleBooking = (service) => {
    console.log(service,"selected service")
      localStorage.setItem("selectedService", JSON.stringify(service));
     navigate("/ServicesDetail")
  }

  console.log(API_ENDPOINTS.SERVICES.GET_SERVICES)

  // useEffect(() => {
  //   setTimeout(() => setAnimate(true), 200);
  // }, []);

  const handleSaveCreate = async (e) => {
    e.preventDefault();

    try {
        const payload = {
            name: createService.title,
            description: createService.description,
            subServices: createService.subServices || [], // Ensure subServices is included
        };

        const response = await axiosInstance.post(API_ENDPOINTS.SERVICES.GET_SERVICES, payload);

        console.log(response, "postres");

        setRefresh(!refresh);
        setCreateService({ title: "", description: "", subServices: [] }); // Reset state properly
        setCreatePopupOpen(false);
        toast.success("Service Created Successfully", {
          position: "top-center", 
          autoClose: 2000,    
    })
    } catch (err) {
        console.log("error", err);
    }
};

  return (
    <div className={`bg-[#4DA1A9]   tracking-widest min-h-screen py-10`}>
      <ToastContainer />
    <div className="flex items-center justify-center px-6">
      <div className="w-[60%] min-w-[300px]">
        {role === "admin" &&
         <div className="flex justify-end">
         <div>
           <button onClick={() => setCreatePopupOpen(true)} className="border cursor-pointer hover:bg-blue-700 border-blue-500 rounded-lg text-[#fff] bg-blue-500 px-2 py-2">Create Service</button>
         </div>
       </div>
        }
       
        <h2 className="text-[3rem] font-bold text-[#FFFDEC] text-center mb-8">
          Our Services
        </h2>
        <div className="grid cursor-pointer gap-6 p-4 grid-cols-1 sm:grid-cols-2">
          {services.length > 0 && services.map((service, index) => (
            <div
              key={index}
              className={`relative border border-gray-300 p-6 rounded-lg bg-white text-center shadow-md transition-all duration-700 ease-in-out`}
            >
              {/* <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 mx-auto mb-4"
              /> */}
              <div className="text-[2.4rem] font-medium mb-2 text-gray-800">
                {service.name}
              </div>
              <p className="text-[1.8rem] text-gray-700">{service.description}</p>

              {role === "admin" && (
                <div className="absolute top-2 right-2 space-x-2  ">
                  <button className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded" onClick={() => openEditPopup(service)}>
                    Edit
                  </button>
                  <button className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded" onClick={() => openDeletePopup(service)}>
                    Delete
                  </button>
                </div>
              )}

              <div className="flex justify-center items-center mt-2">
                <button onClick={() => handleBooking(service)}
                  className=" text-[1.2rem] border cursor-pointer hover:bg-blue-700 bg-blue-500 text-white px-6 py-3 rounded-full"
                >
                  {role === "admin" ? "Detail View" : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Dialog
  visible={createPopupOpen}
  onHide={() => setCreatePopupOpen(false)}
  header="Create Service"
  modal
  maskClassName="bg-black bg-opacity-30 backdrop-blur-xs"
  className="bg-[#fff] text-[2rem] p-4"
>
  {/* Service Title */}
  <input
    type="text"
    value={createService.title}
    onChange={(e) => setCreateService({ ...createService, title: e.target.value })}
    className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-4"
    placeholder="Title"
  />

  {/* Service Description */}
  <textarea
    value={createService.description}
    onChange={(e) => setCreateService({ ...createService, description: e.target.value })}
    className="w-full p-2 h-[8rem] border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-4"
    placeholder="Description"
  ></textarea>

  {/* Sub-Services Section */}
  <h3 className="text-[1.5rem] mb-2">Sub-Services</h3>
  {createService.subServices?.map((subService, index) => (
    <div key={index} className="border p-2 rounded mb-2">
      <input
        type="text"
        value={subService.name}
        onChange={(e) => {
          const updatedSubServices = [...createService.subServices];
          updatedSubServices[index].name = e.target.value;
          setCreateService({ ...createService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Sub-Service Name"
      />
      <textarea
        value={subService.description}
        onChange={(e) => {
          const updatedSubServices = [...createService.subServices];
          updatedSubServices[index].description = e.target.value;
          setCreateService({ ...createService, subServices: updatedSubServices });
        }}
        className="w-full p-2 h-[5rem] border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Sub-Service Description"
      ></textarea>
      <input
        type="text"
        value={subService.estimatedTime}
        onChange={(e) => {
          const updatedSubServices = [...createService.subServices];
          updatedSubServices[index].estimatedTime = e.target.value;
          setCreateService({ ...createService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Estimated Time (e.g., 1 hour)"
      />
      <input
        type="number"
        value={subService.servicePrice}
        onChange={(e) => {
          const updatedSubServices = [...createService.subServices];
          updatedSubServices[index].servicePrice = parseFloat(e.target.value);
          setCreateService({ ...createService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Service Price"
      />
      <input
        type="number"
        value={subService.concentrationPrice}
        onChange={(e) => {
          const updatedSubServices = [...createService.subServices];
          updatedSubServices[index].concentrationPrice = parseFloat(e.target.value);
          setCreateService({ ...createService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Consultation Price"
      />
      {/* <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={subService.isActive}
          onChange={(e) => {
            const updatedSubServices = [...createService.subServices];
            updatedSubServices[index].isActive = e.target.checked;
            setCreateService({ ...createService, subServices: updatedSubServices });
          }}
          className="mr-2"
        />
        <label className="text-[1.2rem]">Active</label>
      </div> */}
      <button
        className="bg-red-500 text-[1.2rem] text-white px-4 py-1 rounded"
        onClick={() => {
          const updatedSubServices = createService.subServices.filter((_, i) => i !== index);
          setCreateService({ ...createService, subServices: updatedSubServices });
        }}
      >
        Remove
      </button>
    </div>
  ))}

  {/* Add Sub-Service Button */}
  <button
    className="bg-green-500 text-[1.2rem] text-white px-4 py-1 rounded mb-4"
    onClick={() =>
      setCreateService({
        ...createService,
        subServices: [
          ...createService.subServices,
          {
            name: "",
            description: "",
            estimatedTime: "",
            servicePrice: 0,
            concentrationPrice: 0,
            isActive: true,
          },
        ],
      })
    }
  >
    + Add Sub-Service
  </button>

  {/* Action Buttons */}
  <div className="flex justify-end space-x-2">
    <button
      className="bg-gray-500 text-[1.2rem] cursor-pointer text-white px-4 py-2 rounded"
      onClick={() => setCreatePopupOpen(false)}
    >
      Cancel
    </button>
    <button
      className="bg-blue-500 text-[1.2rem] cursor-pointer text-white px-4 py-2 rounded"
      onClick={handleSaveCreate}
    >
      Save
    </button>
  </div>
</Dialog>

 
   <Dialog
  visible={editPopupOpen}
  onHide={() => setEditPopupOpen(false)}
  header="Edit Service"
  modal
  maskClassName="bg-black bg-opacity-30 backdrop-blur-xs"
  className="bg-[#fff] text-[2rem] p-4"
>
  {/* Service Title */}
  <input
    type="text"
    value={selectedService?.name || ""}
    onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
    className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-4"
    placeholder="Title"
  />

  {/* Service Description */}
  <textarea
    value={selectedService?.description || ""}
    onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
    className="w-full p-2 h-[8rem] border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-4"
    placeholder="Description"
  ></textarea>

  {/* Sub-Services Section */}
  <h3 className="text-[1.5rem] mb-2">Sub-Services</h3>
  {selectedService?.subServices?.map((subService, index) => (
    <div key={index} className="border p-2 rounded mb-2">
      <input
        type="text"
        value={subService.name}
        onChange={(e) => {
          const updatedSubServices = [...selectedService.subServices];
          updatedSubServices[index].name = e.target.value;
          setSelectedService({ ...selectedService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Sub-Service Name"
      />
      <textarea
        value={subService.description}
        onChange={(e) => {
          const updatedSubServices = [...selectedService.subServices];
          updatedSubServices[index].description = e.target.value;
          setSelectedService({ ...selectedService, subServices: updatedSubServices });
        }}
        className="w-full p-2 h-[5rem] border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Sub-Service Description"
      ></textarea>
      <input
        type="text"
        value={subService.estimatedTime}
        onChange={(e) => {
          const updatedSubServices = [...selectedService.subServices];
          updatedSubServices[index].estimatedTime = e.target.value;
          setSelectedService({ ...selectedService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Estimated Time (e.g., 1 hour)"
      />
      <input
        type="number"
        value={subService.servicePrice}
        onChange={(e) => {
          const updatedSubServices = [...selectedService.subServices];
          updatedSubServices[index].servicePrice = parseFloat(e.target.value);
          setSelectedService({ ...selectedService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Service Price"
      />
      <input
        type="number"
        value={subService.concentrationPrice}
        onChange={(e) => {
          const updatedSubServices = [...selectedService.subServices];
          updatedSubServices[index].concentrationPrice = parseFloat(e.target.value);
          setSelectedService({ ...selectedService, subServices: updatedSubServices });
        }}
        className="w-full p-2 border border-gray-200 focus:outline-none focus:border-blue-500 text-[1.2rem] rounded mb-2"
        placeholder="Consultion Price"
      />
      {/* <div className="flex items-center mb-2">
        <input
          type="checkbox"
          checked={subService.isActive}
          onChange={(e) => {
            const updatedSubServices = [...selectedService.subServices];
            updatedSubServices[index].isActive = e.target.checked;
            setSelectedService({ ...selectedService, subServices: updatedSubServices });
          }}
          className="mr-2"
        />
        <label className="text-[1.2rem]">Active</label>
      </div> */}
      <button
        className="bg-red-500 text-[1.2rem] text-white px-4 py-1 rounded"
        onClick={() => {
          const updatedSubServices = selectedService.subServices.filter((_, i) => i !== index);
          setSelectedService({ ...selectedService, subServices: updatedSubServices });
        }}
      >
        Remove
      </button>
    </div>
  ))}

  {/* Add Sub-Service Button */}
  <button
    className="bg-green-500 text-[1.2rem] text-white px-4 py-1 rounded mb-4"
    onClick={() =>
      setSelectedService({
        ...selectedService,
        subServices: [
          ...selectedService.subServices,
          {
            name: "",
            description: "",
            estimatedTime: "",
            servicePrice: 0,
            concentrationPrice: 0,
            isActive: true,
          },
        ],
      })
    }
  >
    + Add Sub-Service
  </button>

  {/* Action Buttons */}
  <div className="flex justify-end space-x-2">
    <button
      className="bg-gray-500 text-[1.2rem] cursor-pointer text-white px-4 py-2 rounded"
      onClick={() => setEditPopupOpen(false)}
    >
      Cancel
    </button>
    <button
      className="bg-blue-500 text-[1.2rem] cursor-pointer text-white px-4 py-2 rounded"
      onClick={handleSaveEdit}
    >
      Save
    </button>
  </div>
</Dialog>

      
      {/* Delete Confirmation Popup using PrimeReact Dialog */}
      <Dialog visible={deletePopupOpen} onHide={() => setDeletePopupOpen(false)} header="Confirm Deletion" modal
      maskClassName="bg-black   bg-opacity-30 backdrop-blur-xs"
      className="bg-[#fff] rounded-lg text-[2rem] p-4"
      >
        <p className="mb-4 text-[1.4rem]">Are you sure you want to delete "{selectedService?.title}"?</p>
        <div className="flex justify-end text-[1.2rem] space-x-2">
          <button className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded" onClick={() => setDeletePopupOpen(false)}>Cancel</button>
          <button className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded" onClick={handleDelete}>Delete</button>
        </div>
      </Dialog>
  </div>
  
  );
}

export default OurServices;
