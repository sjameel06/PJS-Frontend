import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { LatLngExpression } from 'leaflet'
const DashboardPage = () => {
  const jobSummary = [
    { label: "New Job Requests", count: 54 },
    { label: "In Progress Jobs", count: 12 },
    { label: "Completed Jobs", count: 12 },
    { label: "Cancelled Jobs", count: 12 },
    { label: "High Priority Jobs", count: "03" },
    { label: "Delayed Jobs", count: "03" },
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

  return (
    <div className="ml-20 p-6 space-y-6">
      <h1 className="text-[2rem] text-[#1E73BE] font-normal">Dashboard</h1>

      {/* Job Summary Cards */}
      <div className='text-[#676767] font-semibold text-[1.4rem]'>Job Summary</div>
      <div className="flex flex-row gap-4 w-[40%]  p-4 rounded-lg flex-wrap">
  {jobSummary.map((item, idx) => (
    <div
      key={idx}
      className="text-center  p-4 rounded-lg shadow-md bg-white min-w-[150px]"
    >
      <p className="text-[1.2rem] text-[#464646]">{item.label}</p>
      <p className="text-[2.4rem] font-semibold text-[#1E73BE]">{item.count}</p>
    </div>
  ))}
</div>
<div className='text-[#676767] font-semibold text-[1.4rem]' >Workers Summary</div>
<div className="flex justify-center gap-4">
        {workerStats.map((item, idx) => (
          <div key={idx} className="text-center rounded-lg">
            <div className="p-4 shadow-md">
              <p  className="text-[12px] text-[#464646]">{item.label}</p>
              <p  className="text-[24px] font-semibold text-[#1E73BE]">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-6 ">
        <Card className="w-[40%]">
          <div className="">
            <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Workers Most Engagement</h2>
            <Chart
              type="doughnut"
              data={pieChartData}
              options={{
                responsive: true,
                cutout: '50%',
                plugins: { legend: { position: 'right' } }
              }}
            />
          </div>
        </Card>
        <div className=" w-[60%] rounded-lg shadow-md p-4">
        <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Active Workers Locations</h2>
        <div className="h-[400px] px-10">
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Adding a marker */}
            <Marker position={mapCenter}>
              <Popup>
                Example Location
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      </div>

      {/* Revenue & Payment Summary Section */}
      <div className='text-[#676767] font-semibold text-[1.4rem]'>Revenue & Payment Summary</div>
      <div className="flex gap-4">
        <Card className='md:w-[33%] w-full '>
          <div className="">
            <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Total Earnings - This Year</h2>
            <Chart type="bar" className=''  data={revenueChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </Card>

        <Card className='md:w-[33%] w-full'>
          <div className="">
            <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Payment Status Summary</h2>
            <ul className="space-y-6 pt-5 ">
              {paymentSummary.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <div className="w-2/3 ml-2">
                    <div className={`h-2 rounded ${item.color}`} style={{ width: '100%' }}></div>
                    <span className="text-sm font-semibold block mt-1">{item.amount}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className=' md:w-[33%] w-full'>
          <div className="">
            <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Revenue Breakdown by Service Type</h2>
            <Chart type="doughnut" data={pieChartData} options={{ responsive: true, cutout: '70%', plugins: { legend: { position: 'right' } } }} />
          </div>
        </Card>
      </div>

      {/* Worker Stats */}
    

      {/* Worker Engagement Chart */}
      
    </div>
  );
};

export default DashboardPage;