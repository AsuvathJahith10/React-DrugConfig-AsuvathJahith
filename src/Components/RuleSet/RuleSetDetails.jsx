import React, { useState } from "react";
import "../../App.css";
import parse from 'html-react-parser';

const RulesSetDetails = () => {

    const defaultFields = {
        Name: "",
        RuleSetName: "",
        SubTitle: "",
        EffectiveDate: "",
        TermDate: "",
        Type: "",
        DrugApprovalLevel: "",
    };

    const [nameError, setNameError] = useState('');
    const [ruleSetNameError, setRuleSetNameError] = useState('');
    const [effectiveDateError, setEffectiveDateError] = useState('');
    const [termDateError, setTermDateError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [drugApprovalLevelError, setDrugApprovalLevelError] = useState('');
    const [errorMessageDetails, setErrorMessageDetails] = useState('');
    const [successMessageInfo, setSuccessMessageInfo] = useState('');

    const onFieldChange = (field, value) => {
        setRuleSetFields(prev => ({ ...prev, [field]: value }));
    };

    const [ruleSetFields, setRuleSetFields] = useState('');

    const handleSaveDraft = (event) => {
        event.preventDefault();
        setErrorMessageDetails('');
        setSuccessMessageInfo('');

        if (!ruleSetFields.Name) {
            setNameError('Name is required.');
        }
        else {
            setNameError('');
        }

        if (!ruleSetFields.RuleSetName) {
            setRuleSetNameError('RuleSet Name is required.');
        }
        else {
            setRuleSetNameError('');
        }


        if (!ruleSetFields.EffectiveDate) {
            setEffectiveDateError('Effective Date is required.');
        } else {
            setEffectiveDateError('');
        }


        if (!ruleSetFields.TermDate) {
            setTermDateError('Term Date is required.');
        } else {
            setTermDateError('');
        }


        if (ruleSetFields.EffectiveDate && ruleSetFields.TermDate) {
            const effectiveDate = new Date(ruleSetFields.EffectiveDate);
            const termDate = new Date(ruleSetFields.TermDate);
            if (effectiveDate > termDate) {
                setTermDateError('Term Date must exceed Effective Date.');
            }
            else {
                setTermDateError('');
            }
        }

        if (!ruleSetFields.Type) {
            setTypeError('Type is required.');
        }
        else {
            setTypeError('');
        }

        if (!ruleSetFields.DrugApprovalLevel) {
            setDrugApprovalLevelError('Drug Approval Level is required.');
        }
        else {
            setDrugApprovalLevelError('');
        }



        const errorMsg1 = nameError ? (nameError) + '<br>' : '';
        const errorMsg2 = ruleSetNameError ? (ruleSetNameError) + '<br>' : '';
        const errorMsg3 = effectiveDateError ? (effectiveDateError) + '<br>' : '';
        const errorMsg4 = termDateError ? (termDateError) + '<br>' : '';
        const errorMsg5 = typeError ? (typeError) + '<br>' : '';
        const errorMsg6 = drugApprovalLevelError ? (drugApprovalLevelError) + '<br>' : '';

        const errorMsgAll = errorMsg1 + errorMsg2 + errorMsg3 + errorMsg4 + errorMsg5 + errorMsg6

        setErrorMessageDetails(errorMsgAll);

        //if (errorMsgAll === '')
        //    setSuccessMessageInfo('New RuleSet Configuration saved successfully!');
        //else
        //    setSuccessMessageInfo('');
    }


    const handleReset = () => {
        setRuleSetFields(defaultFields);
        setNameError('');
        setRuleSetNameError('');
        setEffectiveDateError('');
        setTermDateError('');
        setTypeError('');
        setDrugApprovalLevelError('');
        setErrorMessageDetails('');
        setSuccessMessageInfo('');
    };

    return (
        <div>
            {errorMessageDetails && <div className="ErrorMessage">
                {parse(errorMessageDetails)}</div>}
            {successMessageInfo && <div className="SuccessMessage">
                {successMessageInfo}</div>}

            <div className="SectionLabel">
                RuleSet Info
            </div>

            <div className="input-row-container">
                <div className="input-row FilterRow">
                <label className="FilterLabel" htmlFor="name"><span class="RequiredSymbol">*</span>Name</label>
                <input
                    id="name"
                    className="FilterInput"
                    type="text"
                    maxLength={50}
                    style={{ minWidth: "800px", flex: "1 1 auto", maxWidth: "500px" }}
                    value={ruleSetFields.Name}
                    onChange={e => onFieldChange("Name", e.target.value)}
                />
            </div>
                <div className="FilterRow input-row">
                <label className="FilterLabel" htmlFor="ruleSetName"><span class="RequiredSymbol">*</span>RuleSet Name</label>
                <input
                    id="ruleSetName"
                    className="FilterInput"
                    type="text"
                    maxLength={50}
                    style={{ minWidth: "800px", flex: "1 1 auto", maxWidth: "500px" }}
                    value={ruleSetFields.RuleSetName}
                    onChange={e => onFieldChange("RuleSetName", e.target.value)}
                />
            </div>
                <div className="FilterRow input-row">
                <label className="FilterLabel" htmlFor="subTitle">sub Title</label>
                <input
                    id="subTitle"
                    className="FilterInput"
                    type="text"
                    maxLength={50}
                    style={{ minWidth: "800px", flex: "1 1 auto", maxWidth: "500px" }}
                    value={ruleSetFields.SubTitle}
                    onChange={e => onFieldChange("SubTitle", e.target.value)}
                />
            </div>
                <div className="FilterRow input-row">
                <label className="FilterLabel" htmlFor="effectiveDate"><span class="RequiredSymbol">*</span>Effective Date:</label>
                <input
                    id="effectiveDate"
                    className="FilterInput"
                    type="date"
                    style={{ minWidth: "200px", flex: "1 1 auto", maxWidth: "200px" }}
                    value={ruleSetFields.EffectiveDate}
                    onChange={e => onFieldChange("EffectiveDate", e.target.value)}
                />

                <label className="FilterLabel" htmlFor="termDate" style={{ marginLeft: 14 }}><span class="RequiredSymbol">*</span>Term Date:</label>
                <input
                    id="termDate"
                    className="FilterInput"
                    type="date"
                    style={{ marginLeft: 24, minWidth: "200px", flex: "1 1 auto", maxWidth: "200px" }}
                    value={ruleSetFields.TermDate}
                    onChange={e => onFieldChange("TermDate", e.target.value)}
                />
            </div>
                <div className="FilterLabel input-row">
                <label className="FilterLabel" htmlFor="type"><span class="RequiredSymbol">*</span>Type</label>
                <select
                    id="type"
                    style={{ marginLeft: 10, minWidth: "200px", flex: "1 1 auto", maxWidth: "200px" }}
                    value={ruleSetFields.Type}
                    onChange={e => onFieldChange("Type", e.target.value)}
                    className="DropDownList FilterInput">
                    <option value=""></option>
                    <option value="IsPDL">PDL</option>
                    <option value="IsClinical">Clinical</option>
                </select>
                <label className="FilterLabel" htmlFor="drugApprovalLevel" style={{ marginLeft: 24 }}><span class="RequiredSymbol">*</span>Drug Approval Level</label>
                <select style={{ marginLeft: 24, minWidth: "200px", flex: "1 1 auto", maxWidth: "200px" }}
                    id="drugApprovalLevel"
                    value={ruleSetFields.DrugApprovalLevel}
                    onChange={e => onFieldChange("DrugApprovalLevel", e.target.value)}
                    className="DropDownList FilterInput">
                    <option value=""></option>
                    <option value="GCNSeqNo">GCNSeqNo</option>
                    <option value="HICLSeqNo">HICLSeqNo</option>
                </select>
            </div>
            </div>
            <div className="ButtonRow">
                <button className="PrimaryButton" onClick={handleSaveDraft}>Save Draft</button>
                <button className="Button" onClick={handleReset}>Reset</button>
            </div>

        </div>
    )
}
export default RulesSetDetails;