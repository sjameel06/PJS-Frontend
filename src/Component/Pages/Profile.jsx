import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axiosInstance from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
function Profile() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      certifications: [{ name: "", institute: "", startDate: "", endDate: "" }],
    },
  });

  const { fields: certificationFields, append: appendCertification } = useFieldArray({
    control,
    name: "certifications",
  });

  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("accessToken");
  let decoded = {};
  if (token) {
    decoded = jwtDecode(token);
  }
  const role = decoded.role;
  useEffect(() => {
    const getTechnicianProfile = async () => {
      const endpoint =
  role === 'dispatcher'
    ? API_ENDPOINTS.DISPATCHER.PROFILE
    : API_ENDPOINTS.TECHNICIAN.PROFILE;

      try {
        const response = await axiosInstance.get(endpoint);
        const data = response.data.data;
        console.log(response, "resres")
        setProfileData(data);

        if (data) {
          setValue("address", data.address || "");
          setValue("age", data.age?.toString() || "");
          setValue("experience", data.experience?.toString() || "");
          setValue("phoneNumber", data.phoneNumber || "");
          setValue("jobTitle", data.jobTitle || "");
          setValue("skills", (data.skills || []).join(", ") || "");
          setValue("availability.0.day", data.availability?.[0]?.day || "");
          setValue("availability.0.startTime", data.availability?.[0]?.startTime || "");
          setValue("availability.0.endTime", data.availability?.[0]?.endTime || "");

          // Handle certifications
          if (data.certifications && data.certifications.length > 0) {
            setValue("certifications", data.certifications.map(cert => ({
              name: cert.name || "",
              institute: cert.institute || "",
              startDate: cert.startDate ? cert.startDate.substring(0, 10) : "",
              endDate: cert.endDate ? cert.endDate.substring(0, 10) : "",
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching technician profile:", error);
      }
    };

    getTechnicianProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        skills: data.skills.split(",").map((skill) => skill.trim()),
      };
      console.log(formattedData, "data")
      const response = await axiosInstance.put(API_ENDPOINTS.PROFILE.UPDATE_PROFILE, formattedData);
      console.log("Profile updated successfully:", response.data);
      toast.success("Profile updated successfully!");

      setIsEditing(false);
      reset({
        address: "",
        age: "",
        experience: "",
        phoneNumber: "",
        jobTitle: "",
        skills: "",
        availability: [{ day: "", startTime: "", endTime: "" }],
        certifications: [{ name: "", institute: "", startDate: "", endDate: "" }],
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="my-5 bg-[#FAF8FB] mr-3 ml-30">
      <div className="rounded-md  px-10 py-5 bg-white rounded shadow text-black">
        <div className="flex justify-between">
          <div className="text-[1.8rem] font-bold mb-6 text-center">Profile Setting</div>
          <ToastContainer position="top-right" autoClose={3000} />

          {!isEditing && (
            <div className=" mb-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-[#4182F9]  text-white px-4 py-2 rounded hover:bg-blue-800"

              >
                Edit
              </button>
            </div>
          )}
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Address", name: "address", type: "text", required: true, placeholder: "Your Address" },
              { label: "Age", name: "age", type: "number", required: true, placeholder: "Your Age" },
              { label: "Phone Number", name: "phoneNumber", type: "text", required: true, placeholder: "Your Phone Number" },
              { label: "Experience", name: "experience", type: "number", required: true, placeholder: "Your Experience" },
              { label: "Job Title", name: "jobTitle", type: "text", required: true, placeholder: "Your Job Title" },
              { label: "Skills (comma-separated)", name: "skills", type: "text", required: false, placeholder: "Your Skills" },
            ].map((field) => (
              <div key={field.name} className="w-[45%]">
                <label className="block text-gray-700 text-[1.6rem] font-bold mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...register(field.name, { required: field.required })}
                  disabled={!isEditing}
                  className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                {errors[field.name] && (
                  <span className="text-red-500 text-sm">This field is required</span>
                )}
              </div>
            ))}
          </div>
                <div className="border border-[#F9F9F9] px-4"></div>
          {/* Certifications */}
          <div>
            <label className="block text-[1.6rem] font-bold mb-4">Certifications</label>
            {certificationFields.map((field, index) => (
              <div key={field.id} className="grid grid-col-2 
          gap-6
           mb-4">

                <div className="w-[45%]">
                  <label className="text-[1.6rem] font-bold text-gray-700">Certification Name</label>
                  <input
                    type="text"
                    placeholder="Certification Name"
                    {...register(`certifications.${index}.name`)}
                    disabled={!isEditing}
                    className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="w-[45%]">
                  <label className="text-[1.6rem] font-bold text-gray-700">Institute</label>
                  <input
                    type="text"
                    placeholder="Institute"
                    {...register(`certifications.${index}.institute`)}
                    disabled={!isEditing}
                    className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div className="w-full flex  justify-between">
                  <div className="flex  w-[70%] gap-6"> <div  className="w-[35%]">
                    <label className="text-[1.6rem] font-bold text-gray-700">Start Date</label>
                    <input
                      type="date"
                      {...register(`certifications.${index}.startDate`)}
                      disabled={!isEditing}
                      className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                    <div  className="w-[35%]">
                      <label className="text-[1.6rem] font-bold text-gray-700">End Date</label>
                      <input
                        type="date"
                        {...register(`certifications.${index}.endDate`)}
                        disabled={!isEditing}
                        className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>
                  <div className=" w-[15%]    mt-4    mr-2          ">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => appendCertification({ name: "", institute: "", startDate: "", endDate: "" })}
                        className="text-[#4182F9] bg-[#4182F9]/10   rounded-[8px] py-3 px-4 text-sm"
                      >
                        + Add Another
                      </button>
                    )} </div>

                </div>


              </div>
            ))}

          </div>
          <div className="border border-[#F9F9F9] px-4"></div>
          {/* Availability */}
          <div className="grid grid-cols-3 gap-4">
            <div className="w-[35%]">
              <label className="text-[1.6rem] font-bold text-gray-700">Available Day</label>
              <input
                type="text"
                placeholder="Available Day"
                {...register("availability.0.day")}
                disabled={!isEditing}
                className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="w-[25%]">
              <label className="text-[1.6rem] font-bold text-gray-700">Start Time</label>
              <input
                type="time"
                {...register("availability.0.startTime")}
                disabled={!isEditing}
                className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="w-[25%]">
              <label className="text-[1.6rem] font-bold text-gray-700">End Time</label>
              <input
                type="time"
                {...register("availability.0.endTime")}
                disabled={!isEditing}
                className="w-full p-3  bg-[#F9F9F9] rounded-[8px]  rounded disabled:bg-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end  w-[95%]
             mt-6">
              <button
                type="submit"
                className="text-[#4182F9] bg-[#4182F9]/10   rounded-[8px] py-3 px-[32px] text-sm"
              >
                Done
              </button>
            </div>
          )}
        </form>
      </div>
    </div>

  );
}

export default Profile;
