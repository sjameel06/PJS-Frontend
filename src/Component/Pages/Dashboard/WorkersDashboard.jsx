import React from 'react'
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { LatLngExpression } from 'leaflet'
import ChartComponent from './Chart';
import { FaStar } from 'react-icons/fa';
function WorkersDashboard() {
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
      const workSummary = [
        { label: "Active (On Job) Workers", count: 54 },
        { label: "Available Workers", count: 12 },
        { label: "Assigned Workers", count: 12 },
        { label: "Workers on Leave", count: 12 },
        { label: "Workers Using Fleet", count: "03" },
        { label: "Total Workers", count: "03" },
      ];
      const mapCenter = [51.505, -0.09]; // Example coordinates for London
      const mapZoom = 13;
      const revenueChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            type: 'bar',
            label: 'Revenue',
            backgroundColor: '#42A5F5',
            data: [10000, 12000, 14000, 9000, 16000, 13000],
          },
          {
            type: 'line',
            label: 'Jobs',
            borderColor: '#66BB6A',
            borderWidth: 2,
            fill: false,
            data: [8, 10, 12, 9, 14, 11],
          }
        ]
      };
      const workers = [
        {
          name: 'Jawwad Ahmed',
          rating: 3,
          total: 5,
          handyman: 'Jawwad Ahmed',
          email: 'ahmedsid1@gmail.com',
          contact: '02929292939',
          address:
            'The Address Residences Dubai Opera Tower 1, The Address Residences Dubai Opera, Downtown Dubai, Dubai',
        },
        {
          name: 'Bilal Khan',
          rating: 4,
          total: 5,
          handyman: 'Bilal Khan',
          email: 'ahmedsid1@gmail.com',
          contact: '02929292910',
          address:
            'The Address Residences Dubai Opera Tower 1, The Address Residences Dubai Opera, Downtown Dubai, Dubai',
        },
        {
          name: 'Asad Khan',
          rating: 4,
          total: 5,
          handyman: 'Asad Khan',
          email: 'ahmedsid1@gmail.com',
          contact: '02929292959',
          address:
            'The Address Residences Dubai Opera Tower 1, The Address Residences Dubai Opera, Downtown Dubai, Dubai',
        },
      ];
      return (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Workers Summary</h2>
      
          <div className="flex flex-wrap gap-10 justify-between">
            {/* Summary Boxes */}
            <div className="flex-1    min-w-[280px]">
              <div className="flex flex-wrap gap-4">
                {workSummary.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-center flex-1 min-w-[120px]  p-2 rounded-lg shadow bg-[#fff]"
                  >
                    <p className="text-[1.2rem] text-[#464646]">{item.label}</p>
                    <p className="text-[2.4rem] font-semibold text-[#1E73BE]">
                      {item.count}
                    </p>
                  </div>
                ))}
              </div>
            </div>
      
            {/* Doughnut Chart */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-4 min-w-[280px] max-w-[400px]">
              <h2 className="text-[#676767] font-semibold text-[1.2rem] mb-4">
                Revenue Breakdown by Service Type
              </h2>
              <Chart
                type="doughnut"
                data={pieChartData}
                options={{
                  responsive: true,
                  cutout: '50%',
                  plugins: { legend: { position: 'right' } },
                }}
              />
            </div>
      
            {/* Map Section */}
            <div className="flex-1 bg-white rounded-lg shadow-md p-4 min-w-[280px]">
              <h2 className="text-[#676767] font-semibold text-[1.2rem] mb-2">
                Active Workers Locations
              </h2>
              <div className="h-[300px]">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={mapCenter}>
                    <Popup>Example Location</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
          <div className="p-4">
      <h2 className="text-md font-semibold mb-4 text-gray-800">Active Workers</h2>

      <div className="flex  bg-[#fff] p-4 flex-col gap-4">
        {workers.map((worker, index) => (
          <div
            key={index}
            className="bg-[#EAEFFF] rounded-lg p-4 shadow flex flex-col  md:flex-row justify-between items-start md:items-center"
          >
            {/* Worker Info */}
            <div className="mb-2 md:mb-0">
              <h3 className="text-lg font-semibold text-[#1E73BE]">{worker.name}</h3>
              <div className="flex items-center text-yellow-500 text-sm mb-1">
                {[...Array(worker.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
                <span className="ml-2 text-gray-700">({worker.rating}/{worker.total})</span>
              </div>
              <div className='flex justify-between   w-[70%] px-2 flex-wrap'>
              <p><strong>Handyman Name:</strong> {worker.handyman}</p>
              <p><strong>Email Address:</strong> {worker.email}</p>
              <p><strong>Contact no:</strong> {worker.contact}</p>
              <p className="text-sm mt-1">
                <strong>Residential Address:</strong> {worker.address}
              </p>
              </div>
            </div>

            {/* Assign Button */}
            <div className="">
              <button className=" bg-[#4C4DDC] cursor-pointer text-white w-[80px] py-1 rounded">
                Assign Job
              </button>
            </div> 
          </div>
        ))}
      </div>
    </div>
        </div>
      );
      
}

export default WorkersDashboard
