import React from "react";
import { useParams } from "react-router-dom";
import JsonViewer from "../../utils/JsonViewer";

const Response = () => {
  const { event } = useParams();
  if (!event) return <p>No event specified</p>;

  return <JsonViewer apiUrl={`events/${event}/registrations`} token={localStorage.getItem("token")} />;
};

export default Response;
