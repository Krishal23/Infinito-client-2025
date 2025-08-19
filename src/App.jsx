import Team from "./pages/AboutUs/Team";
// import Events from "./pages/HomePage/event/Events";
// import EventsInside from "./pages/HomePage/event/Events_inside";
import Merchandise from "./pages/Merchandise/Merchandise";
import Home from "./pages/HomePage/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Sponser from "./pages/Sponser/Sponser";
// import Eve from "./pages/Events/events";
import Evein from "./pages/events_insider/evein";
import Spons from "./pages/spons/Spons";
import Update from "./pages/updates/Update";
import CA from "./pages/CA/CA";
import CARegister from "./pages/CA/sections/Register";
import Auth from "./pages/Auth/Auth";
import { AuthProvider } from "./context/AuthContext";
import CADashboard from "./pages/CA/sections/CADashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import MyApplication from "./pages/CA/sections/MyApplication";
import AdminPage from "./pages/Admin/AdminPage";
// import Gallery from "./pages/Gallery/components/content";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },



  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin","moderator"]}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },



  {
    path: "/event/ins",
    element: <Evein />,
  },

  {
    path: "/gallery",
    element: <Update />,
  },
  {
    path: "/update",
    element: <Update />,
  },

  {
    path: "/aboutUs",
    element: <Team />,
  },
  {
    path: "/sponsor",
    element: <Spons />,
  },
  {
    path: "/merch",
    element: <Merchandise />,
  },
  {
    path: "/ca",
    element: <CA />,
  },
  {
    path: "/ca-register",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <CARegister />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ca-application",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <MyApplication />
      </ProtectedRoute>
    ),
  },
  {
    path: "/ca-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["ca"]}>
        <CADashboard />
      </ProtectedRoute>
    ),
  },
   {
    path: "/auth",
    element: <Auth/>,
  },
]);

function App() {
   return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
