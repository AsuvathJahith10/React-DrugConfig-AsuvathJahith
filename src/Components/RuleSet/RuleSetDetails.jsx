import React from 'react';
import "../../App.css";

const RulesSetDetails = () => {
    return (
        <div>
            <div className="FilterRow">
                Create RuleSet
            </div>
            <div className="FilterRow">
                1.RuleSet Details
            </div>
            <div className="FilterRow">
                <label className="FilterLabel" htmlFor="name">Name</label>
                <input
                    id="name"
                    className="FilterInput"
                    type="text"
                    maxLength={50}
                    style={{ minWidth: "300px", flex: "1 1 auto", maxWidth: "500px" }}
                />
            </div>
            <div className="FilterRow">
                <label className="FilterLabel" htmlFor="rulesetname">RuleSet Name</label>
                <input
                    id="rulesetname"
                    className="FilterInput"
                    type="text"
                    maxLength={50}
                    style={{ minWidth: "300px", flex: "1 1 auto", maxWidth: "500px" }}
                />
            </div>
            <div className="FilterRow">
                <label className="FilterLabel" htmlFor="subtitle">sub Title</label>
                <input
                    id="subtitle"
                    className="FilterInput"
                    type="text" s
                    maxLength={50}
                    style={{ minWidth: "300px", flex: "1 1 auto", maxWidth: "500px" }}
                />
            </div>

            <div className="FilterRow">
                <div>
                    <label className="FilterLabel" htmlFor="type">Type</label>
                    <select
                        id="type"
                        className="DropDownList FilterInput">
                        <option value="IsClinical">Clinical</option>
                        <option value="IsPDL">PDL</option>
                    </select>
                </div>

                <div >
                    <label className="FilterLabel" htmlFor="fromDate">Effective Date:</label>
                    <input
                        id="fromDate"
                        className="FilterInput"
                        type="date"
                    />
                </div>

                <div >
                    <label className="FilterLabel" htmlFor="toDate" style={{ marginLeft: 24 }}>Term Date:</label>
                    <input
                        id="toDate"
                        className="FilterInput"
                        type="date"
                    />
                </div>
            </div>

            <div className="FilterRow">
                <label className="FilterLabel" htmlFor="drugapprovallevel">Drug Approval Level</label>
                <select
                    id="drugapprovallevel"
                    className="DropDownList FilterInput">
                    <option value="2">GCNSeqNo</option>
                    <option value="5">HICLSeqNo</option>
                </select>
            </div>
        </div>
    )
}
export default RulesSetDetails;