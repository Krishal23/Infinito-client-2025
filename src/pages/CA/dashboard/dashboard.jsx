import { useEffect, useState } from "react";
import CAProfile from "../../../components/caprofile";
import Navbar from "../../../components/Navbar";

export default function CADashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = (import.meta.env.VITE_API_BASE || "") + "/api/profile";
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(() =>
        setData({
          name: "NAME",
          campus: "Campus",
          city: "Area, City",
          rank: 2,
          stats: { score: 0, rank: 0, tasks: 0, events: 0, teams: 0, completion: 0 },
          email: "XXXXXXX",
          phone: "XXXXXXX",
          org: "XXXXXXX",
          address: "XXXXXXX",
          bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        })
      );
  }, []);


  return (
    <>
        <Navbar/>
        <CAProfile data={data} setData={setData}/>

    </>

  );
}

