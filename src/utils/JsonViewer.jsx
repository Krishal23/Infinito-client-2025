import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "./axios";
import { JsonViewer } from "@textea/json-viewer";

const JsonViewer_ = ({ apiUrl, token }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJson = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axiosInstance.get(apiUrl, { headers });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJson();
  }, [apiUrl]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">JSON Viewer: {apiUrl}</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="bg-gray-100 p-4 rounded overflow-auto">
          <JsonViewer
            value={data}        
            name={false}
            collapsed={1}     
            enableClipboard={true}
            displayDataTypes={true}
            displayObjectSize={true}
            indentWidth={2}
          />
        </div>
      )}
    </div>
  );
};

export default JsonViewer_;
