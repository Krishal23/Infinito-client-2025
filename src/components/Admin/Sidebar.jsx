"use client"


export function Sidebar({ activeTab, onTabChange }) {
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "users", label: "USERS" },
    { id: "ca", label: "CA" },
    { id: "events", label: "Events" },
  ]

  return (
    <div className="w-48 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-blue-100 text-blue-700 border border-blue-300"
                  : "text-gray-600 hover:bg-gray-100 border border-transparent"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
