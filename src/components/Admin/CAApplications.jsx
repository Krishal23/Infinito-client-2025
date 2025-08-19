"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import axiosInstance from "../../utils/axios.js"

// React Icons
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye, FaTimes } from "react-icons/fa"

export function CAApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedApp, setSelectedApp] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all") // new filter state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const appsPerPage = 5

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/ca/all-applications")
      setApplications(res.data.applications)
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await axiosInstance.put(`/ca/${id}/accept`)
      fetchApplications()
    } catch (error) {
      console.error("Error approving application:", error)
    }
  }

  const handleReject = async (id) => {
    try {
      await axiosInstance.put(`/ca/${id}/reject`)
      fetchApplications()
    } catch (error) {
      console.error("Error rejecting application:", error)
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

  // Filter applications by status
  const filteredApplications =
    statusFilter === "all" ? applications : applications.filter((app) => app.status === statusFilter)

  // Pagination logic
  const indexOfLastApp = currentPage * appsPerPage
  const indexOfFirstApp = indexOfLastApp - appsPerPage
  const currentApplications = filteredApplications.slice(indexOfFirstApp, indexOfLastApp)
  const totalPages = Math.ceil(filteredApplications.length / appsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // console.log(applications)
  return (
    <div className="space-y-6">
      {/* CA Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{applications.filter(a => a.status === "pending").length}</div>
            <div className="text-sm font-medium text-blue-600">Pending Applications</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{applications.filter(a => a.status === "accepted").length}</div>
            <div className="text-sm font-medium text-green-600">Accepted Applications</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{applications.filter(a => a.status === "rejected").length}</div>
            <div className="text-sm font-medium text-red-600">Rejected Applications</div>
          </CardContent>
        </Card>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex gap-2">
        {["all", "pending", "accepted", "rejected"].map((status) => (
          <Button
            key={status}
            size="sm"
            variant={statusFilter === status ? "default" : "outline"}
            onClick={() => {
              setStatusFilter(status)
              setCurrentPage(1) // reset to first page on filter change
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Button>
        ))}
      </div>

      {/* CA Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>CA Applications Management</CardTitle>
          <p className="text-sm text-gray-600">Review and manage CA applications</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading applications...</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentApplications.map((app) => (
                    <TableRow
                      key={app._id}
                      className="cursor-pointer hover:bg-gray-100"
                      onClick={(e) => {
                        if (e.target.tagName.toLowerCase() !== "button" && !e.target.closest("button")) {
                          setSelectedApp(app)
                        }
                      }}
                    >
                      <TableCell className="font-mono text-xs">{app._id.slice(0, 6)}...</TableCell>
                      <TableCell className="font-medium">{app.fullName}</TableCell>
                      <TableCell>{app.email}</TableCell>
                      <TableCell>{app.collegeName}</TableCell>
                      <TableCell>{app.collegeYear}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            app.status === "accepted"
                              ? "default"
                              : app.status === "rejected"
                              ? "destructive"
                              : "secondary"
                          }
                          className="flex items-center gap-1"
                        >
                          {app.status === "accepted" && <FaCheckCircle className="text-green-600" />}
                          {app.status === "rejected" && <FaTimesCircle className="text-red-600" />}
                          {app.status === "pending" && <FaHourglassHalf className="text-yellow-500" />}
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(app.applicationDate)}</TableCell>
                      <TableCell>
                        {app.status === "pending" ? (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
                              onClick={() => handleApprove(app._id)}
                            >
                              <FaCheckCircle /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex items-center gap-1"
                              onClick={() => handleReject(app._id)}
                            >
                              <FaTimesCircle /> Reject
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center gap-1"
                            onClick={() => setSelectedApp(app)}
                          >
                            <FaEye /> View
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Popup Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedApp(null)}
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Full Name:</strong> {selectedApp?.fullName}</p>
              <p><strong>Username:</strong> {selectedApp?.username}</p>
              <p><strong>Email:</strong> {selectedApp?.email}</p>
              <p><strong>College:</strong> {selectedApp?.collegeName}</p>
              <p><strong>Year:</strong> {selectedApp?.collegeYear}</p>
              <p><strong>POR:</strong> {selectedApp?.por}</p>
              <p><strong>Address:</strong> {selectedApp?.collegeAddress}</p>
              <p><strong>Phone:</strong> {selectedApp?.phoneNumber}</p>
              <p><strong>Alternative Email:</strong> {selectedApp?.alternativeEmail || "—"}</p>
              <p><strong>How Did They Know:</strong> {selectedApp?.howDidYouKnow}</p>
              <p><strong>Statement:</strong> {selectedApp?.applicationStatement}</p>
              <p><strong>Status:</strong> {selectedApp?.status}</p>
              <p><strong>Applied On:</strong> {formatDate(selectedApp?.applicationDate)}</p>
              <p><strong>Reviewed By:</strong> {selectedApp?.reviewedBy?.username || "—"}</p>
              <p><strong>Reviewer mail:</strong> {selectedApp?.reviewedBy?.email || "—"}</p>
              <p><strong>Reviewed At:</strong> {formatDate(selectedApp?.reviewedAt)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
