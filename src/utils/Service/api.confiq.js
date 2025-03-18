const BASE_URL = "http://192.168.1.15:5000/api/v1";

export const API_ENDPOINTS = {
     LOGOUT: `${BASE_URL}/session-token/logout`,
     EMPLOYEE : {
       ADD_EMPLOYEE:  `${BASE_URL}/admin/employee/add-employee`,
       EMPLOYEE_LIST : `${BASE_URL}/admin/employee/list-employee?`
     },
    PROFILE : {
    UPDATE_PROFILE : `${BASE_URL}/employee/update-employee`
    } ,

    SERVICES : {
        GET_SERVICES : `${BASE_URL}/pjs-services`,
        UPDATE_SERVICE : `${BASE_URL}/pjs-services/`,
        DELETE_SERVICE : `${BASE_URL}/pjs-services/`,
        UPDATE_SUBSERVICE: `${BASE_URL}/pjs-services/`


        
    },

    JOB : {
      JOB_CREATE:  `${BASE_URL}/jobs/create`,
      JOB_LIST : `${BASE_URL}/jobs/list/unassigned`,
      JOB_ASSINGED : `${BASE_URL}/jobs/assign` 
    },
    CUSTOMER: {
        LOGIN: `${BASE_URL}/customer/login`,
        REGISTER: `${BASE_URL}/customer/register`,
        FORGET_PASSWORD : `${BASE_URL}/customer/forgot-password`,
        RESET_PASSWORD :`${BASE_URL}/customer/new-password`
    },
    ADMIN: {
        LOGIN: `${BASE_URL}/admin/login`,
        FORGET_PASSWORD : `${BASE_URL}/admin/forgot-password`,
       RESET_PASSWORD : ` ${BASE_URL}/api/v1/admin/new-password`
        
    },
    TECHNICIAN: {
        LOGIN: `${BASE_URL}/technician/login`,
        FORGET_PASSWORD : `${BASE_URL}/technician/forgot-password`,
        RESET_PASSWORD :`${BASE_URL}/technician/new-password`,
        STATUS_UPDATE : `${BASE_URL}/technician/update-status`,
        ACTIVE_LIST : `${BASE_URL}/dispatcher/list-technicians`
    },
    DISPATCHER: {
        LOGIN: `${BASE_URL}/dispatcher/login`,
        FORGET_PASSWORD : `${BASE_URL}/dispatcher/forgot-password`,
        RESET_PASSWORD :`${BASE_URL}/dispatcher/new-password`
    },
};
