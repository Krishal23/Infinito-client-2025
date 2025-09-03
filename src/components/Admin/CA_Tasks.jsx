//////////////////////////////////////////////////////////that night ///////////////////////////////////////////////////////
// "use client"

// import { useState, useEffect } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
// import { Button } from "./ui/button"
// import { Badge } from "./ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
// import axiosInstance from "../../utils/axios.js"

// // React Icons
// import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye, FaTimes, FaSearch } from "react-icons/fa"

// export function CA_Tasks() {
//   const [applications, setApplications] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [selectedApp, setSelectedApp] = useState(null)
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1)
//   const appsPerPage = 5

//   useEffect(() => {
//     fetchApplications()
//   }, [])

//   const fetchApplications = async () => {
//     try {
//       setLoading(true)
//       const res = await axiosInstance.get("/ca/all-applications")
//       setApplications(res.data.applications)
//     } catch (error) {
//       console.error("Error fetching applications:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleApprove = async (id) => {
//     if (!confirm("Are you sure you want to approve this application?")) return
//     try {
//       await axiosInstance.put(`/ca/${id}/accept`)
//       fetchApplications()
//     } catch (error) {
//       console.error("Error approving application:", error)
//     }
//   }

//   const handleReject = async (id) => {
//     if (!confirm("Are you sure you want to reject this application?")) return
//     try {
//       await axiosInstance.put(`/ca/${id}/reject`)
//       fetchApplications()
//     } catch (error) {
//       console.error("Error rejecting application:", error)
//     }
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return "—"
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Filter + Search
//   const filteredApplications = applications.filter((app) => {
//     const matchesStatus = statusFilter === "all" || app.status === statusFilter
//     const matchesSearch =
//       app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.email.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchesStatus && matchesSearch
//   })

