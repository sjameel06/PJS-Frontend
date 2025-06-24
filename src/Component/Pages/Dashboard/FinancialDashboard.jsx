import React from 'react';
import { Chart } from 'primereact/chart';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
function FinancialDashboard() {
  const FinancialSummary = [
    { label: "Revenue (This Month)", count: 1000 },
    { label: "Revenue (Last Month)", count: 500 },
    { label: "Pending Payments", count: 9 },
    { label: "Total Expenses", count: 400 },
    { label: "Average Job Value", count: 100 },
    { label: "Net Profit (This Year)", count: 100000 },
  ];
  const frequentCustomers = [
    {
      id: 1,
      custName: "ABC",
      orders: 534,
      cashPayment: 76,
      cardPayment: 4,
      avgRating: 4.4,
      phoneNo: 15000,
      loginId: 5600000
    },
    {
      id: 2,
      custName: "ABC",
      orders: 534,
      cashPayment: 76,
      cardPayment: 4,
      avgRating: 4.4,
      phoneNo: 15000,
      loginId: 5600000
    }
  ];
  const customer = [
    { label: "Total Customers", count: 1000 },
    { label: "New Customers", count: 500 },
    { label: "Overall Rating", count: 9 },
    { label: "Cash Customers", count: 400 },
    { label: "Card Customers", count: 100 },
  ]
  const header = (
    <div className="flex justify-content-between">
        <div className="flex  p-input-icon-left">
          
            <div><InputText type="search" placeholder="Search..." /></div>
            
        </div>
        <button className="p-button p-button-outlined">Export in CSV</button>
    </div>
  );
  return (
    <div className="p-4">
      <div>
      <h2 className=" text-[1.6rem] font-bold  mb-4">Financial Summary</h2>
      </div> 
     <div className="flex flex-wrap my-2 gap-4">
                {FinancialSummary.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-center flex-1 md:w-[153px]   p-2 rounded-lg shadow bg-[#fff]"
                  >
                    <p className="text-[1.2rem] text-[#464646]">{item.label}</p>
                    <p className="text-[2.4rem] font-semibold text-[#1E73BE]">
                      {item.count}
                    </p>
                  </div>
                ))}
              </div>
    <div className='mt-6'>
    <DashboardCharts />
    </div>
    <div className='mt-4'>
      <div className=" text-[1.6rem] font-bold mb-4">Customers Summary</div>
    <div className="flex flex-wrap my-2 gap-4">
                {customer.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-center flex-1 md:w-[153px]   p-2 rounded-lg shadow bg-[#fff]"
                  >
                    <p className="text-[1.2rem] text-[#464646]">{item.label}</p>
                    <p className="text-[2.4rem] font-semibold text-[#1E73BE]">
                      {item.count}
                    </p>
                  </div>
                ))}
              </div>
    </div>
    
    <div className='py-3'>
            <h3  className='py-2 text-[1.6rem] font-bold'>Frequent Customers</h3>
            <DataTable value={frequentCustomers} header={header} paginator rows={10} rowsPerPageOptions={[10, 20, 50]} paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
            <Column field="id" header="#" sortable />
<Column field="custName" header="CUST NAME" sortable />
<Column field="orders" header="ORDERS" sortable />
<Column field="cashPayment" header="CASH PAYMENT" sortable />
<Column field="cardPayment" header="CARD PAYMENT" sortable />
<Column field="avgRating" header="AVG RATING" sortable />
<Column field="phoneNo" header="PHONE NO" sortable />
<Column field="loginId" header="LOGIN ID" sortable />
            </DataTable>
        </div>
    

    </div>
  );
}

function DashboardCharts() {
  // Total Earnings - This Year (Bar with Line)
  const earningsChartData = {
    labels: ['Jan-21', 'Mar-21', 'May-21', 'Jul-21', 'Sep-21', 'Nov-21'],
    datasets: [
      {
        type: 'bar',
        label: 'Deposit',
        data: [2500, 1500, 2000, 1800, 2200, 2300],
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1
      },
      {
        type: 'line',
        label: 'Cumulative Profit',
        data: [10000, 6000, 8000, 7000, 9000, 110000],
        fill: false,
        borderColor: '#FF6384',
        tension: 0.4
      }
    ]
  };

  const earningsChartOptions = {
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jobs'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Millions'
        }
      }
    }
  };

  // Payment Status Summary (Horizontal Bar)
  const paymentChartData = {
    labels: ['Pending', 'Paid', 'Canceled Payments', 'Overdue Payments'],
    datasets: [
      {
        data: [6000, 11000, 1500, 4000],
        backgroundColor: ['#FFCE56', '#4BC0C0', '#FF6384', '#36A2EB'],
        barThickness: 20
      }
    ]
  };

  const paymentChartOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: '$'
        }
      }
    }
  };

  // Revenue Breakdown by Service Type (Doughnut)
  const revenueChartData = {
    labels: [
      'Emergency Plumbing',
      'Pipe Installation & Repair',
      'Outdoor Plumbing',
      'Water Heater Services',
      'Gas Line Services',
      'Sewer & Septic Services'
    ],
    datasets: [
      {
        data: [321, 441, 210, 432, 120, 145],
        backgroundColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#36A2EB', '#9966FF', '#FF9F40'],
        hoverBackgroundColor: ['#4BC0C0', '#FFCE56', '#FF6384', '#36A2EB', '#9966FF', '#FF9F40']
      }
    ]
  };

  const revenueChartOptions = {
    plugins: {
      legend: {
        position: 'right'
      },
      
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            let value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  };

  return (
    <div className="flex justify-evenly flex-wrap w-full gap-4   ">
    <div className="bg-white p-3 rounded shadow   flex flex-col">
      <h3 className="font-semibold text-sm mb-2">Total Earnings - This Year</h3>
      <div className="flex-1  ">
        <Chart type="bar" className='h-full my-[65px] w-full ' data={earningsChartData} options={earningsChartOptions} />
      </div>
    </div>
  
    <div className="bg-white p-3 rounded shadow   flex flex-col">
      <h3 className="font-semibold text-sm mb-2">Payment Status Summary</h3>
      <div className="flex-1 ">
        <Chart type="bar" className='h-full my-[65px] w-full ' data={paymentChartData} options={paymentChartOptions} />
      </div>
    </div>
  
    <div className="bg-white p-3 rounded shadow h-full  flex flex-col">
      <h3 className="font-semibold text-sm mb-2">Revenue Breakdown by Service Type</h3>
      <div className="aspect-square  w-full">
  <Chart
    type="doughnut"
    className="h-full w-full"
    data={revenueChartData}
    options={revenueChartOptions}
  />
</div>

    </div>
  </div>
  
  );
}

export default FinancialDashboard;
