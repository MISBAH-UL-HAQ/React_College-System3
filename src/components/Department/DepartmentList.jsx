import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { fetchDepartments, deleteDepartment } from '../../services/api';

const DepartmentList = ({ setEditDept }) => {
  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    try {
      const { data } = await fetchDepartments();
      setDepartments(data);
    } catch (error) {
      console.error('Failed to load departments:', error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this department?')) {
      await deleteDepartment(id);
      getDepartments();
    }
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.map((dept) => (
          <tr key={dept.id}>
            <td>{dept.id}</td>
            <td>{dept.name}</td>
            <td>
              <Button variant="info" onClick={() => setEditDept(dept)} className="me-2">
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(dept.id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DepartmentList;