"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FaFileDownload } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";


export default function UniversalTableEvents({ data, title }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");

  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">No registrations found</p>;
  }

  const handleDownload = (row) => {
    const blob = new Blob([JSON.stringify(row, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `registration_${row.userId?._id || Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter by email
  const filteredData = data.filter((row) =>
    (row.userId?.email ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Card className="shadow-xl rounded-2xl">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl text-indigo-700 font-bold">
            {title || "Registrations"}
          </CardTitle>
          <input
            type="text"
            placeholder="Search by email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-2 py-1 text-xs sm:text-sm w-full sm:w-64"
          />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px] sm:min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-xs sm:text-sm">User ID</TableHead>
                  <TableHead className="text-xs sm:text-sm">Username</TableHead>
                  <TableHead className="text-xs sm:text-sm">Full Name</TableHead>
                  <TableHead className="text-xs sm:text-sm">Email</TableHead>
                  <TableHead className="text-xs sm:text-sm">Transaction Status</TableHead>
                  <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((row, idx) => {
                  const user = row.userId || {};
                  return (
                    <TableRow
                      key={idx}
                      className="hover:bg-indigo-50 cursor-pointer"
                      onClick={() => setSelectedRow(row)}
                    >
                      <TableCell className="text-xs sm:text-sm">{user._id ?? "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{user.username ?? "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{user.fullname ?? "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{user.email ?? "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm">{row.paymentStatus ?? "-"}</TableCell>
                      <TableCell className="text-xs sm:text-sm flex space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent opening modal
                            handleDownload(row);
                          }}
                        >
                          <FaFileDownload size={20} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal for JSON details */}
      {selectedRow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-indigo-700">
                Registration Details
              </h2>
              <div
                size="sm"
                variant="outline"
                onClick={() => setSelectedRow(null)}
              >
                <IoCloseCircle  size={30}/>
              </div>
            </div>
            <pre className="text-xs sm:text-sm whitespace-pre-wrap">
              {JSON.stringify(selectedRow, null, 2)}
            </pre>
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDownload(selectedRow)}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
