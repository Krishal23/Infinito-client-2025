import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axios"

export function AdminHeader({ logout, name, role }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axiosInstance.post(
        "auth/logout",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      logout()
      navigate("/auth")
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2 sm:py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="hidden sm:flex items-center mx-8 text-left flex-1">
          <h1 className="text-lg sm:text-2xl font-bold text-blue-600 leading-tight">
            HELLO {name?.toUpperCase()} !!
          </h1>
          <span className="text-xs sm:text-base text-gray-500">
            ({role?.toUpperCase()})
          </span>
        </div>

        {/* Logout Button */}
        <div className="flex items-center justify-center sm:justify-end w-full sm:w-auto">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent text-sm sm:text-base w-full sm:w-auto"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
