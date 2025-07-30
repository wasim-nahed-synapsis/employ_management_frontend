import React, { useState } from "react";

const AddDepartmentModal = ({ open, onClose, onAdded }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!name || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        throw new Error("Failed to add department");
      }

      setName("");
      setDescription("");
      onAdded();  // callback to refresh list
      onClose();  // close modal
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Department</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium">Department Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HR, Sales, Admin"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="w-full border p-2 rounded mt-1"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write description..."
          ></textarea>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Add Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDepartmentModal;
