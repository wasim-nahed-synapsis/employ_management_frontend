import React, { useEffect, useState } from 'react';
import DepartmentModal from '../modal/DepartmentModal';

const API_URL = 'http://localhost:3000/roles';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    setDepartments(json.roles || []);
  };

  const handleAddOrUpdate = async (data) => {
    if (editData) {
      await fetch(`${API_URL}/${editData._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    fetchDepartments();
    setOpenModal(false);
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchDepartments();
    }
  };

  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDepartments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentDepartments = filteredDepartments.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Departments</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setOpenModal(true);
            setEditData(null);
          }}
        >
          Add New Department
        </button>
      </div>

      <input
        type="text"
        placeholder="Search By Department Name"
        className="mb-4 p-2 border border-gray-300 rounded w-1/3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="p-3 text-left">S No</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentDepartments.map((dep, index) => (
              <tr key={dep._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{startIndex + index + 1}</td>
                <td className="p-3 capitalize">{dep.name}</td>
                <td className="p-3">{dep.description}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => {
                      setEditData(dep);
                      setOpenModal(true);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(dep._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Rows per page: {rowsPerPage}</span>
        <span>
          {startIndex + 1}–{Math.min(startIndex + rowsPerPage, filteredDepartments.length)} of {filteredDepartments.length}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &#60;
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &#62;
          </button>
        </div>
      </div>

      <DepartmentModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
        }}
        onSubmit={handleAddOrUpdate}
        editData={editData}
      />
    </div>
  );
};

export default Departments;
