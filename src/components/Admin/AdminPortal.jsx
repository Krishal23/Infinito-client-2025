"use client"

import { useState } from "react"

import { AdminHeader } from "./AdminHeader"

import { Sidebar } from "./Sidebar"
import { UsersTable } from "./UsersTable"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx"
import { CAApplications } from "./CAApplications"
import { HomeDashboard } from "./HomeDashboard"
import { Events } from "./Events.jsx"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext.jsx"
import { useEffect } from "react"
import axiosInstance from "../../utils/axios.js"

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState("home")

  const { user, logout } = useContext(AuthContext);
  const [usersData,setUsersData]=useState([]);
  
  useEffect(() => {
  
    const fetchUserData = async () => {
      try {
        const res = await axiosInstance.get('/user/all-users');
        setUsersData(res.data.users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);



  const handleStatClick = (type) => {
    // console.log(`Clicked on ${type} stat`)
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
        return <Events />

      default:
        return <div>Select a section from the sidebar</div>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader logout={logout} name={user?.username} role={user?.role}/>
      <div className="flex">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
