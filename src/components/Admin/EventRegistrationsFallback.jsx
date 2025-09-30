import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button"; // Assuming Input can be used
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import RegistrationDetailsModal from "./RegistrationDetailsModal";
import axiosInstance from "../../utils/axios.js";

const sportsList = [
  "athletics", "badminton", "basketball", "cricket", "football",
  "kabaddi", "lawn_tennis", "squash", "table_tennis", "volleyball",
  "weight_lifting", "power_lifting", "chess", "bgmi", "freefire",
  "codm", "valorant", "clash_royale"
];

const PAGE_SIZE = 5;

const EventRegistrations = ({ eventType = "football", onSportChange }) => {
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [selectedSport, setSelectedSport] = useState(eventType);
  const [registrations, setRegistrations] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        const res = await axiosInstance.get("/events/all-registrations");
        if (res.data.success) {
          setRegistrations(res.data.registrations);
        }
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching registrations:", error);
      }
    }
    fetchRegistrations();
  }, []);

  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    setCurrentPage(1);
    setSearchTerm("");
    if (onSportChange) onSportChange(sport);
  };

  const currentRegistrations = registrations[selectedSport] || [];

  // Filtered by search term
  const filteredRegistrations = useMemo(() => {
    return currentRegistrations.filter(reg => {
      const name = reg.userId?.username || reg.captain?.fullname || reg.lead?.fullname || "";
      const college = reg.collegeName || "";
      const email = reg.userId?.email || "";
      return (
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [currentRegistrations, searchTerm]);

  // Pagination
  const paginatedRegistrations = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredRegistrations.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredRegistrations, currentPage]);

  const totalPages = Math.ceil(filteredRegistrations.length / PAGE_SIZE);

  const totalParticipants = currentRegistrations.reduce((acc, reg) => {
    let count = 0;
    if (reg.captain) count += 1;
    if (reg.viceCaptain) count += 1;
    if (reg.players) count += reg.players.length;
    if (reg.substitutes) count += reg.substitutes.length;
    if (reg.lead) count += 1;
    if (reg.relayTeams) reg.relayTeams.forEach(team => count += team.members.length);
    return acc + count;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Sport Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sportsList.map((sport) => (
          <button
            key={sport}
            onClick={() => handleSportSelect(sport)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold shadow-md transition-all duration-200
              ${selectedSport === sport
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105"
                : "bg-gray-100 hover:bg-indigo-100 text-gray-700"
              }`}
          >
            {sport.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold">🏆 {selectedSport.replace("_", " ").toUpperCase()} Registrations</h2>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{currentRegistrations.length}</div>
            <div className="text-sm font-medium text-green-600">Total Registrations</div>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{currentRegistrations.filter(r => r.paymentStatus === "paid").length}</div>
            <div className="text-sm font-medium text-blue-600">Paid Registrations</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">{totalParticipants}</div>
            <div className="text-sm font-medium text-purple-600">Total Participants</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search by name or college..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="border rounded px-3 py-2 text-sm w-full md:w-1/3 mb-2"
        />
      </div>

      {/* Registrations Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">Registration Details</CardTitle>
          <p className="text-sm text-gray-600">Click on any registration to view full details</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>Registration ID</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>College Name</TableHead>
                <TableHead>Team Size</TableHead>
                <TableHead>Registration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedRegistrations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan="7" className="text-center py-12">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="text-6xl">📝</div>
                      <h3 className="text-lg font-semibold text-gray-700">No Registrations Found</h3>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedRegistrations.map((reg) => {
                  const teamSize = (reg.players?.length || 0) + (reg.substitutes?.length || 0) + (reg.captain ? 1 : 0) + (reg.viceCaptain ? 1 : 0) + (reg.lead ? 1 : 0);
                  return (
                    <TableRow
                      key={reg.eventId}
                      onClick={() => setSelectedRegistration(reg)}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <TableCell>{reg.eventId.slice(0, 8)}...</TableCell>
                      <TableCell>{reg.user?.username || "N/A"}</TableCell>
                      <TableCell>{reg.user?.email || "N/A"}</TableCell>
                      <TableCell>{reg.collegeName || "N/A"}</TableCell>
                      <TableCell>{teamSize}</TableCell>
                      <TableCell>{new Date(reg.registrationDate).toLocaleString()}</TableCell>
                      <TableCell>{reg.payment?.status || "pending"}</TableCell>
                      <TableCell>
                        <Button size="sm" onClick={() => setSelectedRegistration(reg)}>View</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
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

      {/* Registration Details Modal */}
      <RegistrationDetailsModal
        isOpen={!!selectedRegistration}
        onClose={() => setSelectedRegistration(null)}
        data={selectedRegistration}
        eventType={selectedSport}
      />
    </div>
  );
};

export default EventRegistrations;
