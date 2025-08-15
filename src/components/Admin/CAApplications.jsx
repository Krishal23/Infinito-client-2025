"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

export function CAApplications() {
  const [caApplications] = useState([
    {
      id: "CA001",
      applicantName: "John Smith",
      email: "john.smith@email.com",
      experience: "3 years",
      status: "pending",
      appliedDate: "2024-01-15",
      specialization: "Corporate Law",
      qualifications: "LLB, LLM",
    },
    {
      id: "CA002",
      applicantName: "Sarah Johnson",
      email: "sarah.j@email.com",
      experience: "5 years",
      status: "pending",
      appliedDate: "2024-01-14",
      specialization: "Tax Law",
      qualifications: "CA, CPA",
    },
    {
      id: "CA003",
      applicantName: "Mike Wilson",
      email: "mike.w@email.com",
      experience: "2 years",
      status: "approved",
      appliedDate: "2024-01-13",
      specialization: "Audit",
      qualifications: "CA",
    },
  ])

  const pendingApplications = caApplications.filter((app) => app.status === "pending")

  return (
    <div className="space-y-6">
      {/* CA Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-700">{pendingApplications.length}</div>
            <div className="text-sm font-medium text-blue-600">Pending Applications</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-700">12</div>
            <div className="text-sm font-medium text-green-600">Active CAs</div>
          </CardContent>
        </Card>
      </div>

      {/* CA Applications */}
      <Card>
        <CardHeader>
          <CardTitle>🛡️ CA Applications Management</CardTitle>
          <p className="text-sm text-gray-600">Review and manage CA applications</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-mono font-medium">{app.id}</TableCell>
                  <TableCell className="font-medium">{app.applicantName}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.experience}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{app.specialization}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        app.status === "approved" ? "default" : app.status === "rejected" ? "destructive" : "secondary"
                      }
                    >
                      {app.status === "approved" ? "✅" : app.status === "rejected" ? "❌" : "⏳"} {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {app.status === "pending" ? (
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          ✅ Approve
                        </Button>
                        <Button size="sm" variant="destructive">
                          ❌ Reject
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline">
                        👁️ View
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
