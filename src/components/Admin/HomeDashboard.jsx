"use client"

import { Card, CardContent } from "./ui/card.jsx"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"

export function HomeDashboard({ onStatClick }) {
  const stats = [
    {
      label: "CURRENT USERS",
      value: "1234",
      type: "users",
      bgColor: "bg-gradient-to-r from-blue-50 to-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      icon: "👥",
      description: "Total registered users in the system",
    },
    {
      label: "CAs",
      value: "12",
      type: "cas",
      bgColor: "bg-gradient-to-r from-green-50 to-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      icon: "🛡️",
      description: "Certified Accountants managing cases",
    },
    {
      label: "MODERATORS",
      value: "15",
      type: "moderators",
      bgColor: "bg-gradient-to-r from-purple-50 to-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      icon: "⚖️",
      description: "System moderators overseeing operations",
    },
    {
      label: "ADMINS",
      value: "2",
      type: "admins",
      bgColor: "bg-gradient-to-r from-red-50 to-red-100",
      textColor: "text-red-700",
      borderColor: "border-red-200",
      icon: "👑",
      description: "System administrators with full access",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome to Admin Dashboard</h2>
            <p className="text-blue-100 text-lg">CA INFINITO 2025 - Administrative Control Center</p>
            <div className="flex items-center mt-4 space-x-4">
              <Badge className="bg-white/20 text-white border-white/30">🟢 System Online</Badge>
              <Badge className="bg-white/20 text-white border-white/30">📅 {new Date().toLocaleDateString()}</Badge>
              <Badge className="bg-white/20 text-white border-white/30">🕒 {new Date().toLocaleTimeString()}</Badge>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-20">🏛️</div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">📊 User Statistics Overview</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {stats.map((stat) => (
            <Card
              key={stat.type}
              className={`${stat.bgColor} ${stat.borderColor} border-2 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-5xl">{stat.icon}</div>
                    <div>
                      <div className={`text-4xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
                      <div className={`text-lg font-semibold ${stat.textColor} mb-1`}>{stat.label}</div>
                      <div className="text-sm text-gray-600">{stat.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={`${stat.textColor} bg-white/50 mb-3`}>Active</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className={`bg-white/80 ${stat.textColor} border-current hover:bg-white`}
                      onClick={() => onStatClick(stat.type)}
                    >
                      📊 View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">⚡ Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">👥</div>
              <h4 className="font-bold text-lg text-blue-800 mb-2">Manage Users</h4>
              <p className="text-sm text-blue-600 mb-4">View and manage all system users</p>
              <Button onClick={() => onStatClick("users")} className="w-full bg-blue-600 hover:bg-blue-700">
                Access Users
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h4 className="font-bold text-lg text-green-800 mb-2">CA Management</h4>
              <p className="text-sm text-green-600 mb-4">Handle CA applications and members</p>
              <Button onClick={() => onStatClick("ca")} className="w-full bg-green-600 hover:bg-green-700">
                Manage CAs
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h4 className="font-bold text-lg text-yellow-800 mb-2">Concerns</h4>
              <p className="text-sm text-yellow-600 mb-4">Handle user concerns and issues</p>
              <Button onClick={() => onStatClick("concerns")} className="w-full bg-yellow-600 hover:bg-yellow-700">
                View Concerns
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
