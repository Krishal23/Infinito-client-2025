"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

// Simple modal component
function Modal({ isOpen, onClose, data }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">Player Details</h2>

        {data ? (
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>College/Institution:</strong> {data.college || "IIT Patna"}</p>
            <p><strong>Address:</strong> {data.address || "Patna, Bihar"}</p>
            <p><strong>Team Captain:</strong> {data.captainName || "Ravi Kumar"}</p>
            <p><strong>Team Vice Captain:</strong> {data.viceCaptain || "Aman Singh"}</p>
            <p><strong>Captain Mobile:</strong> {data.captainMobile || "9876543210"}</p>
            <p><strong>Vice Captain Mobile:</strong> {data.viceCaptainMobile || "9123456789"}</p>
          </div>
        ) : (
          <p>No details available.</p>
        )}

        <Button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}

const sportsList = [
  "Mr. Infinto", "CODM", "BGMI", "Valorant", "Free Fire",
  "Athletic", "Badminton", "Basketball", "Cricket", "Football",
  "Kabaddi", "Lawn Tennis", "Squash", "Table Tennis", "Volleyball",
  "Weight Lifting", "Power Lifting", "Chess",
]

// Dummy applicants (replace with API later)
const applicantsData = {
  Cricket: [
    {
      id: "CR001",
      playerName: "Rahul Sharma",
      email: "rahul.s@email.com",
      specialization: "Batsman",
      college: "IIT Patna",
      address: "Patna, Bihar",
      captainName: "Ravi Kumar",
      viceCaptain: "Aman Singh",
      captainMobile: "9876543210",
      viceCaptainMobile: "9123456789"
    },
    {
      id: "CR002",
      playerName: "Aman Akash",
      email: "aman@email.com",
      specialization: "Bowler",
      college: "IIT Patna",
      address: "Patna, Bihar",
      captainName: "Vikash Kumar",
      viceCaptain: "Suraj Yadav",
      captainMobile: "9991112233",
      viceCaptainMobile: "8887776665"
    },
  ],
  Football: [
    {
      id: "FB001",
      playerName: "Vikram Kumar",
      email: "vikram@email.com",
      specialization: "Forward",
      college: "BIT Mesra",
      address: "Ranchi, Jharkhand",
      captainName: "Alok Singh",
      viceCaptain: "Rohit Yadav",
      captainMobile: "7775554443",
      viceCaptainMobile: "9998887771"
    },
  ],
}
  
export function Events() {
  const [selectedSport, setSelectedSport] = useState("Cricket")
  const [applications] = useState(applicantsData)
  const [modalData, setModalData] = useState(null) // for details popup

  return (
    <div className="space-y-8">
      {/* Sexy Sport Selector Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {sportsList.map((sport) => (
          <button
            key={sport}
            onClick={() => setSelectedSport(sport)}
            className={`px-4 py-2 rounded-2xl text-sm font-semibold shadow-md transition-all duration-200 
              ${selectedSport === sport 
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white scale-105" 
                : "bg-gray-100 hover:bg-indigo-100 text-gray-700"
              }`}
          >
            {sport}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <Card className="shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-700 font-bold">
            🏆 {selectedSport} Applicants
          </CardTitle>
          <p className="text-sm text-gray-600">List of registered players</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead>ID</TableHead>
                <TableHead>Player Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications[selectedSport] && applications[selectedSport].length > 0 ? (
                applications[selectedSport].map((app) => (
                  <TableRow key={app.id} className="hover:bg-indigo-50">
                    <TableCell className="font-mono font-medium">{app.id}</TableCell>
                    <TableCell className="font-medium">{app.playerName}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>
                      <Badge className="bg-indigo-100 text-indigo-700">{app.specialization}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-lg border-indigo-500 text-indigo-600 hover:bg-indigo-100"
                        onClick={() => setModalData(app)}
                      >
                        📄 View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="5" className="text-center text-gray-500 py-6">
                    No applicants for {selectedSport}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <Modal isOpen={!!modalData} onClose={() => setModalData(null)} data={modalData} />
    </div>
  )
}
