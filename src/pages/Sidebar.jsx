import React from 'react';
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaPlaneDeparture,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaFileAlt,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const role = localStorage.getItem("userRole"); // 'admin' or 'user'

  const menuItems = [];

  // ✅ Common item
  menuItems.push({
    name: "Dashboard",
    path: "/dashboard",
    icon: <FaTachometerAlt />,
  });

  if (role === "admin") {
    // ✅ Admin-specific
    menuItems.push(
      { name: "Employees", path: "/employees", icon: <FaUsers /> },
      { name: "Departments", path: "/departments", icon: <FaBuilding /> },
      { name: "Leaves", path: "/leaves", icon: <FaPlaneDeparture /> } // 👈 plural for admin
    );
  }

  if (role === "user") {
    // ✅ User-specific
    menuItems.push(
      { name: "My Profile", path: "/myprofile", icon: <FaUserCircle /> },
      { name: "Leave", path: "/leave", icon: <FaPlaneDeparture /> } // 👈 singular for user
    );
  }

  // ✅ Common for both
  menuItems.push(
    { name: "Salary", path: "/salary", icon: <FaMoneyBillWave /> },
    { name: "Settings", path: "/settings", icon: <FaCog /> }
  );

  return (
    <aside className="w-60 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-2">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded hover:bg-teal-700 transition ${
              isActive ? "bg-teal-700" : ""
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.name}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
