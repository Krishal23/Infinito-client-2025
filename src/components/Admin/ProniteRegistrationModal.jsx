import React from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaGraduationCap, FaCalendar, FaDownload } from 'react-icons/fa';

const ProniteRegistrationModal = ({ isOpen, onClose, data,email }) => {
  if (!isOpen || !data) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    return new Date(dateString).toLocaleString("en-GB", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Pronite Registration</h2>
            <p className="text-sm text-gray-600 mt-1">ID: {data._id?.slice(0, 8)}...</p>
            {data.paymentProof && (
              <div className='flex items-center gap-2 mt-2'>
                <span className="font-medium">Payment Proof:</span>
                <a href={data.paymentProof} target="_blank" rel="noreferrer" className="px-2 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <FaDownload />
                </a>
              </div>
            )}
          </div>
          <div onClick={onClose} className="text-gray-500 max-w-10 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <FaTimes className="w-5 h-5" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {/* Personal Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaUser className="text-blue-600" /> Participant Information
            </h4>
            <div className="text-sm space-y-2">
              <div><span className="font-medium">Name:</span> {data.name}</div>
              <div><span className="font-medium">Email:</span> {email}</div>
              <div><span className="font-medium">Phone:</span> {data.phone}</div>
              <div><span className="font-medium">Aadhaar:</span> {data.adhaar}</div>
            </div>
          </div>

          {/* College Info */}
          <div className="bg-green-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaGraduationCap className="text-green-600" /> College Information
            </h4>
            <div className="text-sm space-y-2">
              <div><span className="font-medium">College:</span> {data.collegeName || "—"}</div>
              <div><span className="font-medium">Address:</span> {data.address || "—"}</div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <FaIdCard className="text-yellow-600" /> Payment Information
            </h4>
            <div className="text-sm space-y-2">
              <div><span className="font-medium">Transaction ID:</span> {data.transactionId}</div>
              <div><span className="font-medium">Amount Paid:</span> ₹{data.amountPaid}</div>
              <div><span className="font-medium">Registration Date:</span> {formatDate(data.registrationDate)}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-2xl flex justify-end">
          <button onClick={onClose} className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProniteRegistrationModal;
