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
// import Gallery from "./pages/Gallery/components/content";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
