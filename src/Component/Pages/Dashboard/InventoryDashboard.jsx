import React from 'react'
import { Chart } from 'primereact/chart';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
function InventoryDashboard() {
  const InventorySummary = [
    { label: "Total Items in Stock", count: 54 },
    { label: "Low Stock Alerts", count: 12 },
    { label: "Out of Stocks Items", count: 12 },
    { label: "Recently Added Items", count: 12 },
    { label: "Items Used Today", count: 3 },
    { label: "Items Used This Month", count: 3 },
  ];
  const pieChartData = {
    labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    datasets: [
      {
        data: [12, 12, 13, 25, 12],
        backgroundColor: ['#1976D2', '#FBC02D', '#388E3C', '#FFA726', '#F57C00'],
        hoverBackgroundColor: ['#2196F3', '#FFEB3B', '#4CAF50', '#FFB74D', '#FB8C00']
      }
    ]
};


const items = [
  { id: 1, itemName: 'Pipe', sku: '534', currentStock: 76, reorderLevel: 4, costPrice: 12000, sellingPrice: 15000, stockValue: 5600000 },
  { id: 2, itemName: 'PVC Pipes', sku: '534', currentStock: 76, reorderLevel: 4, costPrice: 12000, sellingPrice: 15000, stockValue: 5600000 },
  { id: 2, itemName: 'Galvanized Steel Pipes', sku: '534', currentStock: 76, reorderLevel: 4, costPrice: 12000, sellingPrice: 15000, stockValue: 5600000 }
];


// Line-Bar Combination Chart Data and Options
const lineBarChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            type: 'bar',
            label: 'Used Inventory',
            data: [50, 40, 60, 50, 70, 60, 80, 70, 60, 50, 40, 60],
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Difference',
            data: [60, 50, 70, 60, 80, 70, 90, 80, 70, 60, 50, 70],
            fill: false,
            borderColor: '#4BC0C0',
            tension: 0.4
        }
    ]
};

const lineBarChartOptions = {
    plugins: {
        legend: {
            position: 'top'
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
const header = (
  <div className="flex justify-content-between">
      <div className="flex  p-input-icon-left">
        
          <div><InputText type="search" placeholder="Search..." /></div>
          
      </div>
      <button className="p-button p-button-outlined">Export in CSV</button>
  </div>
);
  return (
    <div>
     <div className='text-[2rem]'>Inventory Summary</div> 
     <div className="flex flex-wrap my-2 gap-4">
                {InventorySummary.map((item, idx) => (
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
          
              <div className="flex gap-4 p-4 ">
  {/* Items Most Used */}
  <div className="bg-white p-4 w-[50%] h-[300px] rounded-xl shadow flex flex-col">
    <h3 className="text-lg font-semibold mb-2">Items Most Used</h3>
    <div className="flex-1 mx-auto flex items-center justify-center">
      <Chart
        type="doughnut"
        data={pieChartData}
        options={{
          responsive: true,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'right',
            },
          },
        }}
        className=" w-full max-h-[240px]"
      />
    </div>
  </div>

  {/* Inventory Usage Per Month */}
  <div className="bg-white p-4  w-[50%] rounded-xl shadow flex flex-col">
    <h3 className="text-lg font-semibold mb-2">Inventory Usage Per Month</h3>
    <div className="flex-1">
      <Chart
        type="bar"
        data={lineBarChartData}
        options={lineBarChartOptions}
        className="max-h-[300px] w-full"
      />
    </div>
  </div>
  
</div>
<div>
            <h3>Frequently Used Items</h3>
            <DataTable value={items} header={header} paginator rows={10} rowsPerPageOptions={[10, 20, 50]} paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
                <Column field="id" header="#" sortable />
                <Column field="itemName" header="ITEM NAME" sortable />
                <Column field="sku" header="SKU" sortable />
                <Column field="currentStock" header="CURRENT STOCK" sortable />
                <Column field="reorderLevel" header="REORDER LEVEL" sortable />
                <Column field="costPrice" header="COST PRICE" sortable />
                <Column field="sellingPrice" header="SELLING PRICE" sortable />
                <Column field="stockValue" header="STOCK VALUE" sortable />
            </DataTable>
        </div>
          
    
    </div>
  )
}

export default InventoryDashboard
