// src/modal/ViewEmployeeModal.jsx
import React from "react";

export default function ViewEmployeeModal({ open, onClose, employee }) {
  if (!open || !employee) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50">
      <div className="bg-gradient-to-br from-sky-100 via-blue-100 to-yellow-100 w-full max-w-2xl h-auto rounded shadow-lg overflow-hidden">
        
        {/* Header with sky bg and black ❌ */}
        <div className="flex justify-between items-center px-6 py-4 border-b bg-sky-300 relative">
          <h2 className="text-lg font-semibold text-center w-full text-white">
            Employee Details
          </h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-700 absolute top-4 right-4 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-8 text-gray-700 flex flex-col">
          <div className="flex items-center gap-10">
            {/* Image */}
            <img
              src={
                employee.image?.startsWith("http")
                  ? employee.image
                  : `http://localhost:3000/${employee.image}`
              }
              alt={employee.name}
              className="w-40 h-40 rounded-full border object-cover"
            />

            {/* Details */}
            <div className="space-y-3 text-left text-base">
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Employee ID:</strong> {employee.employeeId}</p>
              <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
              <p><strong>Gender:</strong> {employee.gender}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Marital Status:</strong> {employee.maritalStatus}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
