import React, { useState, useEffect, useMemo } from "react";
import SearchBar from '../SearchBar';
import RuleSetWizard from '../RuleSet/RuleSetWizard';


import GridComponent from '../GridComponent';
import 'bootstrap/dist/css/bootstrap.css';
import "../../App.css";

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

const columnAlignments = {
    Name: 'left',
    EffectiveDate: "right",
    TermDate: "right",
    LastModified: "right",
    Status: "left"
};

const columnDisplayNames = {
    Name: "Name",
    EffectiveDate: "Effective Date",
    TermDate: "Term Date",
    LastModified: "Last Modified",
    Status: "Status"
};

const columnWidths = {
    Name: '46%',
    EffectiveDate: '13%',
    TermDate: '13%',
    LastModified: '13%',
    Status: '12%'
}

const columns = ["Name", "EffectiveDate", "TermDate", "LastModified", "Status"];



const RuleSetMaster = () => {
    const [activeComponent, setActiveComponent] = useState('RuleSetSearch');

    const loadRuleSetSearch = () => {
        setActiveComponent('RuleSetSearch');
    };

    const loadRuleSetWizard = () => {
        setIsHidden(true)
        setActiveComponent('RuleSetWizard');
    };

    const [selectedStatus, setSelectedStatus] = useState("Active");
    const [searchFields, setSearchFields] = useState(defaultFields);
    const [filteredData, setFilteredData] = useState([]);

    const [isHidden, setIsHidden] = useState(false);

    const handleFieldChange = (field, value) => {
        setSearchFields(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        const activeData = initialMockData.filter(item => item.Status === "Active");
        setFilteredData(activeData);
    }, []);



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
        // Step 1: Sort filteredData by EffectiveDate descending
        const sorted = [...filteredData].sort((a, b) => new Date(b.EffectiveDate) - new Date(a.EffectiveDate));
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        // Step 2: Format the dates
        return sorted.map(item => {
            const newItem = {};
            columns.forEach(col => {
                if (["EffectiveDate", "TermDate", "LastModified"].includes(col)) {
                    const date = new Date(item[col]);
                    newItem[col] = date.toLocaleDateString("en-US", options); // Format to MM/DD/YYYY
                } else {
                    newItem[col] = item[col];
                }
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

    const [title, setTitle] = useState('RuleSet Configuration - Search');
    const handleTitleChange = (newTitle) => {
        setTitle(newTitle);
    };

    return (
        <div>
            <div className="row mt-2">
                <div className="col-auto me-auto mt-2">
                    <div className="H1">{title}</div>
                </div>
                <div className="col-auto d-flex align-items-center">
                    <button className="PrimaryButton" style={{ display: isHidden ? 'none' : 'block' }} data-bs-toggle="modal" data-bs-target="#exampleModal">New RuleSet</button>
                </div>
            </div>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Create RuleSet
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row form-check">

                                <div className="col-6 me-auto mt-2 form-check form-check-inline"><input
                                    className="form-check-input"
                                    type="radio"
                                    name="myRadioOptions" // Important: Same name for all radios in a group
                                    id="option1"
                                    value="option1" checked="true"
                                />
                                    <label className="form-check-label" htmlFor="option1">
                                        New RuleSet
                                    </label></div>
                                <div className="col-auto form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="myRadioOptions"
                                        id="option2"
                                        value="option2"
                                    />
                                    <label className="form-check-label" htmlFor="option2">
                                        Use existing RuleSet
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="Button"
                                data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="PrimaryButton" data-bs-dismiss="modal" onClick={loadRuleSetWizard}>
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-content mt-3 pb-3">

                {activeComponent === 'RuleSetSearch' && <SearchBar
                    searchFields={searchFields}
                    onFieldChange={handleFieldChange}
                    onSearch={handleSearch}
                    onReset={handleReset}
                />
                }
                {activeComponent === 'RuleSetSearch' && filteredData && filteredData.length > 0 ? (
                    /* <GridComponent title={selectedStatus} Orgdata={cleanedData} />*/
                    <GridComponent title={selectedStatus + " RuleSets"} Orgdata={cleanedData} columnAlignments={columnAlignments} columnDisplayNames={columnDisplayNames} columnWidths={columnWidths} showEditButtonColumn={true} />
                ) : activeComponent === 'RuleSetSearch' ? (
                    <p>No Data found</p>
                ) : (<p></p>)}

                {activeComponent === 'RuleSetWizard' && <RuleSetWizard
                    onTitleChange={handleTitleChange}

                />}
            </div>
        </div>
    )
};
export default RuleSetMaster;