import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUsers,
  FaBuilding,
  FaMoneyBillWave,
  FaFileAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);
  const [leaveAppliedCount, setLeaveAppliedCount] = useState(0);
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [approvedLeaveCount, setApprovedLeaveCount] = useState(0);
  const [rejectedLeaveCount, setRejectedLeaveCount] = useState(0);

  // 🧑‍💼 Total Employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3000/employees");
        setEmployeeCount(response.data.employees.length);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);

  // 🏢 Total Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/roles");
        setDepartmentCount(response.data.roles.length);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  // 📄 Leave Applied & Pending
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:3000/leaves");
        setLeaveAppliedCount(response.data.totalEmployeesAppliedLeave);

        const pending = response.data.leaves.filter(
          (leave) => leave.status === "pending"
        );
        setPendingLeaveCount(pending.length);
      } catch (error) {
        console.error("Error fetching leaves:", error);
      }
    };
    fetchLeaves();
  }, []);

  // ✅ Approved Leaves
  useEffect(() => {
    const fetchApprovedLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:3000/leaves");
        const approved = response.data.leaves.filter(
          (leave) => leave.status === "approved"
        );
        setApprovedLeaveCount(approved.length);
      } catch (error) {
        console.error("Error fetching approved leaves:", error);
      }
    };
    fetchApprovedLeaves();
  }, []);

  // ❌ Rejected Leaves
  useEffect(() => {
    const fetchRejectedLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:3000/leaves");
        const rejected = response.data.leaves.filter(
          (leave) => leave.status === "rejected"
        );
        setRejectedLeaveCount(rejected.length);
      } catch (error) {
        console.error("Error fetching rejected leaves:", error);
      }
    };
    fetchRejectedLeaves();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center bg-green-600 text-white p-4 rounded shadow">
          <FaUsers className="text-3xl mr-4" />
          <div>
            <p className="text-sm">Total Employees</p>
            <p className="text-xl font-bold">{employeeCount}</p>
          </div>
        </div>

        <div className="flex items-center bg-yellow-500 text-white p-4 rounded shadow">
          <FaBuilding className="text-3xl mr-4" />
          <div>
            <p className="text-sm">Total Departments</p>
            <p className="text-xl font-bold">{departmentCount}</p>
          </div>
        </div>

        <div className="flex items-center bg-red-500 text-white p-4 rounded shadow">
          <FaMoneyBillWave className="text-3xl mr-4" />
          <div>
            <p className="text-sm">Monthly Pay</p>
            <p className="text-xl font-bold">$1900</p>
          </div>
        </div>
      </div>

      {/* Leave Details */}
      <h3 className="text-xl font-semibold mb-3">Leave Details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow border-l-4 border-gray-600">
          <div className="flex items-center mb-2">
            <FaFileAlt className="text-gray-600 mr-5" />
            <p className="text-sm">Leave Applied</p>
          </div>
          <p className="text-2xl font-bold">{leaveAppliedCount}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-green-600">
          <div className="flex items-center mb-2">
            <FaCheckCircle className="text-green-600 mr-2" />
            <p className="text-sm">Leave Approved</p>
          </div>
          <p className="text-2xl font-bold">{approvedLeaveCount}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-600">
          <div className="flex items-center mb-2">
            <FaHourglassHalf className="text-yellow-600 mr-2" />
            <p className="text-sm">Leave Pending</p>
          </div>
          <p className="text-2xl font-bold">{pendingLeaveCount}</p>
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-red-600">
          <div className="flex items-center mb-2">
            <FaTimesCircle className="text-red-600 mr-2" />
            <p className="text-sm">Leave Rejected</p>
          </div>
          <p className="text-2xl font-bold">{rejectedLeaveCount}</p>
        </div>
      </div>
      {/* Leave Stats Pie Chart */}
      <h3 className="text-xl font-semibold mt-8 mb-3">Leave Summary Chart</h3>
      <div className="flex justify-center bg-white p-6 rounded shadow">
        <PieChart width={400} height={300}>
          <Pie
            data={[
              { name: "Applied", value: leaveAppliedCount },
              { name: "Approved", value: approvedLeaveCount },
              { name: "Pending", value: pendingLeaveCount },
              { name: "Rejected", value: rejectedLeaveCount },
            ]}
            cx="50%"
            cy="50%"
            label
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell fill="#6366F1" /> 
            <Cell fill="#10B981" /> 
            <Cell fill="#F59E0B" /> 
            <Cell fill="#EF4444" /> 
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
