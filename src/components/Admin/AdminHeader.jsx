import { Link, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import axiosInstance from "../../utils/axios";
import logo from "../../pages/assets/infinito-logo.png";


export function AdminHeader({logout,name,role}) {
  const navigate =useNavigate()
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
      );
      logout();
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="logo-link">
          <img
            src={logo}
            alt="Logo"
            className="logo"
            style={{ marginTop: "5px" }}
          />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-blue-600">HELLO {name?.toUpperCase()} !!
          <span className="text-sm text-gray-500 mt-1"> ({role?.toUpperCase()})</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={handleLogout}  variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
