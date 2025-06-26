import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axiosInstance from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../utils/Service/api.confiq";
import { Skeleton } from "primereact/skeleton";

const LIMIT = 10; // ✅ Hardcoded limit, consistent across component

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    totalRecords: 0,
  });

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      let query = `page=${pagination.page}&limit=${LIMIT}`;
      if (search.trim()) query += `&search=${search.trim()}`;
      if (role) query += `&role=${role}`;

      console.log("Fetching Employees:", `${API_ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST}${query}`);

      const response = await axiosInstance.get(
        `${API_ENDPOINTS.EMPLOYEE.EMPLOYEE_LIST}?${query}`
      );

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

  useEffect(() => {
    fetchEmployees();
  }, [pagination.page, search, role]); // ✅ No limit dependency

  const onPageChange = (event) => {
    console.log("Page changed to:", event.page + 1);
    setPagination((prev) => ({
      ...prev,
      page: event.page + 1, // ✅ PrimeReact is 0-based
    }));
  };

  return (
    <div className="p-4 ml-20 bg-white shadow-md rounded-lg">
      <h2 className="text-[3rem] font-semibold mb-3 text-gray-700">Employee List</h2>
  
      {loading === true ? (
     <div className="flex justify-center items-center h-[300px]" role="status">
     <svg
       aria-hidden="true"
       className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
       viewBox="0 0 100 101"
       fill="none"
       xmlns="http://www.w3.org/2000/svg"
     >
       <path
         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
         fill="currentColor"
       />
       <path
         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
         fill="currentFill"
       />
     </svg>
     <span className="sr-only">Loading...</span>
   </div>
      ) : (
        <DataTable
          value={employees}
          paginator
          rows={LIMIT}
          first={(pagination.page - 1) * LIMIT}
          totalRecords={pagination.totalRecords}
          rowsPerPageOptions={[LIMIT]}
          tableStyle={{ minWidth: "50rem" }}
          className="p-datatable-striped p-datatable-hover custom-table"
          paginatorClassName="p-paginator-custom"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          onPage={onPageChange}
        >
          <Column
            field="name"
            header="Name"
            body={(rowData) => <span className="font-medium">{rowData.name}</span>}
          />
          <Column
            field="email"
            header="Email"
            body={(rowData) => <span className="text-gray-600">{rowData.email}</span>}
          />
          <Column
            field="role"
            header="Role"
            body={(rowData) => (
              <span className="px-3 py-1 rounded-md font-semibold">{rowData.role}</span>
            )}
          />
        </DataTable>
      )}
  
      {/* Loader CSS already uses Tailwind */}
      <style>{`
        .custom-table .p-datatable-wrapper {
          overflow: hidden !important;
          font-size: 1.4rem;
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
