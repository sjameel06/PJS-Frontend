import React, { useEffect, useState } from 'react'
import JobSchedulingImg from "../../assets/scheduling.png";
import TrackingImg from "../../assets/real-time-tracking.png";
import WorkOrderImg from "../../assets/project-management.png";
import CustomerImg from "../../assets/crm.png";
import InventoryImg from "../../assets/inventory.png";
import InvoicingImg from "../../assets/estimate.png";
function OurFeatures() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
      setTimeout(() => setAnimate(true), 200);
    }, []);
    const features = [
        {
          title: "Job Scheduling & Dispatching",
          description:
            "Easily assign jobs to your technicians with our intelligent scheduling system. Our drag-and-drop interface and automated dispatching help you optimize your workforce, reduce idle time, and ensure technicians arrive on time.",
          image: JobSchedulingImg,
        },
        {
          title: "Real-Time Technician Tracking",
          description:
            "Track your field workforce with GPS-enabled live tracking. Get updates on job progress, estimated arrival times, and technician availability, ensuring better time management and customer satisfaction.",
          image: TrackingImg,
        },
        {
          title: "Work Order Management",
          description:
            "Create, update, and manage work orders effortlessly. Our system allows technicians to access job details, upload photos, update job statuses, and generate invoices directly from the field.",
          image: WorkOrderImg,
        },
        {
          title: "Customer Management",
          description:
            "Maintain a comprehensive customer database, including service history, contact details, and past invoices. Automate customer notifications and appointment reminders for a seamless service experience.",
          image: CustomerImg,
        },
        {
          title: "Inventory & Parts Management",
          description:
            "Keep track of your stock levels and ensure technicians have the right parts before heading to a job. Our inventory management system reduces downtime and prevents unnecessary delays.",
          image: InventoryImg,
        },
        {
          title: "Estimates & Invoicing",
          description:
            "Generate instant estimates and convert them into invoices with just a click. Accept payments online and streamline your billing process with integrated accounting solutions.",
          image: InvoicingImg,
        },
      ];
  return (
    < div className='tracking-widest min-h-screen py-10'>
      <div className='flex items-center justify-center'>
      <div className='text-[3rem] font-semibold'>Our Features</div>
      </div>
      <div className="flex items-center justify-center p-6">
      <div className="w-[80%]">
        <div className="grid gap-6 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`border  border-gray-300 p-6 rounded-lg bg-white text-center shadow-md transition-all duration-700 ease-in-out ${
                animate
                  ? `opacity-100 translate-x-0 delay-${index * 300}`
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="w-20 h-20 mx-auto mb-4"
              />
              <div className="text-[2.4rem] font-medium mb-2">{feature.title}</div>
              <p className="text-[1.8rem] text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
     
     
    </div>
  
    
  )
}

export default OurFeatures
