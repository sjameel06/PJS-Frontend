import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import axiosInstance from "../../utils/axiosInstance";
import { onMessageListener } from "../../firebase";

function Profile() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      address: "",
      age: "",
      experience: "",
      phoneNumber: "",
      jobTitle: "",
      skills: "",
      certifications: [
        {
          name: "",
          institute: "",
          startDate: "",
          endDate: "",
          present: false
        }
      ],
      availability: [
        {
          day: "",
          startTime: "",
          endTime: ""
        }
      ]
    }
  });

  // Token Decode
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }

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
  const onSubmit = async (data) => {
    try {
      // Format the data according to backend requirements
      const formattedData = {
        address: data.address.trim(),
        age: Number(data.age.trim()),
        experience: Number(data.experience.trim()),
        phoneNumber: data.phoneNumber.trim(),
        jobTitle: data.jobTitle.trim(),
        skills: data.skills
          .split(",")
          .map(skill => skill.trim()) // Convert to array and remove spaces
          .filter(skill => skill !== ""), // Remove empty values
        certifications: data.certifications.map(cert => ({
          name: cert.name.trim(),
          institute: cert.institute.trim(),
          startDate: cert.startDate,
          endDate: cert.endDate,
          present: cert.present
        })),
        availability: data.availability.map(avail => ({
          day: avail.day.trim(),
          startTime: avail.startTime.trim(),
          endTime: avail.endTime.trim()
        }))
      };
console.log( formattedData,"datatatta")
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.PROFILE.UPDATE_PROFILE}`,
        formattedData
      );

      console.log("Updated User Data:", response.data);
      toast.success("Profile Updated Successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Try again later!");
    }
  };

  // Input Fields
  const inputFields = [
    { label: "Address", name: "address", type: "text", required: true },
    { label: "Age", name: "age", type: "number", required: true },
    { label: "Experience (Years)", name: "experience", type: "number", required: true },
    { label: "Phone Number", name: "phoneNumber", type: "text", required: true },
    { label: "Job Title", name: "jobTitle", type: "text", required: true },
    { label: "Skills (comma separated)", name: "skills", type: "text", required: true },
  ];

  return (
    <div className="bg-[#4DA1A9] py-10 min-h-screen text-white px-6">
      <h2 className="text-[3rem] font-bold text-center mb-6">User Profile</h2>
      <ToastContainer />

      <div className="w-[60%] min-w-[300px] mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid text-[1.4rem] grid-cols-4 gap-6">
            {inputFields.map((field) => (
              <div className="mb-4 col-span-4 md:col-span-2" key={field.name}>
                <label className="block text-gray-700">{field.label}:</label>
                <input
                  type={field.type}
                  {...register(field.name, { required: field.required })}
                  className="w-full p-2 border border-gray-300 rounded text-black"
                />
                {errors[field.name] && (
                  <p className="text-red-500 text-sm">This field is required</p>
                )}
              </div>
            ))}

            {/* Certification Fields */}
            <div className="mb-4 col-span-4">
              <label className="block text-gray-700">Certification Name:</label>
              <input type="text" {...register("certifications.0.name")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>

            <div className="mb-4 col-span-4">
              <label className="block text-gray-700">Institute:</label>
              <input type="text" {...register("certifications.0.institute")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-gray-700">Start Date:</label>
              <input type="date" {...register("certifications.0.startDate")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-gray-700">End Date:</label>
              <input type="date" {...register("certifications.0.endDate")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>

           

            {/* Availability Fields */}
            <div className="mb-4 col-span-4">
              <label className="block text-gray-700">Availability (Day):</label>
              <input type="text" {...register("availability.0.day")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-gray-700">Start Time:</label>
              <input type="time" {...register("availability.0.startTime")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>

            <div className="mb-4 col-span-2">
              <label className="block text-gray-700">End Time:</label>
              <input type="time" {...register("availability.0.endTime")} className="w-full p-2 border border-gray-300 rounded text-black" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-[1.4rem] cursor-pointer p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
