"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TTestSchema, testSchema } from "@lib/schema";

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
    <nav
      aria-label="Progress"
      className="grid-span-1 rounded-lg bg-blue-300 p-4"
    >
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<TTestSchema>({
    resolver: zodResolver(testSchema),
  });

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
    <div className="grid grid-cols-2 gap-2">
      <FormNav currentStep={currentStep} />
      <form className="grid gap-4">
        {/* Step 1 */}
        {currentStep === 1 && (
          <section>
            <div>
              <Label htmlFor="name" className="text-base font-normal">
                Name
              </Label>
              <Input id="name" type="text" placeholder="e.g. Stephen King" />
            </div>
          </section>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <section>
            <div>
              <Label htmlFor="email" className="text-base font-normal">
                Email Address
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="e.g. stephenking@lorem.com"
              />
            </div>
          </section>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <section>
            <div>
              <Label htmlFor="phoneNumber" className="text-base font-normal">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="number"
                placeholder="e.g. +1 234 567 890"
              />
            </div>
          </section>
        )}
      </form>
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
