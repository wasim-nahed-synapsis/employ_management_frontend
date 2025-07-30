import React from 'react';

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/login";
    };

    // Login howar por user name localStorage e thakbe
    const username = localStorage.getItem("username") || "Admin";

    return (
        <div className="w-full flex justify-between bg-gradient-to-r from-[#7f974f] to-[#a3bf63] px-6 py-3">
            {/* LEFT SIDE */}
            <div className="flex text-white items-center gap-6 ml-4">
                <h4 className="text-xl font-semibold tracking-wide">Employee MS</h4>
                <span className="text-lg pl-18">Welcome, {username}</span>

            </div>


            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4 mr-4 text-white">
                <button onClick={handleLogout} className="bg-[#5d7239] hover:bg-[#4e6130] px-4 py-2 rounded-md transition">
                    Logout
                </button>
            </div>
        </div>

    );
};

export default Header;
