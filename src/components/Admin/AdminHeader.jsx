import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

export function AdminHeader() {
  const navigate =useNavigate()
  const handleLogin =()=>{
    navigate("/auth")
  }
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-600">HELLO Admin!!</h1>
          <p className="text-sm text-gray-500 mt-1">CA INFINITY 2025</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={handleLogin}  variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent">
            Login/Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
