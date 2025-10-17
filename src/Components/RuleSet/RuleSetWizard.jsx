import React, { useState } from "react";
import RulesSetDetails from './RuleSetDetails';
import DrugList from './RuleSetDrugList';
const StepCircle = ({ isActive, isCompleted, isLast }) => (
    <>
        <div
            style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                backgroundColor: isActive || isCompleted ? "#0052cc" : "#ccc",
                border: "1px solid #0052cc",
                zIndex: 1,
            }}
        ></div>
        {!isLast && (
            <div
                style={{
                    flex: 1,
                    height: 4,
                    backgroundColor: isCompleted ? "#0052cc" : "#ccc",
                    margin: "0 4px",
                    zIndex: 0,
                }}
            />
        )}
    </>
);

const NavigationButtons = ({ currentStep, totalSteps, onPrev, onNext }) => (
    <div className="row" style={{ display: "flex", justifyContent: "space-between", marginTop: 20, marginBottom: 20 }}>
        <div className="col-md-4">
            <div className="row">
                <div className="col-auto">
                    <button className="Button" onClick={onPrev} >
                        Cancel
                    </button>
                </div>

                {/*<div className="col-auto">*/}
                {/*    <button className="PrimaryButton" onClick={onNext} >*/}
                {/*        Save Draft*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </div>
        <div className="col-md-4 offset-md-4">
            <div className="row" style={{ justifyContent: "end" }}>
                <div className="col-auto">
                    <button className="Button" onClick={onPrev} disabled={currentStep === 1} >
                        Back
                    </button>
                </div>

                <div className="col-auto">
                    <button className="PrimaryButton" onClick={onNext} disabled={currentStep === totalSteps} >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const RuleSetWizard = ({
    onTitleChange
}) => {

    const newTitle = "New RuleSet Configuration";
    onTitleChange(newTitle); 

    const totalSteps = 5;
    

    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
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
                return <RulesSetDetails />;
            case 2:
                return <DrugList />;
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

    return (
        <div className="container" > {/*style={{ margin: "40px auto" }}*/}
            {/* Progress bar */}
            <div className="row">
                <div className="col-md-4">
                </div>
                <div className="col-md-4 offset-md-4">

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
            {/*<NavigationButtons*/}
            {/*    currentStep={currentStep}*/}
            {/*    totalSteps={totalSteps}*/}
            {/*    onPrev={handlePrev}*/}
            {/*    onNext={handleNext}*/}
            {/*/>*/}

            {/* Step content */}
            <div
                style={{
                    border: "1px solid #ddd",
                    padding: 20,
                    borderRadius: 4,
                    minHeight: 120,
                    fontSize: 16,
                }}
            >
                {renderStep()}
            </div>

            {/* Navigation buttons */}
            <NavigationButtons
                currentStep={currentStep}
                totalSteps={totalSteps}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </div>
    );
};

export default RuleSetWizard;
