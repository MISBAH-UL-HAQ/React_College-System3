import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { fetchStudents, deleteStudent } from '../../services/api';

const StudentList = ({ setEditStudent, departments }) => {
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const { data } = await fetchStudents();
      setStudents(data);
    } catch (error) {
      console.error('Failed to load students:', error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      await deleteStudent(id);
      getStudents();
    }
  };

  const getDepartmentName = (departmentId) => {
    const dept = departments.find(d => d.id === departmentId);
    return dept ? dept.name : 'Unknown Department';
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map(student => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{getDepartmentName(student.departmentId)}</td>
            <td>
              <Button variant="info" onClick={() => setEditStudent(student)} className="me-2">
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(student.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StudentList;