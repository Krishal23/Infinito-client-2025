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
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "./utils/axios";
// import CADashboard from "./pages/CA/sections/CADashboard";
import ProtectedRoute from "./components/ProtectedRoutes";
import MyApplication from "./pages/CA/sections/MyApplication";
import AdminPage from "./pages/Admin/AdminPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CADashboard from "./pages/CA/sections/CADashboard";
import Merch from "./pages/SampleMerch/Merch";
import Athletics from "./pages/Events/event-forms/athletics";
import Badminton_ from "./pages/Events/event-forms/badminton";
import Basketball_ from "./pages/Events/event-forms/basketball";
import Chess_ from "./pages/Events/event-forms/chess";
import Cricket_ from "./pages/Events/event-forms/cricket";
import Football_ from "./pages/Events/event-forms/football";
import Kabbadi_ from "./pages/Events/event-forms/kabbadi";
import Lawn_ from "./pages/Events/event-forms/lawn";
import Squash_ from "./pages/Events/event-forms/squash";
import Tt_ from "./pages/Events/event-forms/tt";
import Volleyball_ from "./pages/Events/event-forms/volley";
import Weightlifting_ from "./pages/Events/event-forms/weightlifting";
import Codm_ from "./pages/Events/event-forms/codm"
import BGMI_ from "./pages/Events/event-forms/bgmi"
import ClashRoyale_ from "./pages/Events/event-forms/clash_royale";
import VALORANT_ from "./pages/Events/event-forms/valorant";
import FREEFIRE_ from "./pages/Events/event-forms/freefire";
import Powerlifting_ from "./pages/Events/event-forms/powerLifting";

// import Gallery from "./pages/Gallery/components/content";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },


  // {
  //   path: "/ca-profile",
  //   element: <Evein />,
  // }
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin", "moderator"]}>
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
    element: <Auth />,
  },

  {
    path: "/events/athletics",
    element: <Athletics />,
  },

  {
    path: "/events/badminton",
    element: <Badminton_ />,
  },

  {
    path: "/events/basketball",
    element: <Basketball_ />,
  },

  {
    path: "/events/football",
    element: <Football_ />,
  },

  {
    path: "/events/kabbadi",
    element: <Kabbadi_ />,
  },

  {
    path: "/events/lawn-tennis",
    element: <Lawn_ />,
  },

  {
    path: "/events/squash",
    element: <Squash_ />,
  },

  {
    path: "/events/table_tennis",
    element: <Tt_ />,
  },

  {
    path: "/events/volleyball",
    element: <Volleyball_ />,
  },

  {
    path: "/events/chess",
    element: <Chess_ />,
  },

  {
    path: "/events/cricket",
    element: <Cricket_ />,
  },

  {
    path: "/events/weightlifting",
    element: <Weightlifting_ />,
  },
  {
    path: "/events/powerlifting",
    element: <Powerlifting_ />,
  },
  {
    path: "/events/codm",
    element: <Codm_ />,
  },
  {
    path: "/events/bgmi",
    element: <BGMI_ />,
  },
  {
    path: "/events/clash_royale",
    element: <ClashRoyale_/>,
  },
  {
    path: "/events/valorant",
    element: <VALORANT_/>,
  },
  {
    path: "/events/freefire",
    element: <FREEFIRE_/>,
  },
  {
    path: "/merchandise",
    element: <Merch />,
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} newestOnTop pauseOnHover />
    </AuthProvider>
  );
}

export default App;
