
import React, { useState,useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import DepartmentForm from './components/Department/DepartmentForm';
import DepartmentList from './components/Department/DepartmentList';

import StudentForm from './components/Student/StudentForm';
import StudentList from './components/Student/StudentList';
import { fetchDepartments } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [editDept, setEditDept] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [departments, setDepartments] = useState([]);
 

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const { data } = await fetchDepartments();
        setDepartments(data);
      } catch (error) {
        console.error('Failed to load departments:', error);
      }
    };
    loadDepartments();
  }, []);

  
  return (

    
    <Container className="py-4">
      <h1 className="mb-4 text-center">College Management System</h1>
      
      <h2 className="mt-5">Departments</h2>
      <DepartmentForm 
        editDept={editDept}
        setEditDept={setEditDept}
        refreshList={() => setEditDept(null)}
      />
      <DepartmentList setEditDept={setEditDept} />

      <h2 className="mt-5">Students</h2>
      <StudentForm
        editStudent={editStudent}
        setEditStudent={setEditStudent}
        refreshList={() => setEditStudent(null)}
        departments={departments}
      />
      <StudentList 
        setEditStudent={setEditStudent}
        departments={departments}
      />
    </Container>
);
}

export default App;
