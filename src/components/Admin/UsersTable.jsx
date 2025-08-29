"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { FaTimes, FaUser, FaUserShield, FaGavel, FaCrown, FaInfoCircle, FaCheck, FaTimesCircle } from "react-icons/fa"

export function UsersTable({ users }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUser, setSelectedUser] = useState(null)
  const usersPerPage = 5

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return { color: "bg-red-100 text-red-800", icon: <FaCrown /> }
      case "moderator":
        return { color: "bg-purple-100 text-purple-800", icon: <FaGavel /> }
      case "ca":
        return { color: "bg-blue-100 text-blue-800", icon: <FaUserShield /> }
      default:
        return { color: "bg-gray-100 text-gray-800", icon: <FaUser /> }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // console.log(users)
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(users.length / usersPerPage)

  return (
    <Card>
      <CardHeader>
        <CardTitle>👥 CURRENT USERS</CardTitle>
        <p className="text-sm text-gray-600">Manage all system users and their roles</p>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-bold">ID</TableHead>
              <TableHead className="font-bold">USERNAME</TableHead>
              <TableHead className="font-bold">EMAIL</TableHead>
              <TableHead className="font-bold">ROLE</TableHead>
              <TableHead className="font-bold">Registered Date</TableHead>
              <TableHead className="font-bold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentUsers.map((user) => {
              const { color, icon } = getRoleBadge(user.role)
              return (
                <TableRow key={user._id} className="hover:bg-gray-50 cursor-pointer">
                  <TableCell className="font-mono text-xs">{user._id.slice(0, 6)}...</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell className="text-gray-600">{user.email}</TableCell>
                  <TableCell >
                    <Badge className={`flex items-center gap-1 border-1 border-zinc-300 ${color}`}>
                      {icon} <span className="text-zinc-800 p-1">{user.role}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-blue-600 border-blue-300 bg-transparent flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedUser(user)
                      }}
                    >
                      <FaInfoCircle /> Info
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </CardContent>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedUser(null)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Full Name:</strong> {selectedUser.fullname || "Not found"}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
              <p><strong>Email Verified:</strong> {selectedUser.isEmailVerified ? <>Verified by Google</>: <>Verified by OTP</>}</p>
              <p><strong>IITP Student:</strong> {selectedUser.isIITPStud ? <FaCheck className="text-green-600"/> : <FaTimesCircle className="text-red-600"/>}</p>
              {/* <p><strong>Score:</strong> {selectedUser.score}</p> */}
              <p><strong>Registered On:</strong> {formatDate(selectedUser.createdAt)}</p>
              {selectedUser.caApplication && <p><strong>CA Application:</strong> {selectedUser.caApplication}</p>}
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