//   // Pagination logic
//   const indexOfLastApp = currentPage * appsPerPage
//   const indexOfFirstApp = indexOfLastApp - appsPerPage
//   const currentApplications = filteredApplications.slice(indexOfFirstApp, indexOfLastApp)
//   const totalPages = Math.ceil(filteredApplications.length / appsPerPage)

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   return (
//     <div className="space-y-6">
//       {/* CA Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="bg-blue-50 border-blue-200">
//           <CardContent className="p-4 text-center">
//             <div className="text-2xl font-bold text-blue-700">
//               {applications.filter((a) => a.status === "pending").length}
//             </div>
//             <div className="text-sm font-medium text-blue-600">Pending Applications</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-green-50 border-green-200">
//           <CardContent className="p-4 text-center">
//             <div className="text-2xl font-bold text-green-700">
//               {applications.filter((a) => a.status === "accepted").length}
//             </div>
//             <div className="text-sm font-medium text-green-600">Accepted Applications</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-red-50 border-red-200">
//           <CardContent className="p-4 text-center">
//             <div className="text-2xl font-bold text-red-700">
//               {applications.filter((a) => a.status === "rejected").length}
//             </div>
//             <div className="text-sm font-medium text-red-600">Rejected Applications</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search + Status Filter */}
//       <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
//         <div className="relative w-full md:w-1/3">
//           <FaSearch className="absolute top-3 left-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value)
//               setCurrentPage(1)
//             }}
//             className="pl-10 pr-3 py-2 border rounded-lg w-full"
//           />
//         </div>
//         <div className="flex gap-2">
//           {["all", "pending", "accepted", "rejected"].map((status) => (
//             <Button
//               key={status}
//               size="sm"
//               variant={statusFilter === status ? "default" : "outline"}
//               onClick={() => {
//                 setStatusFilter(status)
//                 setCurrentPage(1)
//               }}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* CA Applications Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>CA Applications Management</CardTitle>
//           <p className="text-sm text-gray-600">Review and manage CA applications</p>
//         </CardHeader>
//         <CardContent>
//           {loading ? (
//             <p className="text-center text-gray-500">Loading applications...</p>
//           ) : filteredApplications.length === 0 ? (
//             <p className="text-center text-gray-500">No applications found.</p>
//           ) : (
//             <>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>ID</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>College</TableHead>
//                     <TableHead>Year</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Applied</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {currentApplications.map((app) => (
//                     <TableRow
//                       key={app._id}
//                       className={`cursor-pointer hover:bg-gray-100 ${
//                         selectedApp?._id === app._id ? "bg-gray-200" : ""
//                       }`}
//                       onClick={(e) => {
//                         if (e.target.tagName.toLowerCase() !== "button" && !e.target.closest("button")) {
//                           setSelectedApp(app)
//                         }
//                       }}
//                     >
//                       <TableCell className="font-mono text-xs">{app._id.slice(0, 6)}...</TableCell>
//                       <TableCell className="font-medium">{app.fullName}</TableCell>
//                       <TableCell>{app.email}</TableCell>
//                       <TableCell>{app.collegeName}</TableCell>
//                       <TableCell>{app.collegeYear}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             app.status === "accepted"
//                               ? "default"
//                               : app.status === "rejected"
//                               ? "destructive"
//                               : "secondary"
//                           }
//                           className="flex items-center gap-1"
//                         >
//                           {app.status === "accepted" && <FaCheckCircle className="text-green-600" />}
//                           {app.status === "rejected" && <FaTimesCircle className="text-red-600" />}
//                           {app.status === "pending" && <FaHourglassHalf className="text-yellow-500" />}
//                           {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>{formatDate(app.applicationDate)}</TableCell>
//                       <TableCell>
//                         {app.status === "pending" ? (
//                           <div className="flex gap-2">
//                             <Button
//                               size="sm"
//                               className="bg-green-600 hover:bg-green-700 flex items-center gap-1"
//                               onClick={() => handleApprove(app._id)}
//                             >
//                               <FaCheckCircle /> Approve
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="destructive"
//                               className="flex items-center gap-1"
//                               onClick={() => handleReject(app._id)}
//                             >
//                               <FaTimesCircle /> Reject
//                             </Button>
//                           </div>
//                         ) : (
//                           <Button
//                             size="sm"
//                             variant="outline"
//                             className="flex items-center gap-1"
//                             onClick={() => setSelectedApp(app)}
//                           >
//                             <FaEye /> View
//                           </Button>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {/* Pagination */}
//               <div className="flex justify-center gap-2 mt-4">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i}
//                     size="sm"
//                     variant={currentPage === i + 1 ? "default" : "outline"}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Popup Modal */}
//       {selectedApp && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative max-h-[90vh] overflow-y-auto">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               onClick={() => setSelectedApp(null)}
//             >
//               <FaTimes />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Application Details</h2>
//             <div className="space-y-2 text-sm">
//               <p><strong>Full Name:</strong> {selectedApp?.fullName}</p>
//               <p><strong>Username:</strong> {selectedApp?.username}</p>
//               <p><strong>Email:</strong> {selectedApp?.email}</p>
//               <p><strong>College:</strong> {selectedApp?.collegeName}</p>
//               <p><strong>Year:</strong> {selectedApp?.collegeYear}</p>
//               <p><strong>POR:</strong> {selectedApp?.por}</p>
//               <p><strong>Address:</strong> {selectedApp?.collegeAddress}</p>
//               <p><strong>Phone:</strong> {selectedApp?.phoneNumber}</p>
//               <p><strong>Alternative Email:</strong> {selectedApp?.alternativeEmail || "—"}</p>
//               <p><strong>How Did They Know:</strong> {selectedApp?.howDidYouKnow}</p>
//               <p><strong>Statement:</strong> {selectedApp?.applicationStatement}</p>
//               <p><strong>Status:</strong> {selectedApp?.status}</p>
//               <p><strong>Applied On:</strong> {formatDate(selectedApp?.applicationDate)}</p>
//               <p><strong>Reviewed By:</strong> {selectedApp?.reviewedBy?.username || "—"}</p>
//               <p><strong>Reviewer mail:</strong> {selectedApp?.reviewedBy?.email || "—"}</p>
//               <p><strong>Reviewed At:</strong> {formatDate(selectedApp?.reviewedAt)}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


///////////////////////////////////////////////second attempt////////////////////////////////////////////////////////////////////
// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
// import { Button } from "./ui/button"
// import { Badge } from "./ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

// // React Icons
// import { FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaEye, FaTimes, FaSearch } from "react-icons/fa"

// export function CA_Tasks() {
//   // Dummy data instead of API
//   const [applications] = useState([
//     {
//       _id: "CA001",
//       fullName: "Rahul Sharma",
//       username: "rahul123",
//       email: "rahul@example.com",
//       collegeName: "IIT Patna",
//       collegeYear: "3rd Year",
//       por: "Event Coordinator",
//       collegeAddress: "Patna, Bihar",
//       phoneNumber: "9876543210",
//       alternativeEmail: "rahul.alt@example.com",
//       howDidYouKnow: "Instagram",
//       applicationStatement: "I love organizing events!",
//       status: "pending",
//       applicationDate: "2025-08-01T10:00:00Z",
//       reviewedBy: null,
//       reviewedAt: null,
//     },
//     {
//       _id: "CA002",
//       fullName: "Aman Singh",
//       username: "aman22",
//       email: "aman@example.com",
//       collegeName: "BIT Mesra",
//       collegeYear: "2nd Year",
//       por: "Club Member",
//       collegeAddress: "Ranchi, Jharkhand",
//       phoneNumber: "9123456789",
//       alternativeEmail: "",
//       howDidYouKnow: "Friends",
//       applicationStatement: "Looking forward to being a CA.",
//       status: "accepted",
//       applicationDate: "2025-07-28T14:30:00Z",
//       reviewedBy: { username: "Admin1", email: "admin@example.com" },
//       reviewedAt: "2025-08-02T09:00:00Z",
//     },
//     {
//       _id: "CA003",
//       fullName: "Vikash Yadav",
//       username: "vikky99",
//       email: "vikash@example.com",
//       collegeName: "NIT Jamshedpur",
//       collegeYear: "1st Year",
//       por: "—",
//       collegeAddress: "Jamshedpur, Jharkhand",
//       phoneNumber: "9998887771",
//       alternativeEmail: "",
//       howDidYouKnow: "Facebook",
//       applicationStatement: "I want to promote fest in my city.",
//       status: "rejected",
//       applicationDate: "2025-08-05T16:15:00Z",
//       reviewedBy: { username: "Admin2", email: "reviewer@example.com" },
//       reviewedAt: "2025-08-06T12:00:00Z",
//     },
//   ])

//   const [selectedApp, setSelectedApp] = useState(null)
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [searchTerm, setSearchTerm] = useState("")

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1)
//   const appsPerPage = 5

