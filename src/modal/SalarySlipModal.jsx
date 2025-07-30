import React from 'react';
import 'jspdf-autotable';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const SalarySlipModal = ({ slipData, onClose }) => {
    if (!slipData) return null;

    const handleDownloadPDF = () => {
        console.log("Generating PDF...");
        const doc = new jsPDF();
        doc.text("Salary Slip", 90, 20);
        const rows = [
            ["Employee ID", slipData.employeeId],
            ["Name", slipData.employeeName],
            ["Department", slipData.department],
            ["Month", slipData.month],
            ["Basic Salary", slipData.basicSalary],
            ["Allowances", slipData.allowances],
            ["Deductions", slipData.deductions],
            ["Net Amount", slipData.amount],
            ["Pay Date", new Date(slipData.payDate).toLocaleDateString()],
        ];
        autoTable(doc, {
            startY: 30,
            head: [["Field", "Value"]],
            body: rows,
        });
        doc.save(`${slipData.employeeName}-salary-slip.pdf`);
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
            <div className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 p-8 rounded-lg w-[70%] max-w-2xl max-h-[70vh] overflow-y-auto shadow-xl">
                <h3 className="text-2xl font-bold text-center mb-6">Salary Slip</h3>
                <div className="space-y-2 text-base">
                    <p><strong>Employee:</strong> {slipData.employeeName}</p>
                    <p><strong>Department:</strong> {slipData.department}</p>
                    <p><strong>Month:</strong> {slipData.month}</p>
                    <p><strong>Basic:</strong> ₹{slipData.basicSalary}</p>
                    <p><strong>Allowances:</strong> ₹{slipData.allowances}</p>
                    <p><strong>Deductions:</strong> ₹{slipData.deductions}</p>
                    <p><strong>Net:</strong> ₹{slipData.amount}</p>
                    <p><strong>Pay Date:</strong> {new Date(slipData.payDate).toLocaleDateString()}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={handleDownloadPDF}
                        className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalarySlipModal;
