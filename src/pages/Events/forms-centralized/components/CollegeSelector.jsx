import React from "react";
import FormSection from "./FormSection";
import colleges from "./collegeData";

const CollegeSelector = ({ form, setForm, handleTopLevelChange }) => {

  const handleCollegeSelect = (e) => {
    const value = e.target.value;
    setForm((prev) => ({
      ...prev,
      collegeSelect: value,
      ...(value !== "Other"
        ? {
            collegeName: value,
            collegeAddress:
              colleges.find((c) => c.name === value)?.address || "",
          }
        : { collegeName: "", collegeAddress: "" }),
    }));
  };

  return (
    <FormSection title="College Details">
      {/* Dropdown */}
      <label className="flex flex-col gap-1">
        <span className="text-sm text-gray-600">Select College</span>
        <select
          name="collegeSelect"
          value={form.collegeSelect || ""}
          onChange={handleCollegeSelect}
          className="rounded-xl border px-3 py-2"
          required
        >
          <option value="">-- Select College --</option>
          {colleges.map((c, idx) => (
            <option key={idx} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </label>

      {form.collegeSelect === "Other" && (
        <>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">College Name</span>
            <input
              type="text"
              name="collegeName"
              placeholder="College Name"
              value={form.collegeName}
              onChange={handleTopLevelChange}
              className="rounded-xl border px-3 py-2"
              required
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-600">College Address</span>
            <input
              type="text"
              name="collegeAddress"
              placeholder="College Address"
              value={form.collegeAddress}
              onChange={handleTopLevelChange}
              className="rounded-xl border px-3 py-2"
              required
            />
          </label>
        </>
      )}

      {form.collegeSelect &&
        form.collegeSelect !== "Other" &&
        form.collegeAddress && (
          <p className="mt-2 text-sm text-gray-500">
            Address: <span className="font-medium">{form.collegeAddress}</span>
          </p>
        )}
    </FormSection>
  );
};

export default CollegeSelector;
