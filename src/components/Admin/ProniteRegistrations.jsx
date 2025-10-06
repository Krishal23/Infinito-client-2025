import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import axiosInstance from "../../utils/axios.js";
import { FaDownload } from "react-icons/fa6";

const PAGE_SIZE = 5;

const ProniteRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReg, setSelectedReg] = useState(null);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const res = await axiosInstance.get("/pronite/all-pronite"); // Admin endpoint
        if (res.data.registrations) setRegistrations(res.data.registrations);
      } catch (error) {
        console.error("Error fetching pronite registrations:", error);
      }
    }
    fetchRegistrations();
  }, []);

  const filteredRegs = useMemo(() => {
    return registrations.filter(
      (reg) =>
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.userId?.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [registrations, searchTerm]);

  const paginatedRegs = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredRegs.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredRegs, currentPage]);

  const totalPages = Math.ceil(filteredRegs.length / PAGE_SIZE);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 text-sm w-full md:w-1/3 mb-2"
        />
      </div>

      <Card className="shadow-lg bg-white/80">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Pronite Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Payment Proof</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount Paid</TableHead>
                <TableHead>Registered On</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRegs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="9" className="text-center py-12">
                    No registrations found
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRegs.map((reg) => (
                  <TableRow
                    key={reg._id}
                    onClick={() => setSelectedReg(reg)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <TableCell>
                      {reg.paymentProof ? (
                        <a
                          href={reg.paymentProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          <FaDownload />
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>{reg.name}</TableCell>
                    <TableCell>{reg.userId?.email}</TableCell>
                    <TableCell>{reg.phone}</TableCell>
                    <TableCell>{reg.collegeName || "N/A"}</TableCell>
                    <TableCell>{reg.address}</TableCell>
                    <TableCell>{reg.transactionId}</TableCell>
                    <TableCell>₹{reg.amountPaid}</TableCell>
                    <TableCell>{new Date(reg.registrationDate).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span className="px-3 py-1">
                {currentPage} / {totalPages}
              </span>
              <Button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-4/5 max-h-[80vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Pronite Registration Details</h2>
            <p>
              <strong>Name:</strong> {selectedReg.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedReg.userId?.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedReg.phone}
            </p>
            <p>
              <strong>College:</strong> {selectedReg.collegeName || "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {selectedReg.address}
            </p>
            <p>
              <strong>Transaction ID:</strong> {selectedReg.transactionId}
            </p>
            <p>
              <strong>Amount Paid:</strong> ₹{selectedReg.amountPaid}
            </p>
            <p>
              <strong>Registered On:</strong>{" "}
              {new Date(selectedReg.registrationDate).toLocaleString()}
            </p>
            <p>
              <strong>Payment Proof:</strong>{" "}
              <a
                href={selectedReg.paymentProof}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <FaDownload />
              </a>
            </p>
            <div className="flex justify-end mt-4">
              <Button onClick={() => setSelectedReg(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProniteRegistrations;
