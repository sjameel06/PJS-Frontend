import React, { useState } from 'react'
import DashboardPage from './DashboardPage'
import WorkersDashboard from './WorkersDashboard'
import InventoryDashboard from './InventoryDashboard'
import FinancialDashboard from './FinancialDashboard'

function MainAdminDashboard() {
    const [selectedtab,setSelectedTab] =useState("Jobs")
  return (
    <div className=" ml-24 bg-[#FAF8FB] px-10 py-6 space-y-6">
    <h1 className="text-[2rem] text-[#1E73BE] font-normal">Dashboard</h1>
     <div className='flex gap-10 cursor-pointer justify-center'>
        <div onClick={() => setSelectedTab("Jobs")} className={`${selectedtab === "Jobs" ? 'border-none shadow-md bg-[#fff] text-[#1E73BE]' : 'border-none bg-[#1E73BE] text-[#fff]'} rounded-full border px-12 py-2`}>Jobs</div>
        <div onClick={() => setSelectedTab("Workers")} className={` ${selectedtab === "Workers" ? ' border-none shadow-md  bg-[#fff] text-[#1E73BE]' : 'border-none bg-[#1E73BE] text-[#fff]'} rounded-full border px-12 py-2`}>Workers</div> 
        <div onClick={() => setSelectedTab("Inventory")} className={`${selectedtab === "Inventory" ?  'border-none shadow-md bg-[#fff] text-[#1E73BE]' : ' border-none bg-[#1E73BE] text-[#fff]'} rounded-full border px-12 py-2`}>Inventory</div> 
        <div onClick={() => setSelectedTab("Financial")} className={` ${selectedtab === "Financial" ? 'bg-[#fff] shadow-md border-none text-[#1E73BE]' : 'border-none bg-[#1E73BE] text-[#fff]'} rounded-full border px-12 py-2`}>Financial</div>
     </div>
     <div>
     {selectedtab === 'Jobs' ? (
    <DashboardPage />
) : selectedtab === 'Workers' ? (
    <WorkersDashboard />
) : selectedtab === 'Inventory' ? (
    <InventoryDashboard />
) : selectedtab === 'Financial' ? (
    <FinancialDashboard />
) : null}

     </div>
    </div>
  )
}

export default MainAdminDashboard
