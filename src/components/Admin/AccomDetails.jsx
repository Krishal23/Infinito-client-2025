import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import axiosInstance from "../../utils/axios.js";

const PAGE_SIZE = 5;

const AccommodationDetails = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);

  useEffect(() => {
    async function fetchAccommodations() {
      try {
        const res = await axiosInstance.get("/accommodation");
        if (res.data.accommodations) {
          setAccommodations(res.data.accommodations);
        }
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    }
    fetchAccommodations();
  }, []);

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter(acc => {
      return acc.players.some(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [accommodations, searchTerm]);

  const paginatedAccommodations = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredAccommodations.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredAccommodations, currentPage]);

  const totalPages = Math.ceil(filteredAccommodations.length / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search by player name or email..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="border rounded px-3 py-2 text-sm w-full md:w-1/3 mb-2"
        />
      </div>

      {/* Accommodation Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Accommodation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Player Names</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Check-In</TableHead>
                <TableHead>Check-Out</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAccommodations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="8" className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="text-6xl">🏨</div>
                      <h3 className="text-lg font-semibold text-gray-700">No Accommodations Found</h3>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedAccommodations.map(acc => (
                  <TableRow key={acc._id} onClick={() => setSelectedAccommodation(acc)} className="hover:bg-gray-50 cursor-pointer">
                    <TableCell>{acc.transactionId.slice(0, 8)}...</TableCell>
                    <TableCell>{acc.players.map(p => p.name).join(", ")}</TableCell>
                    <TableCell>{acc.genderCategory}</TableCell>
                    <TableCell>{new Date(acc.checkInDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(acc.checkOutDate).toLocaleDateString()}</TableCell>
                    <TableCell>{acc.totalAmount}</TableCell>
                    <TableCell>{acc.status}</TableCell>
                    <TableCell>
                      <Button size="sm" onClick={() => setSelectedAccommodation(acc)}>View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <Button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</Button>
              <span className="px-3 py-1">{currentPage} / {totalPages}</span>
              <Button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Accommodation Modal */}
      {selectedAccommodation && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-4/5 max-h-[80vh] overflow-y-auto shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Accommodation Details</h2>
      
      <div className="mb-4">
        <p><strong>Transaction ID:</strong> {selectedAccommodation.transactionId}</p>
        <p><strong>Gender:</strong> {selectedAccommodation.genderCategory}</p>
        <p><strong>Check-In:</strong> {new Date(selectedAccommodation.checkInDate).toLocaleDateString()}</p>
        <p><strong>Check-Out:</strong> {new Date(selectedAccommodation.checkOutDate).toLocaleDateString()}</p>
        <p><strong>Total Amount:</strong> ₹{selectedAccommodation.totalAmount}</p>
        <p><strong>Status:</strong> {selectedAccommodation.status}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Players</h3>
      <table className="w-full border-collapse border mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Phone</th>
            {/* <th className="border p-2 text-left">Roll No</th> */}
            <th className="border p-2 text-left">Aadhar</th>
            {/* <th className="border p-2 text-left">Room Type</th> */}
            {/* <th className="border p-2 text-left">Fee</th> */}
          </tr>
        </thead>
        <tbody>
          {selectedAccommodation.players.map((player, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border p-2">{player.name}</td>
              <td className="border p-2">{player.email}</td>
              <td className="border p-2">{player.phoneNumber}</td>
              {/* <td className="border p-2">{player.rollNo}</td> */}
              <td className="border p-2">{player.aadharId}</td>
              {/* <td className="border p-2">{player.roomType || "-"}</td> */}
              {/* <td className="border p-2">₹{player.fee || "-"}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end">
        <Button onClick={() => setSelectedAccommodation(null)}>Close</Button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AccommodationDetails;
