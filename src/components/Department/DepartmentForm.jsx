import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createDepartment, updateDepartment } from '../../services/api';

const DepartmentForm = ({ editDept, setEditDept, refreshList }) => {
  const [name, setName] = useState(editDept?.name || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editDept) {
        await updateDepartment(editDept.id, { name });
      } else {
        await createDepartment({ name });
      }
      refreshList();
      setName('');
      setEditDept(null);
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
      <Form.Group>
        <Form.Label>Department Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant={editDept ? "warning" : "primary"} type="submit">
        {editDept ? "Update Department" : "Add Department"}
      </Button>
    </Form>
  );
};

export default DepartmentForm;