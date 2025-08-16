"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import axiosInstance from "../../utils/axios.js"

// React Icons
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye } from "react-icons/fa"

export function CAApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)

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
      fetchApplications() // refresh list
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

  const pendingApplications = applications.filter((app) => app.status === "pending")
  const acceptedApplications = applications.filter((app) => app.status === "accepted")
  const rejectedApplications = applications.filter((app) => app.status === "rejected")


  return (
    <div className="space-y-6">
      {/* CA Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{pendingApplications.length}</div>
            <div className="text-sm font-medium text-blue-600">Pending Applications</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">{acceptedApplications.length}</div>
            <div className="text-sm font-medium text-green-600">Accepted Applications</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-700">{rejectedApplications.length}</div>
            <div className="text-sm font-medium text-red-600">Rejected Applications</div>
          </CardContent>
        </Card>
      </div>

      {/* CA Applications */}
      <Card>
        <CardHeader>
          <CardTitle>CA Applications Management</CardTitle>
          <p className="text-sm text-gray-600">Review and manage CA applications</p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-gray-500">Loading applications...</p>
          ) : (
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
                {applications.map((app) => (
                  <TableRow key={app._id}>
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
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FaEye /> View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
