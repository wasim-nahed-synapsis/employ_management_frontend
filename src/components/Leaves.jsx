import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/leaves';

const Leaves = () => {
  const [leavesData, setLeavesData] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLeave, setSelectedLeave] = useState(null); // for modal
  const rowsPerPage = 5;

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setLeavesData(json.leaves || []);
    } catch (err) {
      console.error('Error fetching leaves:', err);
    }
  };

  const filteredLeaves = leavesData.filter((leave) => {
    const statusMatch =
      filterStatus === 'all' || leave.status.toLowerCase() === filterStatus;
    const searchMatch = leave.employeeId
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return statusMatch && searchMatch;
  });

  const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentLeaves = filteredLeaves.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const endpoint =
        status === 'approved'
          ? `${API_URL}/${id}/approve`
          : `${API_URL}/${id}/reject`;

      await fetch(endpoint, {
        method: 'PUT',
      });

      setSelectedLeave(null);
      fetchLeaves(); // Refresh data
    } catch (error) {
      console.error('Status update failed', error);
    }
  };


  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Manage Leaves</h2>

      {/* Search & Filter */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Emp ID"
          className="p-2 border border-gray-300 rounded w-1/3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="space-x-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilterStatus(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded ${filterStatus === status
                ? 'bg-green-700 text-white'
                : 'bg-green-500 text-white'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="p-3 text-left">S No</th>
              <th className="p-3 text-left">Emp ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Reason</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Days</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentLeaves.length ? (
              currentLeaves.map((leave, index) => (
                <tr key={leave._id} className="border-b hover:bg-gray-100">
                  <td className="p-3">{startIndex + index + 1}</td>
                  <td className="p-3">{leave.employeeId}</td>
                  <td className="p-3 capitalize">{leave.name}</td>
                  <td className="p-3">{leave.reason}</td>
                  <td className="p-3">{leave.department}</td>
                  <td className="p-3">{leave.days}</td>
                  <td className="p-3 capitalize">{leave.status}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedLeave(leave)}
                      className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 p-4">
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
      {selectedLeave && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 ">
          <div className="bg-white p-6 rounded w-[400px] bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300">
            <h3 className="text-lg font-bold mb-4 text-center">Leave Details</h3>
            <div className="flex justify-center mb-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="user"
                className="w-24 h-24 rounded-full border"
              />
            </div>
            <p><strong>Name:</strong> {selectedLeave.name}</p>
            <p><strong>Employee ID:</strong> {selectedLeave.employeeId}</p>
            <p><strong>Leave Type:</strong> {selectedLeave.leaveType || 'N/A'}</p>
            <p><strong>Reason:</strong> {selectedLeave.reason}</p>
            <p><strong>Department:</strong> {selectedLeave.department}</p>
            <p><strong>Start Date:</strong> {selectedLeave.fromDate?.split('T')[0]}</p>
            <p><strong>End Date:</strong> {selectedLeave.toDate?.split('T')[0]}</p>

            <div className="mt-4 flex justify-between ">
              {selectedLeave.status !== 'rejected' && (
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleStatusUpdate(selectedLeave._id, 'approved')}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedLeave._id, 'rejected')}
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
              <button
                onClick={() => setSelectedLeave(null)}
                className="ml-auto text-black underline "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaves;
