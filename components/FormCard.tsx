"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TTestSchema, testSchema } from "@lib/schema";

const validFields: Array<keyof TTestSchema> = ["name", "email", "phoneNumber"];
const steps = [
  {
    id: "Step 1",
    name: "Your info",
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
    fields: ["name", "email", "phoneNumber"] as const,
  },
  {
    id: "Step 2",
    name: "Select plan",
    title: "Select your plan",
    description: "You have the option of monthly or yearly billing.",
    fields: ["Arcade", "Advanced", "Pro"] as const,
  },
  {
    id: "Step 3",
    name: "Add-ons",
    title: "Pick add-ons",
    description: "Add-ons help enhance your gaming experience.",
    fields: [
      "Online service",
      "Larger storage",
      "Customizable profile",
    ] as const,
  },
  {
    id: "Step 4",
    name: "Summary",
    title: "Finishing up",
    description: "Double-check everything looks OK before confirming.",
    fields: [] as const,
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
    trigger,
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

  const handleNextStep = async () => {
    if (currentStep === steps.length) {
      return;
    }

    const currentFields = steps[currentStep].fields;
    const fieldsToValidate = currentFields.filter((field) =>
      validFields.includes(field as keyof TTestSchema),
    ) as Array<keyof TTestSchema>;

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      console.log("Validation passed. Moving to the next step.");
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      console.log("Validation failed. Staying on the current step.");
      console.log(errors);
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const onSubmit = (data: TTestSchema) => {
    console.log(data);
    reset();
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <FormNav currentStep={currentStep} />
      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 */}
        {currentStep === 1 && (
          <section>
            <div>
              <Label htmlFor="name" className="text-base font-normal">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Stephen King"
                {...register("name")}
                aria-describedby="name-error"
              />
              <div
                id="name-error"
                aria-live="polite"
                className="flex h-6 w-full items-center justify-start"
              >
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>
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
                {...register("email")}
                aria-describedby="email-error"
              />
              <div
                id="email-error"
                aria-live="polite"
                className="flex h-6 w-full items-center justify-start"
              >
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>
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
                {...register("phoneNumber")}
                aria-describedby="phoneNumber-error"
              />
              <div
                id="phoneNumber-error"
                aria-live="polite"
                className="flex h-6 w-full items-center justify-start"
              >
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
        <Button
          type="submit"
          className="hover:bg-grey-900 w-full cursor-pointer bg-green-600 font-bold"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={handlePrevStep}
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

//! Backup logic
// const handleNextStep = async () => {
//   if (currentStep === steps.length) {
//     return;
//   }

//   if (currentStep === 1) {
//     const isStepValid = await trigger("name");

//     if (isStepValid) {
//       console.log("Validation passed. Moving to the next step.");
//       setCurrentStep((prevStep) => prevStep + 1);
//     } else {
//       console.log("Validation failed. Staying on the current step.");
//       console.log(errors);
//     }
//   }
//   if (currentStep === 2) {
//     const isStepValid = await trigger("email");

//     if (isStepValid) {
//       console.log("Validation passed. Moving to the next step.");
//       setCurrentStep((prevStep) => prevStep + 1);
//     } else {
//       console.log("Validation failed. Staying on the current step.");
//       console.log(errors);
//     }
//   }
//   if (currentStep === 3) {
//     const isStepValid = await trigger("phoneNumber");

//     if (isStepValid) {
//       console.log("Validation passed. Moving to the next step.");
//       setCurrentStep((prevStep) => prevStep + 1);
//     } else {
//       console.log("Validation failed. Staying on the current step.");
//       console.log(errors);
//     }
//   }
// };
