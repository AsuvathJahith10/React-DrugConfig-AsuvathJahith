import React, { useState, useEffect } from "react";
import RulesSetDetails from './RuleSetDetails';
import DrugList from './RuleSetDrugList';
const StepCircle = ({ isActive, isCompleted, isLast }) => (
    <>
        <div
            style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isActive || isCompleted ? "Navy" : "#ccc",
                border: "1px solid Navy",
                zIndex: 1,
            }}
        ></div>
        {!isLast && (
            <div
                style={{
                    flex: 1,
                    height: 4,
                    backgroundColor: isCompleted ? "Navy" : "#ccc",
                    margin: "0 4px",
                    zIndex: 0,
                }}
            />
        )}
    </>
);

const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext, onSaveDraft, onCancel, hide=false }) => (
    <div className="row" style={{ display: "flex", justifyContent: "space-between", marginTop: 11, marginBottom: 10}}>
        <div className="col-md-auto align-self-center">
            <div className="row">
                <div className="col-auto">
                    <button className="Button" onClick={onCancel} >
                        Cancel
                    </button>
                </div>

                <div className="col-auto">
                    <button className="PrimaryButton" onClick={onSaveDraft} >
                        Save Draft
                    </button>
                </div>
            </div>
        </div>
        <div className="col-md-auto align-self-center" style={{ justifyContent: "center", fontSize:12 }}>Step {currentStep} of {totalSteps}</div>
        <div className="col-md-auto align-self-center">
            <div className="row" style={{ justifyContent: "end" }}>
                <div className="col-auto">
                    <button className="Button" onClick={onPrev} disabled={currentStep === 1} style={{visibility: hide ? "hidden" : "visible" }}>
                        Back
                    </button>
                </div>

                <div className="col-auto" style={{ paddingRight:5 }}>
                    <button className="PrimaryButton" onClick={onNext} disabled={currentStep === totalSteps} >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const RuleSetWizard = ({
    onTitleChange,
    onCancel,
    onSaveDraft
}) => {

    useEffect(() => {
        onTitleChange("New RuleSet Configuration");
    }, [onTitleChange])

    const totalSteps = 5;
    

    const [currentStep, setCurrentStep] = useState(1);
    const [stepErrors, setStepErrors] = useState('');

    const handleResetErrors = () => {
        setStepErrors(""); // Clear the errors when reset is triggered
    };

    const handleNext = () => {
        //if (currentStep < totalSteps) setCurrentStep(currentStep + 1);

        const currentStepData = stepData[currentStep];

        let errors = {};

        // Step-specific validation
        if (currentStep === 1) {
            errors = validateStep1(currentStepData);
        } else if (currentStep === 2) {
            errors = validateStep2(currentStepData);
        }

        // If there are errors, stop navigation
        if (Object.keys(errors).length > 0) {
            setStepErrors(errors);
        } else {
            setStepErrors(errors);
            // Otherwise, move to the next step
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        }
    };

    // Step 1 validation
    const validateStep1 = (data) => {
        const errors = {};

        if (!data.Name) {
            errors.Name = "Name is required.";
        }
        else {
            errors.Name = "";
        }

        if (!data.RuleSetName) {
            errors.RuleSetName = "RuleSet Name is required.";
        }
        else {
            errors.RuleSetName = "";
        }

        if (!data.EffectiveDate) {
            errors.EffectiveDate = "Effective Date is required.";
        }
        else {
            errors.effectiveDate = "";
        }

        if (!data.TermDate) {
            errors.TermDate = "Term Date is required.";
        } else {
            errors.termDate = "";
        }

        if (data.EffectiveDate && data.TermDate) {
            const effectiveDate = new Date(data.EffectiveDate);
            const termDate = new Date(data.TermDate);
            if (effectiveDate > termDate) {
                errors.TermDate = "Term Date must be after Effective Date.";
            }
            else {
                errors.termDate = "";
            }
        }

        if (!data.Type) {
            errors.Type = "Type is required.";
        }
        else {
            errors.Type = "";   
        }

        if (!data.DrugApprovalLevel) {
            errors.DrugApprovalLevel = "Drug Approval Level is required.";
        }
        else {
            errors.DrugApprovalLevel = "";
        }


        const errorMsg1 = errors.Name ? (errors.Name) + '<br>' : '';
        const errorMsg2 = errors.RuleSetName ? (errors.RuleSetName) + '<br>' : '';
        const errorMsg3 = errors.EffectiveDate ? (errors.EffectiveDate) + '<br>' : '';
        const errorMsg4 = errors.TermDate ? (errors.TermDate) + '<br>' : '';
        const errorMsg5 = errors.Type ? (errors.Type) + '<br>' : '';
        const errorMsg6 = errors.DrugApprovalLevel ? (errors.DrugApprovalLevel) + '<br>' : '';

        const errorMsgAll = errorMsg1 + errorMsg2 + errorMsg3 + errorMsg4 + errorMsg5 + errorMsg6

        return errorMsgAll;
    };

    // Step 2 validation
    const validateStep2 = (data) => {
        const errors = {};

        if (data.includedDrugs.length === 0) {
            errors.includedDrugs = "At least one drug must be included.";
        }

        //if (data.excludedDrugs.length === 0) {
        //    errors.excludedDrugs = "At least one drug must be excluded.";
        //}

        const errorMsg1 = errors.includedDrugs ? (errors.includedDrugs) + '<br>' : '';
        //const errorMsg2 = errors.RuleSetName ? (errors.RuleSetName) + '<br>' : '';

        const errorMsgAll = errorMsg1

        return errorMsgAll;
    };


    const handlePrev = () => {
        let errors = {};
        setStepErrors(errors);
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    // State object storing form data per step
    const [stepData, setStepData] = useState({
        1: {},  // For RulesSetDetails
        2: { includedDrugs: [], excludedDrugs: [] },  // For DrugList
        3: {},
        4: {},
        5: {}
    });

    // Update data for a given step
    const updateStepData = (step, data) => {
        setStepData(prev => ({
            ...prev,
            [step]: data
        }));
    };

    // Handle changes in the DrugList (include/exclude drugs)
    const handleInExdataChange = (newInExdata) => {
        const { includeGrid, excludeGrid } = newInExdata;

        // Update the stepData for Step 2 with new include/exclude drugs
        updateStepData(2, {
            includedDrugs: includeGrid,
            excludedDrugs: excludeGrid
        });
    };

    // Define step components inline
    //const Step1 = () => <div>Content for Step 1</div>;
    // const Step2 = () => <div>Content for Step 2</div>;
    const Step3 = () => <div>Content for Step 3</div>;
    const Step4 = () => <div>Content for Step 4</div>;
    const Step5 = () => <div>Content for Step 5</div>;

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <RulesSetDetails data={stepData[1]} onChange={data => updateStepData(1, data)} errors={stepErrors} onResetErrors={handleResetErrors} />;
            case 2:
                return <DrugList
                    InExdata={{
                        includeGrid: stepData[2].includedDrugs,
                        excludeGrid: stepData[2].excludedDrugs
                    }}
                    onChange={handleInExdataChange}
                    errors={stepErrors}
                />
            case 3:
                return <Step3 />;
            case 4:
                return <Step4 />;
            case 5:
                return <Step5 />;
            default:
                return <RulesSetDetails />;
        }
    };

    // On Save Draft, collect all data up to current step and call prop
    const handleSaveDraft = () => {
        const dataUpToCurrentStep = {};
        const currentStepData = stepData[currentStep];

        let errors = {};

        // Step-specific validation
        if (currentStep === 1) {
            errors = validateStep1(currentStepData);
        } else if (currentStep === 2) {
            errors = validateStep2(currentStepData);
        }

        // If there are errors, stop navigation
        if (Object.keys(errors).length > 0) {
            setStepErrors(errors);
        } else {
            setStepErrors(errors);
            // Otherwise, move to the next step
            for (let i = 1; i <= currentStep; i++) {
                dataUpToCurrentStep[i] = stepData[i];
            }
            onSaveDraft(currentStep, dataUpToCurrentStep);
        }


       
    };

    return (
        <div className="container" style={{ padding:0 }}> {/*style={{ margin: "40px auto" }}*/}
            {/* Progress bar */}
            <div className="row " style={{ justifyContent: "end", position: "relative", zIndex: 10, marginTop:-31}}>
                <div className="col-auto">

                    <div 
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: 10,
                            width: '250px'
                        }}
                    >
                        {Array.from({ length: totalSteps }).map((_, i) => {
                            const stepNum = i + 1;
                            return (
                                <StepCircle
                                    key={stepNum}
                                    isActive={stepNum === currentStep}
                                    isCompleted={stepNum < currentStep}
                                    isLast={stepNum === totalSteps}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Navigation buttons */}
            <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onSaveDraft={handleSaveDraft}
                onCancel={onCancel}
                onPrev={handlePrev}
                onNext={handleNext}
                hide={true}
            />
            {/* Step content */}
            <div
                style={{
                    border: "1px solid #ddd",
                    padding: 20,
                    borderRadius: 4,
                    minHeight: 120,
                    fontSize: 16
                }}
            >
                {renderStep()}
            </div>

            {/* Navigation buttons */}
            <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onSaveDraft={handleSaveDraft}
                onCancel={onCancel}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </div>
    );
};

export default RuleSetWizard;
