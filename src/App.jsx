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
import MrInfinito_ from "./pages/Events/event-forms/mr_infinito";
import Response from "./components/Admin/Response";
import JsonViewer from "./utils/JsonViewer";

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
    path: "/events/response/:event",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Response />
      </ProtectedRoute>
    ),
  },
  {
    path: "/events/all-responses",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <JsonViewer apiUrl={`/events/all-registrations`} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/events/my-responses",
    element: <JsonViewer apiUrl={`/events/my-registrations`} />,
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
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Athletics />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/badminton",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Badminton_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/basketball",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Basketball_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/football",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Football_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/kabbadi",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Kabbadi_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/lawn-tennis",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Lawn_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/squash",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Squash_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/table_tennis",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Tt_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/volleyball",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Volleyball_ />
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/mr-infinito",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <MrInfinito_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/chess",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Chess_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/cricket",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Cricket_ />
       </ProtectedRoute>
    ),
  },

  {
    path: "/events/weightlifting",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Weightlifting_ />
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/powerlifting",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Powerlifting_ />
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/codm",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <Codm_ />
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/bgmi",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <BGMI_ />
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/clash_royale",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <ClashRoyale_/>
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/valorant",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <VALORANT_/>
       </ProtectedRoute>
    ),
  },
  {
    path: "/events/freefire",
    element:(
       <ProtectedRoute allowedRoles={["user"]}>
         <FREEFIRE_/>
       </ProtectedRoute>
    ),
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
