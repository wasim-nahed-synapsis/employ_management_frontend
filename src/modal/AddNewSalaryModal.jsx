// src/components/AddNewSalaryModal.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddNewSalaryModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    department: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    payDate: '',
    month: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'payDate') {
      const date = new Date(value);
      const monthName = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      setFormData((prev) => ({
        ...prev,
        payDate: value,
        month: `${monthName} ${year}`,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/salary/generate', formData);
      alert('Salary added successfully!');
      onSuccess(); // reload parent data
      onClose();   // close modal
    } catch (error) {
      console.error(error);
      alert('Failed to add salary');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="bg-white bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Salary</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl font-bold">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Department</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Logistic">Logistic</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Employee ID</label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Employee</option>
              <option value="yousaf222">yousaf222</option>
              <option value="musa11">musa11</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Allowances</label>
            <input
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Deductions</label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pay Date</label>
            <input
              type="date"
              name="payDate"
              value={formData.payDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewSalaryModal;
