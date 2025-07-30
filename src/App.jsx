import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Departments from "./components/Departments";
import Leaves from "./components/Leaves";
import Salary from "./components/Salary";
import Settings from "./components/Settings";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Attendance from "./components/Attendance";
import DocumentUpload from "./components/DocumentUpload";

function App() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (location.pathname === "/login") {
    return <Login />;
  }

  return isAuthenticated ? (
    <div className="h-screen overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 h-16 z-50 bg-white shadow">
        <Header />
      </div>

      <div className="flex pt-16 h-full">
        {/* Fixed Sidebar */}
        <div className="fixed top-16 left-0 bottom-0 w-64 z-40 bg-white shadow">
          <Sidebar />
        </div>

        {/* Scrollable Main Content */}
        <main className="ml-64 pt-0 p-6 overflow-y-auto h-[calc(100vh-4rem)] w-full bg-gray-100">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/leaves" element={<Leaves />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/documentUpload" element={<DocumentUpload />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;
