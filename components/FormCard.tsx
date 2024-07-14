"use client";

import { useState } from "react";

const steps = [
  {
    id: "Step 1",
    name: "Your info",
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
    fields: ["name", "email", "phoneNumber"],
  },
  {
    id: "Step 2",
    name: "Select plan",
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    fields: ["Arcade", "Advanced", "Pro"],
  },
  {
    id: "Step 3",
    name: "Add-ons",
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    fields: ["Online service", "Larger storage", "Customizable profile"],
  },
  {
    id: "Step 4",
    name: "Summary",
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
    fields: [],
  },
];

export const FormNav = ({ currentStep }: { currentStep: number }) => {
  return (
    <nav aria-label="Progress" className="rounded-lg bg-blue-300 p-4">
      <ol role="list" className="grid gap-4">
        {steps.map((step, index) => (
          <li key={step.id} className="rounded-lg bg-slate-300 px-6 py-2">
            <div className="flex items-center justify-start gap-6">
              <div
                className={` ${index + 1 === currentStep ? "bg-green-500" : ""} flex size-10 items-center justify-center rounded-full border border-slate-950`}
              >
                {index + 1}
              </div>
              <div className="grid">
                <p>{step.id}</p>
                <h2>{step.name}</h2>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export const FormCard = () => {
  const [currentStep, setCurrentStep] = useState(1);

  console.log("current step is: ", currentStep);
  console.log("steps are: ", steps.length);

  const handleNextStep = () => {
    if (currentStep === steps.length) {
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <FormNav currentStep={currentStep} />
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handlePrevStep}
          //   className={` ${currentStep === 1 ? "bg-red-400" : "bg-blue-400"} rounded-lg px-4 py-2`}
          className="rounded-lg bg-blue-400 px-4 py-2 disabled:bg-red-400"
          disabled={currentStep === 1}
        >
          Go Back
        </button>
        <button
          onClick={handleNextStep}
          className="rounded-lg bg-blue-400 px-4 py-2 disabled:bg-red-400"
          disabled={currentStep === steps.length}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};
