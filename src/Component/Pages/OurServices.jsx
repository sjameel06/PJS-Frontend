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
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import edit from '../../assets/Edit.png';
import detail from '../../assets/Detail.png';
import deleteicon from '../../assets/Delete.png'

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
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.SERVICES.GET_SERVICES}/?&subService=true`
      );
      console.log("✅ Services Response:", response);
      setServices(response.data.data.data);
      setLoading(false);
    } catch (err) {
      console.error("❌ Axios Error:", err);

      // More detailed error message handling
      const errorMessage =
        err?.response?.data?.message || // backend error message
        err?.response?.statusText ||   // HTTP error text
        err?.message ||                // network error message
        "An unexpected error occurred.";

      setError(errorMessage);
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
    <div className={`bg-[#FAF8FB] ml-24  2xl:ml-36  tracking-widest min-h-screen py-10`}>
      <ToastContainer />
<div className="flex ml-5 gap-3">
<div>
        
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 11L12 2L17.5 11H6.5ZM17.5 22C16.25 22 15.1877 21.5627 14.313 20.688C13.4383 19.8133 13.0007 18.7507 13 17.5C12.9993 16.2493 13.437 15.187 14.313 14.313C15.189 13.439 16.2513 13.0013 17.5 13C18.7487 12.9987 19.8113 13.4363 20.688 14.313C21.5647 15.1897 22.002 16.252 22 17.5C21.998 18.748 21.5607 19.8107 20.688 20.688C19.8153 21.5653 18.7527 22.0027 17.5 22ZM3 21.5V13.5H11V21.5H3ZM17.5 20C18.2 20 18.7917 19.7583 19.275 19.275C19.7583 18.7917 20 18.2 20 17.5C20 16.8 19.7583 16.2083 19.275 15.725C18.7917 15.2417 18.2 15 17.5 15C16.8 15 16.2083 15.2417 15.725 15.725C15.2417 16.2083 15 16.8 15 17.5C15 18.2 15.2417 18.7917 15.725 19.275C16.2083 19.7583 16.8 20 17.5 20ZM5 19.5H9V15.5H5V19.5ZM10.05 9H13.95L12 5.85L10.05 9Z" fill="#1E73BE"/>
        </svg>
        
              </div>
              <div className="text-[#1E73BE] font-medium  text-[2rem]">
              Service Category Config → All Service Categories
              </div>
</div>
   
    <div className=" px-5 py-2">
      <div className=" ">
        <div className=" flex justify-between">
        <div className="text-[#4E4E4E] font-medium text-[1.6rem]">All Service Categories</div>
        {role === "admin" &&
         <div className="">
         <div>
           <button onClick={() => setCreatePopupOpen(true)} className="border cursor-pointer rounded-[4px] text-[1.4rem]  rounded-lg text-[#fff] bg-[#1E73BE] py-2 px-4">+ Add Service Category</button>
         </div>
       </div>
        }
        </div>
    
        <div className="p-3 bg-[#fff] rounded-[6px] mt-4 h-screen">
{console.log(services,"serve")}          
  <DataTable className="bg-[#F4F7FCBF] " value={services} paginator rows={7} responsiveLayout="scroll" stripedRows>
    <Column header="#" body={(_, { rowIndex }) => rowIndex + 1} style={{ width: '4rem' }} />
    <Column header="CATEGORY NAME" className="" body={(row) => <span  className="text-[1.4rem] text-[#212529]">{row.name}</span>} />
    <Column header="SUB-CATEGORY" body={(row) => (
      <span className="text-[1.4rem] text-[#212529]">{row.subServices?.map(sub => sub.name).join(', ')}</span>
    )} />
    {/* <Column header="DEFAULT PRICE" body={(row) =>  <span>  AED 100</span>} /> */}
    <Column header="DESCRIPTION" body={(row) => <span  className="text-[1.4rem] text-[#212529]">{row.description}</span>} />
    <Column header="STATUS" body={(row) => (
     <div class="relative inline-block w-11 h-5">
     <input checked id="switch-component" type="checkbox" class="peer appearance-none w-11 h-8 bg-[#fff] rounded-full checked:bg-[#1E73BE] cursor-pointer transition-colors duration-300" />
     <label for="switch-component" class="absolute top-0 left-0 w-7 h-8 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer">
     </label>
   </div>
    )} />
    <Column header="ACTION" body={(row) => (
     <div className="flex gap-3 ">
     <button
       className="cursor-pointer"
       onClick={() => handleBooking(row)}
     >
       <img src={detail} alt="Detail" className="" />
     </button>
   
     {role === 'admin' && (
       <>
         <button
           className="cursor-pointer"
           onClick={() => openEditPopup(row)}
         >
           <img src={edit} alt="Edit" className="" />
         </button>
   
         <button
           className="cursor-pointer"
           onClick={() => openDeletePopup(row)}
         >
           <img src={deleteicon} alt="Delete" className="" />
         </button>
       </>
     )}
   </div>
   
    )} />
  </DataTable>
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
