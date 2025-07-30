import React from 'react'
import { NavLink } from "react-router-dom";

const Sidebar = () => {

const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Employees", path: "/employees" },
    { name: "Departments", path: "/departments" },
    { name: "Leaves", path: "/leaves" },
    { name: "Salary", path: "/salary" },
    { name: "Attendance", path: "/attendance" },
    { name: "DocumentUpload", path: "/documentUpload" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-60 h-screen bg-gray-900 text-white flex flex-col p-4 space-y-4">
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded hover:bg-teal-700 ${
              isActive ? "bg-teal-700" : ""
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </aside>
  )
}

export default Sidebar