"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"

export function UsersTable() {
  const [users] = useState([
    { id: 1, username: "john_doe", role: "user", status: "active", joinDate: "2024-01-10" },
    { id: 2, username: "jane_admin", role: "admin", status: "active", joinDate: "2024-01-08" },
    { id: 3, username: "mike_mod", role: "moderator", status: "active", joinDate: "2024-01-05" },
    { id: 4, username: "sarah_ca", role: "ca", status: "active", joinDate: "2024-01-03" },
    { id: 5, username: "alex_user", role: "user", status: "inactive", joinDate: "2024-01-01" },
  ])

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "moderator":
        return "bg-purple-100 text-purple-800"
      case "ca":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
              <TableHead className="font-bold">ROLE</TableHead>
              <TableHead className="font-bold">STATUS</TableHead>
              <TableHead className="font-bold">JOIN DATE</TableHead>
              <TableHead className="font-bold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-mono">{user.id}</TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role === "admin" ? "👑" : user.role === "moderator" ? "⚖️" : user.role === "ca" ? "🛡️" : "👤"}{" "}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status === "active" ? "🟢" : "🔴"} {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 bg-transparent">
                    ℹ️ Info
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
