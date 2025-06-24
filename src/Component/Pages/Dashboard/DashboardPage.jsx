import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { LatLngExpression } from 'leaflet'
import ChartComponent from './Chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaPhone } from 'react-icons/fa';

const DashboardPage = () => {
  const jobSummary = [
    { label: "New Job Requests", count: 54 },
    { label: "In Progress Jobs", count: 12 },
    { label: "Completed Jobs", count: 12 },
    { label: "Cancelled Jobs", count: 12 },
    { label: "High Priority Jobs", count: "03" },
    { label: "Delayed Jobs", count: "03" },
  ];
 

  const pieChartData = {
    labels: ['Emergency Plumbing (12%)', 'Pipe Installations & Repairs (12%)', 'Outdoor Plumbing (13%)', 'Water Heater Services (25%)', 'Gas Line Services (12%)'],
    datasets: [
      {
        data: [12, 12, 13, 25, 12],
        backgroundColor: ['#1976D2', '#FBC02D', '#388E3C', '#FFA726', '#F57C00'],
        hoverBackgroundColor: ['#2196F3', '#FFEB3B', '#4CAF50', '#FFB74D', '#FB8C00']
      }
    ]
  };

  const paymentSummary = [
    { label: 'Pending', amount: '$5,000', color: 'bg-yellow-400' },
    { label: 'Paid', amount: '$17,000', color: 'bg-green-500' },
    { label: 'Overdue Payments', amount: '$2,000', color: 'bg-red-500' }
  ];

  const workerStats = [
    { label: 'Available Workers', count: 13 },
    { label: 'Assigned Workers', count: 12 },
    { label: 'Workers on Leave', count: 2 }
  ];

  const customerData = [
    {
      id: 1,
      loginId: '3451987',
      name: 'Ahmed Ali',
      email: 'ahmedali@gmail.com',
      contact: '0312-83839393',
      address: 'Residential Address: The Address Residences Dubai Opera Tower 1',
    },
    // Duplicate same object for demo purpose (same as your image)
    {
      id: 2,
      loginId: '3451987',
      name: 'Ahmed Ali',
      email: 'ahmedali@gmail.com',
      contact: '0312-83839393',
      address: 'Residential Address: The Address Residences Dubai Opera Tower 1',
    },
    {
      id: 3,
      loginId: '3451987',
      name: 'Ahmed Ali',
      email: 'ahmedali@gmail.com',
      contact: '0312-83839393',
      address: 'Residential Address: The Address Residences Dubai Opera Tower 1',
    },
    {
      id: 4,
      loginId: '3451987',
      name: 'Ahmed Ali',
      email: 'ahmedali@gmail.com',
      contact: '0312-83839393',
      address: 'Residential Address: The Address Residences Dubai Opera Tower 1',
    },
    {
      id: 5,
      loginId: '3451987',
      name: 'Ahmed Ali',
      email: 'ahmedali@gmail.com',
      contact: '0312-83839393',
      address: 'Residential Address: The Address Residences Dubai Opera Tower 1',
    },
    {
      id: 6,
      loginId: '3451987',
      name: 'Ahmed Ali',
      email: 'ahmedali@gmail.com',
      contact: '0312-83839393',
      address: 'Residential Address: The Address Residences Dubai Opera Tower 1',
    },
  ];
  const actionTemplate = (rowData) => {
    return (
        <div className="flex gap-2 justify-center">
            <Button icon={<FaCheckCircle />} className="p-button-success p-button-rounded" />
            <Button icon={<FaTimesCircle />} className="p-button-danger p-button-rounded" />
            <Button icon={<FaEdit />} className="p-button-secondary p-button-rounded" />
            <Button icon={<FaPhone />} className="p-button-info p-button-rounded" />
        </div>
    );
};


 

  return (
    <div className=" bg-[#FAF8FB]  ">
   

      {/* Job Summary Cards */}
      <div className='text-[#676767] font-semibold text-[1.4rem]'>Job Summary</div>
     <div className='flex   gap-4'>
     <div className="flex  p-4  gap-4 flex-row   w-[40%]  rounded-lg flex-wrap">
  {jobSummary.map((item, idx) => (
    <div
      key={idx}
      className="text-center h-[63px] p-2   rounded-lg shadow-md bg-white min-w-[150px]"
    >
      <p className="text-[1.2rem] text-[#464646]">{item.label}</p>
      <p className="text-[2.4rem] font-semibold text-[#1E73BE]">{item.count}</p>
    </div>
  ))}
</div>
<div className='w-[60%]'> <ChartComponent/> </div>
     </div>
    
<div>
  <div className='text-[#676767] text-[1.2rem] py-2'>Pending Jobs Request</div>
  <div className="bg-[#FFFFFF] rounded-[6px] p-2">
  <div className="card p-4">
        <DataTable value={customerData} stripedRows  className="no-borders bg-[#F4F7FCBF]" showGridlines={false} responsiveLayout="scroll">
            <Column field="id" header="#" style={{ width: '3rem' }} />
            <Column field="loginId" header="LOGIN ID" />
            <Column field="name" header="CUST NAME" />
            <Column field="email" header="EMAIL" />
            <Column field="contact" header="CONTACT" />
            <Column field="address" header="RESIDENTIAL ADDRESS" />
            <Column body={actionTemplate} header="ACTION" style={{ textAlign: 'center', width: '12rem' }} />
        </DataTable>
    </div>
    </div>
</div>

      
    </div>
  );
};

export default DashboardPage;