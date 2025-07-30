import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:3000/employees";

const defaultForm = {
  name: "",
  email: "",
  employeeId: "",
  dob: "",
  gender: "Male",
  maritalStatus: "Single",
  designation: "",
  department: "",
  salary: "",
  password: "",
  role: "",
  image: null,
};

export default function AddEmployeeModal({ open, onClose, onCreated, employee }) {
  const isEdit = !!employee;
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (employee) {
      setForm({ ...employee, image: null }); // image null so file input resets
    }
  }, [employee]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((p) => ({ ...p, [name]: files[0] }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (v !== null && v !== undefined) fd.append(k, v);
      });

      const url = isEdit ? `${API_URL}/${employee._id}` : API_URL;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${res.status}`);
      }

      const result = await res.json();
      onCreated?.(result);
      setForm(defaultForm);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300
">
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h3 className="text-lg font-semibold">{isEdit ? "Edit Employee" : "Add Employee"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
            <Input label="Employee ID" name="employeeId" value={form.employeeId} onChange={handleChange} />
            <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} options={["Male", "Female", "Other"]} />
            <Input label="Designation" name="designation" value={form.designation} onChange={handleChange} />
            <Input label="Salary" name="salary" type="number" value={form.salary} onChange={handleChange} />
            <Select label="Role" name="role" value={form.role} onChange={handleChange} options={["Admin", "Manager", "Employee"]} placeholder="Select Role" />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
            <Select label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} options={["Single", "Married", "Divorced", "Widowed"]} />
            <Select label="Department" name="department" value={form.department} onChange={handleChange} options={["IT", "HR", "Finance", "Sales", "Marketing", "Database"]} />
            <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
            <div>
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} />
            </div>
          </div>

          {error && (
            <div className="md:col-span-2 text-red-600 text-sm">{error}</div>
          )}

          <div className="md:col-span-2 flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-300 text-gray-700">
              Cancel
            </button>
            <button type="submit" disabled={submitting} className="px-4 py-2 rounded bg-green-600 text-white disabled:opacity-60">
              {submitting ? (isEdit ? "Updating..." : "Saving...") : (isEdit ? "Update" : "Save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Input & Select components
const Input = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-green-200"
    />
  </div>
);

const Select = ({ label, options = [], placeholder, ...props }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      {...props}
      className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-green-200"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((op) => (
        <option key={op} value={op}>
          {op}
        </option>
      ))}
    </select>
  </div>
);
