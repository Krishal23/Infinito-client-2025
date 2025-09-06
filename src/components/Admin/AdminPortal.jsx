"use client"

import { useState, useEffect, useContext } from "react"
import { AdminHeader } from "./AdminHeader"
import { Sidebar } from "./Sidebar"
import { UsersTable } from "./UsersTable"
import { CAApplications } from "./CAApplications"
import { HomeDashboard } from "./HomeDashboard"
import { Events } from "./Events.jsx"
import { AuthContext } from "../../context/AuthContext.jsx"
import axiosInstance from "../../utils/axios.js"
import { FaBars, FaTimes } from "react-icons/fa"

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("home")
  const { user, logout } = useContext(AuthContext)
  const [usersData, setUsersData] = useState([])
  const [eventsData, setEventsData] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get("/user/all-users")
        const resEve = await axiosInstance.get("/events/all-registrations")
        setEventsData(resEve?.data?.registrations)
        setUsersData(res.data.users)
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    fetchUserData()
  }, [])

  const handleStatClick = (type) => {
    if (type === "users") {
      setActiveTab("users")
    } else if (type === "ca") {
      setActiveTab("ca")
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeDashboard onStatClick={handleStatClick} />
      case "users":
        return <UsersTable users={usersData} />
      case "ca":
        return <CAApplications />
      case "events":
        return <Events data={eventsData} />
      default:
        return <div>Select a section from the sidebar</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md">
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
          <span className="font-semibold text-lg">Admin Portal</span>
        </div>
        <AdminHeader logout={logout} name={user?.username} role={user?.role} />
      </div>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </aside>

        {/* Mobile Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="relative w-64 bg-white shadow-lg">
              <Sidebar
                activeTab={activeTab}
                onTabChange={(tab) => {
                  setActiveTab(tab)
                  setIsSidebarOpen(false)
                }}
              />
            </div>
            <div
              className="flex-1 bg-black bg-opacity-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
