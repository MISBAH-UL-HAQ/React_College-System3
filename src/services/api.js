import axios from 'axios';

const API = axios.create({
  baseURL: 'https://localhost:7220/api',
});

// Department endpoints
export const fetchDepartments = () => API.get('/Departments');
export const createDepartment = (dept) => API.post('/Departments', dept);
export const updateDepartment = (id, dept) => API.put(`/Departments/${id}`, dept);
export const deleteDepartment = (id) => API.delete(`/Departments/${id}`);

// Student endpoints
// export const fetchStudents = () => API.get('/Student/Students');
// export const createStudent = (student) => API.post('Student/Students', student);
// export const updateStudent = (id, student) => API.put(`/Students/${id}`, student);
// export const deleteStudent = (id) => API.delete(`/Students/${id}`);

export const fetchStudents = () => API.get('/Students');
export const createStudent = (student) => API.post('/Students', student);
export const updateStudent = (id, student) => API.put(`/Students/${id}`, student);
export const deleteStudent = (id) => API.delete(`/Students/${id}`);

