import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure to import the Leaflet CSS
import { LatLngExpression } from 'leaflet'
import createprofile from '../../assets/createprofile.png'
import workprogress from '../../assets/workprogress.png'
import alltech from '../../assets/alltech.png'
import completedreq from '../../assets/completedreq.png'
import { API_ENDPOINTS } from '../../utils/Service/api.confiq';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
const DispatcherDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refresh, setRefresh] = useState(false)
  const [teams, setTeams] = useState([]);
const [expandedTeamId, setExpandedTeamId] = useState(null);
const navigate = useNavigate()
  useEffect(() => {

    const fetchTechnicians = async () => {
      try {
        const response = await axiosInstance.get(`${API_ENDPOINTS.TECHNICIAN.ACTIVE_LIST}?page=1&limit=10`);
        if (response.data?.data) {
          console.log(response, "resresres")
          setEmployees(response.data.data.data);
        } else {
          console.error("Invalid technician data structure", response.data);
        }
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await axiosInstance.get(API_ENDPOINTS.TEAM_MANAGEMENT.TEAM_LIST);
        console.log(response.data.data.teams,"reeeeeeeeeeeeeee")
        if (response.data?.data?.teams) {
          setTeams(response.data.data.teams); // nested safely
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeam();
    fetchTechnicians();

  }, [refresh]);

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
const selectemp = (emp) => {
console.log(emp)
localStorage.setItem("selectedemployee", JSON.stringify(emp));

navigate("/JobAssignment")
}


  return (
 <div className=" bg-[#FAF8FB]  p-4">
      <div className="text-[2rem] text-[#1E73BE] s  mb-4">Dashboard</div>

      <div className="flex w-full gap-2 ">
  <div className="w-[45%]   text-start">

  <div className='text-[#676767] my-2 font-semibold text-[1.4rem]'>Jobs Summary</div>

<div className='flex gap-4 py-4 justify-center '>
  {/* Left Column */}
  <div className='flex flex-col gap-4 '>
    <div className='bg-[#1E73BE] text-white w-[183px] h-[181px]  px-4 py-4 rounded-[19px]'>
    <div className='flex flex-col items-center gap-2'>
      <img src={createprofile} className="mb-2" />
      <div className='text-[1.6rem]'>Create profile</div>
      <div className='text-[3.6rem] font-semibold'>120</div>
    </div>
    </div>
 
    <div className='rounded-[19px] bg-[#fff] py-3 w-[187px] h-[110px] px-4 shadow-lg'>
      <div className='flex items-center gap-2'>
        <img src={completedreq} />
        <div className='text-[1.4rem] font-medium'>All technicians</div>
      </div>
      <div className='text-[2rem] text-center font-bold'>30</div>
    </div>
  </div>

  {/* Right Column */}
  <div className='flex flex-col gap-4'>
    <div className='rounded-[19px] bg-[#fff] py-3 w-[183px] h-[110px] px-4 shadow-lg'>
      <div className='flex items-center gap-2'>
        <img src={workprogress} />
        <div className='text-[1.4rem] font-medium'>Work & Progress</div>
      </div>
      <div className='text-[2rem] text-center font-bold'>30</div>
    </div>

    <div className='rounded-[19px] bg-[#fff] py-3 h-[181px] w-[183px] px-4 shadow-lg'>
      <div className='flex flex-col items-center gap-2'>
        <img src={alltech} className=' mb-2'/>
        <div className='text-[1.4rem] font-medium'>Completed Requests</div>
      </div>
      <div className='text-[3.6rem] text-center font-bold'>20</div>
    </div>
  </div>
</div>
<div className='p-4'>
<div className="w-full p-4  rounded ">
        <h3 className="font-bold mb-2">Employees</h3>
        
        {employees.map((employee) => (
          <div onClick={() => selectemp(employee)}  className="flex items-center justify-between mb-4 bg-white p-3 rounded-lg shadow-sm">
          <div className="flex items-center">
            <img
              src={`https://i.pravatar.cc/150?u=${employee._id}`}
              alt={employee.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-800 font-medium">{employee.name}</span>
          </div>

          <button
            // onClick={() =>handleCheckboxChange(employee._id)}
            className={`w-[28px] h-[28px] pb-1 text-[1.8rem] rounded-full flex items-center justify-center text-white bg-[#C7CED9]` }
            //${
            //   selectedEmployees.includes(employee._id) ? "bg-red-500" : "bg-[#D9E7FF]"
            // }`}

          >
           {"+"} {/* {selectedEmployees.includes(employee._id) ? "−" : "+"} */}
          </button>
        </div>

        ))}
        <div className=""> 
        <h3 className="font-bold mb-2">Teams</h3>
  {teams.map((team) => (
   
    <div key={team._id} className=" border mt-2 rounded shadow p-2 bg-white">
       {console.log(team,"teamteam")}
      <div
        className="cursor-pointer "
        onClick={() =>
          setExpandedTeamId(expandedTeamId === team._id ? null : team._id)
        }
      >
        {team.teamName}
      </div>

      {expandedTeamId === team._id && (
        <div className="mt-2 ml-4">
          <p className="text-sm text-gray-500 mb-2">{team.description}</p>
          {team.technicians?.length > 0 ? (
            <ul className="list-disc pl-5">
              {team.technicians.map((tech) => (
                <li key={tech._id} className="text-gray-700">
                  {tech.name} - {tech.email}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-red-500">No technicians in this team.</p>
          )}
        </div>
      )}
    </div>
  ))}
</div>


      </div>
</div>

      

  </div>
  <div className="w-[55%]   text-start">
  <div className='text-[#676767] my-4 font-semibold text-[1.4rem]' >Workers Summary</div>
<div className="flex justify-center  w-full gap-4">
        {workerStats.map((item, idx) => (
          <div key={idx} className="text-center bg-[#fff] rounded-lg">
            <div className="py-1  px-8 shadow-md">
              <p  className="text-[12px]  text-[#464646]">{item.label}</p>
              <p  className="text-[24px] font-semibold text-[#1E73BE]">{item.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='text-[#676767] my-2 font-semibold text-[1.4rem]'>Revenue & Payment Summary</div>
      <div className="flex gap-4">
        <Card className=' w-full '>
          <div className="">
            <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Total Earnings - This Year</h2>
            <Chart type="bar" className=''  data={revenueChartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
          </div>
        </Card>
      </div>
      <div className=" w-[100%] mt-2 bg-[#fff] rounded-lg shadow-md p-4">
        <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Active Workers Locations</h2>
        <div className="h-[300px] w-full px-10">
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
      <div className=" gap-6 mt-2 ">
        <Card className="w-[50%]">
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
        </div>

        {/* <Card className='md:w-[33%] w-full'>
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
        </Card> */}

        {/* <Card className=' md:w-[33%] w-full'>
          <div className="">
            <h2 className='text-[#676767] font-semibold text-[1.4rem]'>Revenue Breakdown by Service Type</h2>
            <Chart type="doughnut" data={pieChartData} options={{ responsive: true, cutout: '70%', plugins: { legend: { position: 'right' } } }} />
          </div>
        </Card> */}
    

  </div>
</div>
    </div>


  );
};

export default DispatcherDashboard;