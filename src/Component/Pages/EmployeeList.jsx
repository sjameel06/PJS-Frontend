import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axiosInstance from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import { Skeleton } from "primereact/skeleton";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(""); 
  const [role, setRole] = useState(""); 
  const [pagination, setPagination] = useState({ page: 1, limit: 10, totalRecords: 0 });


  const fetchEmployees = async () => {
    try {
      setLoading(true);
      let query = `page=${pagination.page}&limit=${pagination.limit}`;
      if (search.trim()) query += `&search=${search.trim()}`;
      if (role) query += `&role=${role}`;

      console.log("Fetching Employees:", API_ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST + query); 

      const response = await axiosInstance.get(`${API_ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST}${query}`);
      console.log("API Response:", response);

      const employeesData = response.data?.data?.employees || [];
      const totalRecords = response.data?.data?.total || 0;

      setEmployees(Array.isArray(employeesData) ? employeesData : []);
      setPagination((prev) => ({ ...prev, totalRecords }));
      
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };
console.log(pagination,"pagination")
useEffect(() => {
  fetchEmployees();
}, [pagination.page, pagination.limit, search, role]);

  const onPageChange = (event) => {
    console.log("Pagination Event:", event);
    setPagination((prev) => ({
      ...prev,
      
      page: event.page + 1, 
      limit: event.rows, 
    }));
  };

  console.log(pagination,"pagpag")

  return (
    <div className="p-4 ml-20 bg-white shadow-md rounded-lg">
      <h2 className="text-[3rem] font-semibold mb-3 text-gray-700">Employee List</h2>

      <DataTable
        value={employees}
        loading={loading}
        paginator
        rows={pagination.limit}
        first={(pagination.page - 1) * pagination.limit}
        rowsPerPageOptions={[10, 15, 20]}
        totalRecords={pagination.totalRecords} 
        tableStyle={{ minWidth: "50rem" }}
        className="p-datatable-striped p-datatable-hover custom-table"
        paginatorClassName="p-paginator-custom"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        onPage={onPageChange}
      >
      
        <Column field="name" header="Name" body={(rowData) => (
          loading ? <Skeleton width="80%" /> : <span className="font-medium">{rowData.name}</span>
        )} />

        <Column field="email" header="Email" body={(rowData) => (
          loading ? <Skeleton width="90%" /> : <span className="text-gray-600">{rowData.email}</span>
        )} />

        
        <Column field="role" header="Role" body={(rowData) => (
          loading ? <Skeleton width="60%" /> : 
          <span className={`px-3 py-1 rounded-md  font-semibold `}>
            {rowData.role}
          </span>
        )} />
      </DataTable>

      <style>{`
        .custom-table .p-datatable-wrapper {
          overflow: hidden !important;
          font-size: 1.4rem
        }
        .p-datatable .p-datatable-tbody > tr {
          border-bottom: 1px solid #ddd;
        }
        .p-datatable .p-datatable-tbody > tr > td {
          padding: 12px 0px;
        }
        .p-paginator-custom {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 16px;
          border-radius: 8px;
          background: #f9fafb;
          border: 1px solid #ddd;
          gap: 20px;
        }
        .p-paginator .p-dropdown {
          margin-right: 8px;
        }
        .p-paginator .p-dropdown:before {
          content: "Rows per page: ";
          font-weight: 500;
          color: #333;
          margin-right: 5px;
        }
        .p-paginator .p-paginator-pages {
          display: flex;
          gap: 20px;
        }
        .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
          background: #EEF1DA;
          border-radius: 5px;
          color: black;
        }
        .p-paginator .p-paginator-pages .p-paginator-page:hover {
          background: #EEF1DA;
          color: black;
        }
      `}</style>
    </div>
  );
};

export default EmployeeList;