//   const formatDate = (dateString) => {
//     if (!dateString) return "—"
//     return new Date(dateString).toLocaleDateString("en-GB", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//   }

//   // Filter + Search
//   const filteredApplications = applications.filter((app) => {
//     const matchesStatus = statusFilter === "all" || app.status === statusFilter
//     const matchesSearch =
//       app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       app.email.toLowerCase().includes(searchTerm.toLowerCase())
//     return matchesStatus && matchesSearch
//   })

//   // Pagination logic
//   const indexOfLastApp = currentPage * appsPerPage
//   const indexOfFirstApp = indexOfLastApp - appsPerPage
//   const currentApplications = filteredApplications.slice(indexOfFirstApp, indexOfLastApp)
//   const totalPages = Math.ceil(filteredApplications.length / appsPerPage)

//   const handlePageChange = (page) => {
//     setCurrentPage(page)
//   }

//   return (
//     <div className="space-y-6">
//       {/* CA Statistics */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="bg-blue-50 border-blue-200">
//           <CardContent className="p-4 text-center">
//             <div className="text-2xl font-bold text-blue-700">
//               {applications.filter((a) => a.status === "pending").length}
//             </div>
//             <div className="text-sm font-medium text-blue-600">Pending Applications</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-green-50 border-green-200">
//           <CardContent className="p-4 text-center">
//             <div className="text-2xl font-bold text-green-700">
//               {applications.filter((a) => a.status === "accepted").length}
//             </div>
//             <div className="text-sm font-medium text-green-600">Accepted Applications</div>
//           </CardContent>
//         </Card>
//         <Card className="bg-red-50 border-red-200">
//           <CardContent className="p-4 text-center">
//             <div className="text-2xl font-bold text-red-700">
//               {applications.filter((a) => a.status === "rejected").length}
//             </div>
//             <div className="text-sm font-medium text-red-600">Rejected Applications</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Search + Status Filter */}
//       <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
//         <div className="relative w-full md:w-1/3">
//           <FaSearch className="absolute top-3 left-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search by name or email..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value)
//               setCurrentPage(1)
//             }}
//             className="pl-10 pr-3 py-2 border rounded-lg w-full"
//           />
//         </div>
//         <div className="flex gap-2">
//           {["all", "pending", "accepted", "rejected"].map((status) => (
//             <Button
//               key={status}
//               size="sm"
//               variant={statusFilter === status ? "default" : "outline"}
//               onClick={() => {
//                 setStatusFilter(status)
//                 setCurrentPage(1)
//               }}
//             >
//               {status.charAt(0).toUpperCase() + status.slice(1)}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* CA Applications Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>CA Applications Management</CardTitle>
//           <p className="text-sm text-gray-600">Review and manage CA applications</p>
//         </CardHeader>
//         <CardContent>
//           {filteredApplications.length === 0 ? (
//             <p className="text-center text-gray-500">No applications found.</p>
//           ) : (
//             <>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>ID</TableHead>
//                     <TableHead>Name</TableHead>
//                     <TableHead>Email</TableHead>
//                     <TableHead>College</TableHead>
//                     <TableHead>Year</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Applied</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {currentApplications.map((app) => (
//                     <TableRow
//                       key={app._id}
//                       className={`cursor-pointer hover:bg-gray-100 ${
//                         selectedApp?._id === app._id ? "bg-gray-200" : ""
//                       }`}
//                       onClick={(e) => {
//                         if (e.target.tagName.toLowerCase() !== "button" && !e.target.closest("button")) {
//                           setSelectedApp(app)
//                         }
//                       }}
//                     >
//                       <TableCell className="font-mono text-xs">{app._id}</TableCell>
//                       <TableCell className="font-medium">{app.fullName}</TableCell>
//                       <TableCell>{app.email}</TableCell>
//                       <TableCell>{app.collegeName}</TableCell>
//                       <TableCell>{app.collegeYear}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             app.status === "accepted"
//                               ? "default"
//                               : app.status === "rejected"
//                               ? "destructive"
//                               : "secondary"
//                           }
//                           className="flex items-center gap-1"
//                         >
//                           {app.status === "accepted" && <FaCheckCircle className="text-green-600" />}
//                           {app.status === "rejected" && <FaTimesCircle className="text-red-600" />}
//                           {app.status === "pending" && <FaHourglassHalf className="text-yellow-500" />}
//                           {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>{formatDate(app.applicationDate)}</TableCell>
//                       <TableCell>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="flex items-center gap-1"
//                           onClick={() => setSelectedApp(app)}
//                         >
//                           <FaEye /> View
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {/* Pagination */}
//               <div className="flex justify-center gap-2 mt-4">
//                 {Array.from({ length: totalPages }, (_, i) => (
//                   <Button
//                     key={i}
//                     size="sm"
//                     variant={currentPage === i + 1 ? "default" : "outline"}
//                     onClick={() => handlePageChange(i + 1)}
//                   >
//                     {i + 1}
//                   </Button>
//                 ))}
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Popup Modal by gpt */}
//       {selectedApp && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-6 w-11/12 max-w-md relative max-h-[90vh] overflow-y-auto">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               onClick={() => setSelectedApp(null)}
//             >
//               <FaTimes />
//             </button>
//             <h2 className="text-xl font-bold mb-4">Application Details</h2>
//             <div className="space-y-2 text-sm">
//               <p><strong>Full Name:</strong> {selectedApp?.fullName}</p>
//               <p><strong>Username:</strong> {selectedApp?.username}</p>
//               <p><strong>Email:</strong> {selectedApp?.email}</p>
//               <p><strong>College:</strong> {selectedApp?.collegeName}</p>
//               <p><strong>Year:</strong> {selectedApp?.collegeYear}</p>
//               <p><strong>POR:</strong> {selectedApp?.por}</p>
//               <p><strong>Address:</strong> {selectedApp?.collegeAddress}</p>
//               <p><strong>Phone:</strong> {selectedApp?.phoneNumber}</p>
//               <p><strong>Alternative Email:</strong> {selectedApp?.alternativeEmail || "—"}</p>
//               <p><strong>How Did They Know:</strong> {selectedApp?.howDidYouKnow}</p>
//               <p><strong>Statement:</strong> {selectedApp?.applicationStatement}</p>
//               <p><strong>Status:</strong> {selectedApp?.status}</p>
//               <p><strong>Applied On:</strong> {formatDate(selectedApp?.applicationDate)}</p>
//               <p><strong>Reviewed By:</strong> {selectedApp?.reviewedBy?.username || "—"}</p>
//               <p><strong>Reviewer mail:</strong> {selectedApp?.reviewedBy?.email || "—"}</p>
//               <p><strong>Reviewed At:</strong> {formatDate(selectedApp?.reviewedAt)}</p>
//             </div>

