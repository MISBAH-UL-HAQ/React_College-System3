import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createStudent, updateStudent } from '../../services/api';

const StudentForm = ({ editStudent, setEditStudent, refreshList, departments }) => {
  const [formData, setFormData] = useState({
    name: '',
    departmentId: ''
  });

  // Set initial form data when editing
  useEffect(() => {
    if (editStudent) {
      setFormData({
        name: editStudent.name,
        departmentId: editStudent.departmentId
      });
    }
  }, [editStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStudent) {
        await updateStudent(editStudent.id, formData);
      } else {
        await createStudent(formData);
      }
      refreshList();
      setFormData({ name: '', departmentId: '' });
      setEditStudent(null);
    } catch (error) {
      console.error('Operation failed:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded">
      <Form.Group className="mb-3">
        <Form.Label>Student Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Department</Form.Label>
        <Form.Select
          value={formData.departmentId}
          onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          {departments.map(dept => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button variant={editStudent ? "warning" : "primary"} type="submit">
        {editStudent ? "Update Student" : "Add Student"}
      </Button>
    </Form>
  );
};

export default StudentForm;