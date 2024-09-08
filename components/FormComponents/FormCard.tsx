"use client";

import { Button } from "../ui/button";
import FormSuccessScreen from "./FormSuccessScreen";
import FormStepPersonalInfo from "./FormStepPersonalInfo";
import FormStepPlanSelect from "./FormStepPlanSelect";
import FormStepAddonsSelect from "./FormStepAddonsSelect";
import FormStepFinishingUp from "./FormStepFinishingUp";
import FormNav from "./FormNav";
import { steps, getPriceTag } from "../../lib/utils";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormSchema, formSchema } from "../../lib/schema";

export const FormCard = () => {
  const defaultPlan = { name: "Arcade", price: 9 };
  const defaultBillingCycle = "monthly";

  const methods = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      billingPlan: defaultPlan,
      billingCycle: defaultBillingCycle,
      selectedAddons: [],
    },
  });

  const {
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = methods;

  const [currentStep, setCurrentStep] = useState(1);
  const [formCompleted, setFormCompleted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const billingCycle = watch("billingCycle", "monthly");
  const selectedAddons = watch("selectedAddons", []);

  type FieldName = keyof TFormSchema;
  // needed for type safety, so we make sure that only valid fields present in the schema will be passed to the trigger function
  const handleNextStep = async () => {
    if (currentStep === steps.length) {
      return;
    }

    const currentFields = steps[currentStep - 1].fields;
    const isStepValid = await trigger(currentFields as FieldName[], {
      shouldFocus: true,
    });
    // added shouldFocus: true to focus on the field with error

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

  const priceTag = getPriceTag(billingCycle);

  const handleClose = () => {
    setFormCompleted(false);
    setCurrentStep(1);
  };

  const onSubmit = async (data: TFormSchema) => {
    // adding additional check for submission in order to protect against accidental form submission
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
      return;
    } else {
      try {
        const response = await fetch("/api/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to send email");
        }
        reset();
        setFormCompleted(true);
      } catch (error) {
        console.error("Error sending email:", error);
        setSubmitError(
          "An error occurred while sending the email. Please try again.",
        );
      }
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col md:flex-row md:justify-between md:gap-1">
      <FormNav currentStep={currentStep} />
      {formCompleted === false && (
        <FormProvider {...methods}>
          <form
            className="mb-10 md:relative md:mb-0 md:w-full md:max-w-[28.125rem] md:bg-transparent"
            onSubmit={handleSubmit(onSubmit)}
          >
            <section
              key={currentStep}
              className="mx-4 grid -translate-y-[4.5rem] animate-fadein rounded-lg bg-white px-6 py-8 drop-shadow-lg md:mx-0 md:translate-y-10 md:bg-transparent md:px-0 md:py-0 md:drop-shadow-none"
            >
              <div className="mb-6 grid gap-3">
                <h1 className="text-2xl font-bold text-clr-marine-blue md:text-[2rem]">
                  {steps[currentStep - 1].title}
                </h1>
                <p className="text-clr-cool-gray">
                  {steps[currentStep - 1].description}
                </p>
              </div>
              {currentStep === 1 && <FormStepPersonalInfo />}
              {currentStep === 2 && (
                <FormStepPlanSelect
                  billingCycle={billingCycle}
                  priceTag={priceTag}
                />
              )}
              {currentStep === 3 && (
                <FormStepAddonsSelect
                  billingCycle={billingCycle}
                  selectedAddons={selectedAddons}
                  priceTag={priceTag}
                />
              )}
              {currentStep === 4 && (
                <FormStepFinishingUp
                  billingCycle={billingCycle}
                  priceTag={priceTag}
                  setCurrentStep={setCurrentStep}
                />
              )}
            </section>
            {/* Buttons navigation */}
            <div className="absolute bottom-0 flex h-[4.5rem] w-full items-center justify-between bg-white px-4 md:w-full md:max-w-[28.125rem] md:bg-transparent md:px-0">
              <Button
                onClick={handlePrevStep}
                type="button"
                className="hover:bg-transperent rounded-lg bg-transparent px-0 py-2 text-sm font-medium text-clr-cool-gray hover:text-clr-marine-blue disabled:invisible md:text-base"
                disabled={currentStep === 1}
              >
                Go Back
              </Button>
              <Button
                onClick={handleNextStep}
                type="button"
                className="cursor-pointer rounded-lg bg-clr-marine-blue px-4 py-2 hover:bg-clr-purplish-blue disabled:hidden"
                disabled={currentStep === steps.length}
              >
                Next Step
              </Button>
              <Button
                type="submit"
                className={` ${currentStep < 4 ? "hidden" : "block"} cursor-pointer rounded-lg bg-clr-purplish-blue px-6 py-2 font-medium hover:bg-clr-purplish-blue/75 disabled:bg-clr-purplish-blue/75 md:px-8`}
                // added additional check for last step in order to protect against accidental form submission
                disabled={isSubmitting || currentStep < 4}
              >
                {isSubmitting ? "Submitting..." : "Confirm"}
              </Button>
              {submitError && (
                <p className="mt-2 text-sm text-clr-strawberry">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </FormProvider>
      )}

      {formCompleted === true && (
        <FormSuccessScreen handleClose={handleClose} />
      )}
    </div>
  );
};
