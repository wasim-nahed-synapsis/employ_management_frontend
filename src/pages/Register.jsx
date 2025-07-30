export default function Register() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Admin Registration</h2>
        <input type="text" placeholder="Name" className="w-full mb-3 p-2 border" />
        <input type="email" placeholder="Email" className="w-full mb-3 p-2 border" />
        <input type="password" placeholder="Password" className="w-full mb-3 p-2 border" />
        <button className="bg-teal-600 text-white px-4 py-2 w-full rounded hover:bg-teal-700">
          Register
        </button>
      </form>
    </div>
  );
}
