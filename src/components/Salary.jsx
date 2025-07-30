import React, { useState, useEffect } from "react";
import axios from "axios";
import AddNewSalaryModal from "../modal/AddNewSalaryModal";
import SalarySlipModal from "../modal/SalarySlipModal";

const Salary = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchAllSalaries();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (employeeId.trim()) {
        handleSearch();
      } else {
        fetchAllSalaries();
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [employeeId]);

  const fetchAllSalaries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/salary");
      setSalaryData(res.data.salaries || []);
      setCurrentPage(1);
    } catch (err) {
      console.error("Error fetching all salaries:", err);
      setSalaryData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/salary/history/${employeeId}`);
      if (Array.isArray(res.data.history)) {
        setSalaryData(res.data.history);
        setCurrentPage(1);
      } else {
        setSalaryData([]);
      }
    } catch (err) {
      console.error("Error searching salary by employeeId:", err);
      setSalaryData([]);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentEmployees = salaryData.slice(startIndex, startIndex + rowsPerPage);
  const totalPages = Math.ceil(salaryData.length / rowsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Salary</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Salary
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Employee ID"
          className="p-2 border rounded w-64"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-600">
            <tr>
              <th className="p-3 text-left">Sl No</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Employee ID</th>
              <th className="p-3 text-left">Employee Name</th>
              <th className="p-3 text-left">Basic Salary</th>
              <th className="p-3 text-left">Allowances</th>
              <th className="p-3 text-left">Deduction</th>
              <th className="p-3 text-left">Pay Date</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="p-4 text-center" colSpan={9}>Loading...</td>
              </tr>
            ) : currentEmployees.length > 0 ? (
              currentEmployees.map((item, index) => (
                <tr key={item._id || index} className="border-b hover:bg-gray-50">
                  <td className="p-3">{startIndex + index + 1}</td>
                  <td className="p-3">{item.department}</td>
                  <td className="p-3">{item.employeeId}</td>
                  <td className="p-3">{item.employeeName}</td>
                  <td className="p-3">{item.basicSalary}</td>
                  <td className="p-3">{item.allowances}</td>
                  <td className="p-3">{item.deductions}</td>
                  <td className="p-3">
                    {item.payDate ? new Date(item.payDate).toLocaleDateString() : "N/A"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedSlip(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      View Slip
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center text-gray-500" colSpan={9}>
                  No salary data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>
          Showing {currentEmployees.length ? startIndex + 1 : 0}–
          {Math.min(startIndex + rowsPerPage, salaryData.length)} of {salaryData.length}
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

      {/* Modal Render */}
      {showModal && (
        <AddNewSalaryModal
          onClose={() => setShowModal(false)}
          onSuccess={fetchAllSalaries}
        />
      )}
      {selectedSlip && (
        <SalarySlipModal
          slipData={selectedSlip}
          onClose={() => setSelectedSlip(null)}
        />
      )}
    </div>
  );
};

export default Salary;
