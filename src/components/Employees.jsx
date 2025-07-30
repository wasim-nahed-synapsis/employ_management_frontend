import React, { useEffect, useState } from "react";
import AddEmployeeModal from "../modal/AddEmployeeModal";
import ViewEmployeeModal from "../modal/ViewEmployeeModal";


const API_URL = "http://localhost:3000/employees";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    const data = json.employees || [];
    setEmployees(data);
    setFiltered(data);
  };

  useEffect(() => {
    const f = employees.filter((e) =>
      e.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(f);
    setCurrentPage(1);
  }, [search, employees]);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete employee");

      alert("Employee deleted successfully!");
      fetchList();
    } catch (error) {
      alert("Error deleting employee: " + error.message);
    }
  };

  const totalPages = Math.ceil(filtered.length / rowsPerPage) || 1;
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEmployees = filtered.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Employees</h2>
        <button
          onClick={() => {
            setSelectedEmployee(null);
            setOpenAdd(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Employee
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name"
        className="p-2 border rounded mb-4 w-64"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 text-gray-600 text-left">
            <tr>
              <th className="p-3">Sl No</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">DOB</th>
              <th className="p-3">Department</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length ? (
              currentEmployees.map((emp, i) => (
                <tr key={emp._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{startIndex + i + 1}</td>
                  <td className="p-3">
                    <img
                      src={
                        emp.image?.startsWith("http")
                          ? emp.image
                          : `http://localhost:3000/${emp.image}`
                      }
                      alt={emp.name}
                      className="w-10 h-10 rounded-full border object-cover"
                    />
                  </td>
                  <td className="p-3 capitalize">{emp.name}</td>
                  <td className="p-3">{emp.dob}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => setViewEmployee(emp)}
                    >
                      View
                    </button>

                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        setSelectedEmployee(emp);
                        setOpenAdd(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                      onClick={() => deleteEmployee(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={6}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {currentEmployees.length ? startIndex + 1 : 0}–{Math.min(startIndex + rowsPerPage, filtered.length)} of {filtered.length}
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

      {/* Modal */}
      <AddEmployeeModal
        open={openAdd}
        onClose={() => {
          setOpenAdd(false);
          setSelectedEmployee(null);
        }}
        employee={selectedEmployee}
        onCreated={() => {
          setOpenAdd(false);
          setSelectedEmployee(null);
          fetchList();
        }}
      />

      <ViewEmployeeModal
        open={!!viewEmployee}
        employee={viewEmployee}
        onClose={() => setViewEmployee(null)}
      />



    </div>
  );
};

export default Employees;
