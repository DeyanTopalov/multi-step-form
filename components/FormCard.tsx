"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TTestSchema, testSchema } from "@lib/schema";
import { steps, plans, addons, formatCurrency } from "@lib/utils";
import Image from "next/image";

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
  const defaultPlan = { name: "Arcade", price: 9 };
  const defaultBillingCycle = "monthly";
  const {
    register,
    trigger,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
  } = useForm<TTestSchema>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      billingPlan: defaultPlan,
      billingCycle: defaultBillingCycle,
      selectedAddons: [],
    },
  });

  const [currentStep, setCurrentStep] = useState(1);

  const selectedPlan = watch("billingPlan", { name: "Arcade", price: 9 });
  const billingCycle = watch("billingCycle", "monthly");
  const selectedAddons = watch("selectedAddons", []);

  console.log("current step is: ", currentStep);
  console.log("steps are: ", steps.length);

  type FieldName = keyof TTestSchema;
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

    console.log(
      "fields are: ",
      getValues([
        "name",
        "email",
        "phoneNumber",
        "billingPlan",
        "billingCycle",
        "selectedAddons",
      ]),
    );
  };

  const handlePrevStep = () => {
    if (currentStep === 1) {
      return;
    }
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handlePlanChange = (plan: (typeof plans)[0]) => {
    const price =
      billingCycle === "monthly" ? plan.priceMonthly : plan.priceYearly;
    setValue("billingPlan", { name: plan.name, price });
  };

  const handleBillingCycleChange = () => {
    const newCycle = billingCycle === "monthly" ? "yearly" : "monthly";
    setValue("billingCycle", newCycle);

    // Update the plan price according to the new billing cycle
    const selectedPlan = getValues("billingPlan");
    const updatedPrice =
      newCycle === "monthly"
        ? plans.find((plan) => plan.name === selectedPlan.name)?.priceMonthly
        : plans.find((plan) => plan.name === selectedPlan.name)?.priceYearly;
    if (updatedPrice !== undefined) {
      setValue("billingPlan", { ...selectedPlan, price: updatedPrice });
    }
  };

  const handleAddonChange = (addon: (typeof addons)[0]) => {
    const currentAddons = getValues("selectedAddons") ?? [];
    const isSelected = currentAddons.some((item) => item.title === addon.title);

    const updatedAddons = isSelected
      ? currentAddons.filter((item) => item.title !== addon.title)
      : [
          ...currentAddons,
          {
            title: addon.title,
            price:
              billingCycle === "monthly"
                ? addon.priceMonthly
                : addon.priceYearly,
          },
        ];

    setValue("selectedAddons", updatedAddons);
  };

  const priceTag = billingCycle === "monthly" ? "/mo" : "/yr";

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
              <h1>{steps[currentStep - 1].title}</h1>
              <p>{steps[currentStep - 1].description}</p>
            </div>
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

        {/* Step 2 */}
        {currentStep === 2 && (
          <section>
            <div>
              <h2>{steps[currentStep - 1].title}</h2>
              <p>{steps[currentStep - 1].description}</p>
            </div>
            <div className="flex w-full max-w-[28.125rem] items-center justify-between gap-4">
              {plans.map((plan) => (
                <Label
                  key={plan.name}
                  className={`flex h-[160px] w-[138px] cursor-pointer flex-col justify-between rounded-lg border px-4 pb-4 pt-5 ${selectedPlan.name === plan.name ? "border-green-400 bg-blue-200" : "border-gray-400 bg-red-200"}`}
                >
                  <Input
                    type="radio"
                    id={`plan-${plan.name}`}
                    {...register("billingPlan.name")}
                    value={plan.name}
                    checked={selectedPlan.name === plan.name}
                    onChange={() => handlePlanChange(plan)}
                    className="hidden"
                  />
                  <Image
                    src={plan.image}
                    width={40}
                    height={40}
                    alt={plan.name}
                    className="size-10 rounded-full"
                  />
                  <div>
                    <p className="text-lg font-bold">{plan.name}</p>
                    <p className="text-sm font-normal">
                      {billingCycle === "monthly"
                        ? formatCurrency(plan.priceMonthly) + priceTag
                        : formatCurrency(plan.priceYearly) + priceTag}
                    </p>
                    {billingCycle === "yearly" && (
                      <p className="text-sm font-normal">{plan.promoYearly}</p>
                    )}
                  </div>
                </Label>
              ))}
            </div>
            <Label
              htmlFor="billingCycle"
              className="mt-2 flex items-center justify-between gap-2"
            >
              <p>
                <span>Monthly</span>
              </p>
              <Switch
                id="billingCycle"
                {...register("billingCycle")}
                value={billingCycle}
                checked={billingCycle === "yearly"}
                onCheckedChange={handleBillingCycleChange}
              />
              <p>
                <span>Yearly</span>
              </p>
            </Label>
          </section>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <section>
            <div>
              <h2>{steps[currentStep - 1].title}</h2>
              <p>{steps[currentStep - 1].description}</p>
            </div>
            <div className="grid gap-4">
              {addons.map((addon) => (
                <Label
                  key={addon.title}
                  className="flex items-center justify-between gap-4 rounded-lg border border-slate-950 px-6 py-[1.125rem]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <Checkbox
                      id={`addon-${addon.title}`}
                      {...register("selectedAddons")}
                      value="" // need to start with empty value so it's
                      // successfully registered once checked
                      checked={selectedAddons?.some(
                        (a) => a.title === addon.title,
                      )}
                      onCheckedChange={() => handleAddonChange(addon)}
                    />
                    <div>
                      <span>{addon.title}</span>
                      <p>{addon.description}</p>
                    </div>
                  </div>
                  <span>
                    {billingCycle === "monthly"
                      ? formatCurrency(addon.priceMonthly) + priceTag
                      : formatCurrency(addon.priceYearly) + priceTag}
                  </span>
                </Label>
              ))}
            </div>
          </section>
        )}
        {/* Step 4 */}
        {currentStep === 4 && (
          <section>
            <div>
              <h2>{steps[currentStep - 1].title}</h2>
              <p>{steps[currentStep - 1].description}</p>
            </div>
            <p>{getValues("name")}</p>
            <p>{getValues("email")}</p>
            <p>{getValues("phoneNumber")}</p>
            <p>{getValues("billingPlan.name")}</p>
            <p>{getValues("billingPlan.price")}</p>
            <p>{getValues("billingCycle")}</p>
            {getValues("selectedAddons") && (
              <ul>
                {getValues("selectedAddons")?.map((addon) => (
                  <li key={addon.title}>
                    {addon.title + " " + formatCurrency(addon.price)}
                  </li>
                ))}
              </ul>
            )}
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

// remove the validFields if unneeded or atleast update the code
// add styles

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