//             {/* Back button at bottom added by perplex*/}
//             <div className="mt-6 flex justify-center">
//               <Button variant="outline" onClick={() => setSelectedApp(null)}>
//                 ⬅ Back
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


//////////////////////////////////////////third attempt//////////////////////////////////////////////////////////////
"use client";

import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function DashboardPage() {
  // ---------------- Submissions Data ----------------
  const submissions = [
    { id: 1, username: "Aman", status: "un-evaluated" },
    { id: 2, username: "Minhaj", status: "accepted" },
    { id: 3, username: "Homesh", status: "rejected" },
    { id: 4, username: "Neha", status: "un-evaluated" },
    { id: 5, username: "Krishal", status: "un-evaluated" },
    { id: 6, username: "Kavya", status: "un-evaluated" },
  ];

  // ---------------- Tasks Data ----------------
  const [tasks, setTasks] = useState([
    { id: "1", title: "Minaj ke liye", notes: "do api or die." },
    { id: "2", title: "For everyone (Except Swarna)", notes: "learn api for good interships " },
  ]);
  const [newTask, setNewTask] = useState({ title: "", notes: "" });

  // Add new task
  const handleAddTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now().toString(), title: newTask.title, notes: newTask.notes },
    ]);
    setNewTask({ title: "", notes: "" });
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Drag reorder
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasks);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTasks(items);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Responsive layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* ---------------- Submissions Section ---------------- */}
        {/* <div className="flex-1 bg-black bg-cover bg-center text-white rounded-2xl p-6"> */}
        <div className="flex-1 bg-[#F1A58B] bg-cover bg-center text-white rounded-2xl p-6">

          <h1 className="text-3xl font-bold text-center mb-6">SUBMISSIONS</h1>
          
          <div className="flex gap-3 justify-center mb-6">
            <button className="px-3 py-1 rounded bg-[#E34B17] text-white">All Submissions</button>
            <button className="px-3 py-1 rounded bg-[#E34B17]">Unevaluated</button>
            <button className="px-3 py-1 rounded bg-[#E34B17]">Accepted</button>
            <button className="px-3 py-1 rounded bg-[#E34B17]">Rejected</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-orange-50 text-black p-4 rounded-lg shadow flex flex-col items-center"
              >
                {/* Thumbnail */}
                <div className="w-full h-32 bg-gray-400 mb-2"></div>

                {/* Username */}
                <p className="font-semibold">Name: {sub.username}</p>

                {/* Buttons */}
                <div className="flex gap-2 mt-2">
                  {sub.status === "accepted" ? (
                    <>
                      <span className="px-3 py-1 text-sm bg-orange-300 text-white rounded">
                        Accepted
                      </span>
                      <button className="px-3 py-1 text-sm bg-gray-500 text-white rounded">
                        Delete
                      </button>
                    </>
                  ) : sub.status === "rejected" ? (
                    <>
                      <span className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                        Rejected
                      </span>
                      <button className="px-3 py-1 text-sm bg-gray-500 text-white rounded">
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-3 py-1 text-sm bg-orange-400 text-white rounded">
                        Accept
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-500 text-white rounded">
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- Tasks Section ---------------- */}
        <div className="flex-1">
          <div className="max-w-3xl mx-auto p-6 bg-[#F1A58B] rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Manage Tasks</h2>

            {/* Add New Task */}
            <div className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              />
              <textarea
                placeholder="Task Notes"
                rows={3}
                value={newTask.notes}
                onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                className="border rounded px-3 py-2 w-full"
              />
              <button
                onClick={handleAddTask}
                className="px-4 py-2 rounded-xl bg-[#E34B17] text-white font-medium hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>

            {/* Task List with Drag & Drop */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="tasks">
                {(provided) => (
                  <ul
                    className="space-y-3"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 bg-gray-50 border rounded-xl shadow-sm flex justify-between items-start"
                          >
                            <div>
                              <p className="font-semibold">
                                {index + 1}. {task.title}
                              </p>
                              <p className="text-sm text-gray-600">{task.notes}</p>
                            </div>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="ml-2 w-20 py-0.5 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              remove
                            </button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
}
