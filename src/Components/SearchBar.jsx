import React, { useState } from "react";
import "../App.css";

const SearchBar = ({
  searchFields,
  onFieldChange,
  onSearch,
  onReset,
}) => {
  const [collapsed, setCollapsed] = useState(false); // false = expanded by default

  return (
    <div className="SearchPanel">
      <div
        className="d-flex align-items-center mb-2"
       
      >
        <h5 className="mb-0">Search By</h5>
       
      </div>
      {!collapsed && (
        <>
                  {/* Name row */}
          <p>Enter atleast one of the following</p>
          <div className="FilterRow">
            <label className="FilterLabel" htmlFor="name">Name:</label>
            <input
              id="name"
              className="FilterInput"
              type="text"
              value={searchFields.Name}
              onChange={e => onFieldChange("Name", e.target.value)}
              maxLength={50}
              style={{ minWidth: "300px", flex: "1 1 auto", maxWidth: "500px" }}
              placeholder="Enter Name"
            />
          </div>
          {/* Dates row */}
          <div className="FilterRow">
            <label className="FilterLabel" htmlFor="fromDate">Effective Date:</label>
            <input
              id="fromDate"
              className="FilterInput"
              type="date"
              value={searchFields.EffectiveDate}
              onChange={e => onFieldChange("EffectiveDate", e.target.value)}
            />
            <label className="FilterLabel" htmlFor="toDate" style={{ marginLeft: 24 }}>Term Date:</label>
            <input
              id="toDate"
              className="FilterInput"
              type="date"
              value={searchFields.TermDate}
              onChange={e => onFieldChange("TermDate", e.target.value)}
            />
            <label className="FilterLabel" htmlFor="lastModified" style={{ marginLeft: 24 }}>Last Modified:</label>
            <input
              id="lastModified"
              className="FilterInput"
              type="date"
              value={searchFields.LastModified}
              onChange={e => onFieldChange("LastModified", e.target.value)}
            />
          </div>
          {/* Status and Result Limit row */}
          <div className="FilterRow">
            <label className="FilterLabel" htmlFor="status">Status:</label>
            <select
              id="status"
              className="DropDownList FilterInput"
              value={searchFields.Status}
              onChange={e => onFieldChange("Status", e.target.value)}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Expired">Expired</option>
              <option value="DeActive">Inactive</option>
            </select>
            <label className="FilterLabel" htmlFor="resultLimit" style={{ marginLeft: 24 }}>Result Limit:</label>
            <input
              id="resultLimit"
              className="FilterInput"
              type="number"
              value={searchFields.ResultLimit}
              onChange={e => onFieldChange("ResultLimit", e.target.value)}
              placeholder="e.g. 10"
              min={1}
            />
          </div>
          {/* Buttons row */}
          <div className="ButtonRow">
            <button className="PrimaryButton" onClick={onSearch}>Search</button>
            <button className="Button" onClick={onReset}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
};
export default SearchBar;