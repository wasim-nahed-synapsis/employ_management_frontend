import React, { useState, useEffect } from "react";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    employeeId: "",
    name: "",
    reason: "",
    description: "",
    department: "",
    days: "",
    fromDate: "",
    toDate: "",
  });

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const leavesPerPage = 4;

  useEffect(() => {
    fetchLeaves();
  }, []);

  useEffect(() => {
    filterLeaves();
  }, [searchTerm, leaves]);

  const fetchLeaves = async () => {
    try {
      const res = await fetch("http://localhost:3000/leaves");
      const data = await res.json();
      if (data.leaves) {
        setLeaves(data.leaves);
      }
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const filterLeaves = () => {
    const filtered = leaves.filter(
      (leave) =>
        leave.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLeaves(filtered);
    setCurrentPage(1);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/leaves/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Leave applied successfully!");
        setShowModal(false);
        setForm({
          employeeId: "",
          name: "",
          reason: "",
          description: "",
          department: "",
          days: "",
          fromDate: "",
          toDate: "",
        });
        fetchLeaves();
      } else {
        alert("Failed to apply leave.");
      }
    } catch (error) {
      console.error("Apply failed:", error);
    }
  };

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : "";

  // Pagination logic
  const totalPages = Math.ceil(filteredLeaves.length / leavesPerPage);
  const startIndex = (currentPage - 1) * leavesPerPage;
  const endIndex = startIndex + leavesPerPage;
  const currentLeaves = filteredLeaves.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Manage Leaves</h2>

      {/* Search + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by name or status"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/3"
        />
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Add Leave
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="p-3 text-left">S No</th>
              <th className="p-3 text-left">Employee ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">From</th>
              <th className="p-3 text-left">To</th>
              <th className="p-3 text-left">Days</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentLeaves.length > 0 ? (
              currentLeaves.map((leave, index) => (
                <tr key={leave._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{startIndex + index + 1}</td>
                  <td className="p-3">{leave.employeeId}</td>
                  <td className="p-3">{leave.name}</td>
                  <td className="p-3">{leave.department}</td>
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3">{formatDate(leave.fromDate)}</td>
                  <td className="p-3">{formatDate(leave.toDate)}</td>
                  <td className="p-3">{leave.days}</td>
                  <td className="p-3">{leave.description}</td>
                  <td className="p-3 capitalize">{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 p-4">
                  No leave records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {filteredLeaves.length ? startIndex + 1 : 0}–
          {Math.min(endIndex, filteredLeaves.length)} of {filteredLeaves.length}
        </span>
        <div className="space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &#60;
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            &#62;
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-[480px] relative shadow-lg bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300">
            <h3 className="text-xl font-semibold mb-4 text-center">Apply for Leave</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                className="w-full border border-pink-300 p-2 rounded"
                placeholder="Employee ID"
                required
              />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-pink-300 p-2 rounded"
                placeholder="Employee Name"
                required
              />
              <input
                type="text"
                name="department"
                value={form.department}
                onChange={handleChange}
                className="w-full border border-pink-300 p-2 rounded"
                placeholder="Department"
                required
              />
              <label className="block mb-1 font-medium">Leave Type / Reason</label>
              <select
                name="reason"
                value={form.reason}
                onChange={handleChange}
                className="w-full border border-pink-300 p-2 rounded"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Marriage Leave">Marriage Leave</option>
                <option value="Emergency Leave">Emergency Leave</option>
              </select>
              <div className="flex gap-4">
                <input
                  type="date"
                  name="fromDate"
                  value={form.fromDate}
                  onChange={handleChange}
                  className="w-full border border-pink-300 p-2 rounded"
                  required
                />
                <input
                  type="date"
                  name="toDate"
                  value={form.toDate}
                  onChange={handleChange}
                  className="w-full border border-pink-300 p-2 rounded"
                  required
                />
              </div>
              <input
                type="number"
                name="days"
                value={form.days}
                onChange={handleChange}
                className="w-full border border-pink-300 p-2 rounded"
                placeholder="Number of Days"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-pink-300 p-2 rounded"
                placeholder="Additional Description"
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
              >
                Apply Leave
              </button>
            </form>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
