"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"

export function UsersTable({ users }) {
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

  const formatDate = (dateString) => {
    if (!dateString) return "—"
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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
              <TableHead className="font-bold">EMAIL</TableHead>
              <TableHead className="font-bold">ROLE</TableHead>
              <TableHead className="font-bold">Registered Date</TableHead>
              <TableHead className="font-bold">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id} className="hover:bg-gray-50">
                <TableCell className="font-mono text-xs">{user._id.slice(0, 6)}...</TableCell>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleBadgeColor(user.role)}>
                    {user.role === "admin"
                      ? "👑"
                      : user.role === "moderator"
                      ? "⚖️"
                      : user.role === "ca"
                      ? "🛡️"
                      : "👤"}{" "}
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-300 bg-transparent"
                  >
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
