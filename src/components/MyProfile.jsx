import { useEffect, useState } from "react";

export default function MyProfile() {
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login first.");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3000/employees", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => {
        setEmployee(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white rounded shadow-lg p-8 w-full max-w-4xl flex items-center space-x-10">
        {/* Profile Image */}
        <div>
          <img
            src={employee.image || "https://via.placeholder.com/150"}
            alt={employee.name}
            className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-gray-300"
          />
        </div>

        {/* Profile Details */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Employee Details</h2>
          <p className="mb-2 text-lg"><strong>Name:</strong> {employee.name}</p>
          <p className="mb-2 text-lg"><strong>Employee ID:</strong> {employee.employeeId}</p>
          <p className="mb-2 text-lg"><strong>Date of Birth:</strong> {employee.dob}</p>
          <p className="mb-2 text-lg"><strong>Gender:</strong> {employee.gender}</p>
          <p className="mb-2 text-lg"><strong>Department:</strong> {employee.department}</p>
          <p className="mb-2 text-lg"><strong>Marital Status:</strong> {employee.maritalStatus}</p>
        </div>
      </div>
    </div>
  );
}
