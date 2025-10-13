import React, { useState, useEffect, useMemo } from "react";
import SearchPanel from "./SearchBar";
import DataGrid from "./GridComponent";
import "../App.css";

const initialMockData = [
    { Name: "Acne Agents, Oral", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Acne Agents, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Alzheimers Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antibiotics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antibiotics, Vaginal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antidepressants, Other", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antidepressants, SSRI", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antidepressants, Tricyclic", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antifungals, Oral", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antifungals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihypertensives, Sympatholytics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihyperuricemics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparasitics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparkinsons Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antivirals, Oral/Nasal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Inactive" },
    { Name: "Antivirals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Bile Salts", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Bladder Relaxant Preparations", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Calcium Channel Blockers (Oral)", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Cephalosporins and Related Antibiotics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Antifungals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihypertensives, Sympatholytics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihyperuricemics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparasitics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparkinsons Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antivirals, Oral/Nasal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Inactive" },
    { Name: "Antivirals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Bile Salts", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Bladder Relaxant Preparations", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Calcium Channel Blockers (Oral)", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Cephalosporins and Related Antibiotics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Acne Agents, Oral", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Acne Agents, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Alzheimers Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antibiotics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antibiotics, Vaginal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antidepressants, Other", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antidepressants, SSRI", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antidepressants, Tricyclic", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antifungals, Oral", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antifungals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihypertensives, Sympatholytics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihyperuricemics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparasitics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparkinsons Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antivirals, Oral/Nasal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Inactive" },
    { Name: "Antivirals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Bile Salts", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Bladder Relaxant Preparations", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Calcium Channel Blockers (Oral)", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Cephalosporins and Related Antibiotics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Antifungals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihypertensives, Sympatholytics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihyperuricemics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparasitics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparkinsons Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antivirals, Oral/Nasal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Inactive" },
    { Name: "Antivirals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Bile Salts", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Bladder Relaxant Preparations", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Calcium Channel Blockers (Oral)", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Cephalosporins and Related Antibiotics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Acne Agents, Oral", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Acne Agents, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Alzheimers Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antibiotics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antibiotics, Vaginal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antidepressants, Other", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Pending" },
    { Name: "Antidepressants, SSRI", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antidepressants, Tricyclic", EffectiveDate: "2024-08-09", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antifungals, Oral", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antifungals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihypertensives, Sympatholytics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihyperuricemics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparasitics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparkinsons Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antivirals, Oral/Nasal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Inactive" },
    { Name: "Antivirals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Bile Salts", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Bladder Relaxant Preparations", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Calcium Channel Blockers (Oral)", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Cephalosporins and Related Antibiotics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Antifungals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihypertensives, Sympatholytics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antihyperuricemics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparasitics, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antiparkinsons Agents", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Antivirals, Oral/Nasal", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Inactive" },
    { Name: "Antivirals, Topical", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Active" },
    { Name: "Bile Salts", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Bladder Relaxant Preparations", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Calcium Channel Blockers (Oral)", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" },
    { Name: "Cephalosporins and Related Antibiotics", EffectiveDate: "2023-01-26", TermDate: "2078-12-31", LastModified: "2025-06-10", Status: "Expired" }
];

const defaultFields = {
  Name: "",
  EffectiveDate: "",
  TermDate: "",
  LastModified: "",
  Status: "Active",
  ResultLimit: "",
};

const columns = ["Name", "EffectiveDate", "TermDate", "LastModified"];

const PAEngineConfiguration = () => {
  const [activeTab, setActiveTab] = useState("RuleSets");
  const [selectedStatus, setSelectedStatus] = useState("Active");
  const [searchFields, setSearchFields] = useState(defaultFields);
  const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const activeData = initialMockData.filter(item => item.Status === "Active");
        setFilteredData(activeData);
    }, []);

  const handleFieldChange = (field, value) => {
    setSearchFields(prev => ({ ...prev, [field]: value }));
    //if (field === "Status") setSelectedStatus(value);
  };

  //const handleStatusChange = (status) => {
  //  setSelectedStatus(status);
  //  setSearchFields(prev => ({ ...prev, Status: status }));
  //};

  const handleSearch = () => {
    let data = initialMockData.filter(item => {
      return (
        (!searchFields.Name || item.Name.toLowerCase().includes(searchFields.Name.toLowerCase())) &&
        (!searchFields.EffectiveDate || item.EffectiveDate === searchFields.EffectiveDate) &&
        (!searchFields.TermDate || item.TermDate === searchFields.TermDate) &&
          (!searchFields.LastModified || item.LastModified === searchFields.LastModified) &&
          (!searchFields.Status || item.Status === searchFields.Status)
      );
    });
    if (searchFields.ResultLimit) {
      data = data.slice(0, Number(searchFields.ResultLimit));
    }
    setSelectedStatus(searchFields.Status);
    setFilteredData(data);
    };

    const cleanedData = useMemo(() => {
        return filteredData.map(item => {
            const newItem = {};
            columns.forEach(col => {
                newItem[col] = item[col];
            });
            return newItem;
        });
    }, [filteredData]);

    const handleReset = () => {
    const activeOnly = initialMockData.filter(item => item.Status === "Active");
    setSearchFields(defaultFields);
    setSelectedStatus("Active");
    setFilteredData(activeOnly);
  };

  return (
    <div className="pt-4">
      <h3>PAEngine Configuration</h3>

      {/* Tabs */}
      <div className="tab-row">
        <div
          className={`tab ${activeTab === "RuleSets" ? "active" : ""}`}
          onClick={() => setActiveTab("RuleSets")}
        >
          RuleSets
        </div>
        <div
          className={`tab ${activeTab === "DataSets" ? "active" : ""}`}
          onClick={() => setActiveTab("DataSets")}
        >
          DataSets
        </div>
      </div>

      <div className="main-content mt-3 pb-3">

        { (
          <SearchPanel
            searchFields={searchFields}
            onFieldChange={handleFieldChange}
            //onStatusChange={handleStatusChange}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        )}
        
      
              {filteredData && filteredData.length > 0 ? (
                  <DataGrid title={selectedStatus} Orgdata={cleanedData} />
              ) : (
                  <p>No Data found</p>
              )}
        {/*<DataGrid data={filteredData} />*/}
      </div>
    </div>
  );
};
//Console.log(filteredData, "filterdata");


export default PAEngineConfiguration;