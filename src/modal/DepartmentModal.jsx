import React, { useEffect, useState } from 'react';

const DepartmentModal = ({ open, onClose, onSubmit, editData }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editData) {
      setName(editData.name || '');
      setDescription(editData.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [editData]);

  const handleSubmit = () => {
    if (!name.trim()) return alert('Department name is required');
    onSubmit({ name, description });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center">
      <div className="bg-white bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300
 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">{editData ? 'Edit' : 'Add New'} Department</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Department Name"
          className="w-full border p-2 mb-3 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 mb-4 rounded"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-green-600 text-white px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
            {editData ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentModal;
