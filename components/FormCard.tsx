"use client";

import Image from "next/image";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { NavBackground } from "@lib/icons";
import { steps, plans, addons, formatCurrency, sum } from "@lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFormSchema, formSchema } from "@lib/schema";

export const FormNav = ({ currentStep }: { currentStep: number }) => {
  return (
    <nav
      aria-label="Progress"
      className="relative h-[10.75rem] w-full md:h-[35.5rem] md:max-w-[17.125rem] md:overflow-hidden md:rounded-lg"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full object-cover md:inset-y-0 md:left-0">
        <NavBackground />
      </div>
      <ol
        role="list"
        className="z-20 mt-8 flex items-center justify-center gap-4 md:mt-10 md:flex-col md:items-start md:gap-8 md:pl-8"
      >
        {steps.map((step, index) => (
          <li key={step.id} className="">
            <div className="z-20 flex items-center justify-start md:gap-4">
              <div
                className={` ${index + 1 === currentStep ? "border-clr-light-blue bg-clr-light-blue text-clr-marine-blue" : "border-white text-white"} flex size-10 items-center justify-center rounded-full border font-bold transition-all duration-300 ease-in-out`}
              >
                {index + 1}
              </div>
              <div className="hidden md:grid">
                <p className="text-sm font-normal uppercase text-clr-light-blue">
                  {step.id}
                </p>
                <h2 className="text-sm font-bold uppercase text-white">
                  {step.name}
                </h2>
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
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      billingPlan: defaultPlan,
      billingCycle: defaultBillingCycle,
      selectedAddons: [],
    },
  });

  const [currentStep, setCurrentStep] = useState(4);

  const selectedPlan = watch("billingPlan", { name: "Arcade", price: 9 });
  const billingCycle = watch("billingCycle", "monthly");
  const selectedAddons = watch("selectedAddons", []);

  console.log("current step is: ", currentStep);
  console.log("steps are: ", steps.length);

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

  const onSubmit = (data: TFormSchema) => {
    console.log(data);
    reset();
  };

  // grid w-full gap-6 md:grid-cols-2
  return (
    <div className="relative flex h-full w-full flex-col md:flex-row md:justify-between md:gap-1">
      {/* relative flex h-full w-full flex-col md:grid md:grid-cols-2 */}
      {/* className="flex h-full w-full flex-col justify-between gap-6 md:grid md:grid-cols-2" */}
      <FormNav currentStep={currentStep} />
      {/* with flex due to the footer, the layout on step 3 is sht */}
      <form
        className="md:transparent mb-10 md:relative md:mb-0 md:w-full md:max-w-[450px]"
        onSubmit={handleSubmit(onSubmit)}

        // className="mx-4 -mt-[4.5rem] grid gap-4 rounded-lg bg-white px-6 py-8 md:mt-0"
      >
        {/* Step 1 */}
        {currentStep === 1 && (
          <section className="mx-4 grid -translate-y-[4.5rem] rounded-lg bg-white px-6 py-8 md:mt-0">
            <div className="mb-6 grid gap-3">
              <h1 className="text-2xl font-bold text-clr-marine-blue md:text-[2rem]">
                {steps[currentStep - 1].title}
              </h1>
              <p className="text-clr-cool-gray">
                {steps[currentStep - 1].description}
              </p>
            </div>
            <div>
              <Label
                htmlFor="name"
                className="text-xs font-normal text-clr-marine-blue md:text-sm"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="e.g. Stephen King"
                {...register("name")}
                aria-describedby="name-error"
                className={`mt-1 text-base font-medium text-clr-marine-blue focus-visible:ring-clr-purplish-blue ${errors.name ? "ring-2 ring-clr-strawberry ring-offset-2" : ""} `}
              />
              <div
                id="name-error"
                aria-live="polite"
                className="mt-[0.375rem] flex h-4 w-full items-center justify-end md:h-6"
              >
                {errors.name && (
                  <p className="text-sm font-bold text-clr-strawberry">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-xs font-normal text-clr-marine-blue md:text-sm"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="e.g. stephenking@lorem.com"
                {...register("email")}
                aria-describedby="email-error"
                className={`mt-1 text-base font-medium text-clr-marine-blue focus-visible:ring-clr-purplish-blue ${errors.email ? "ring-2 ring-clr-strawberry ring-offset-2" : ""} `}
              />
              <div
                id="email-error"
                aria-live="polite"
                className="mt-[0.375rem] flex h-4 w-full items-center justify-end md:h-6"
              >
                {errors.email && (
                  <p className="text-sm font-bold text-clr-strawberry">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="phoneNumber"
                className="text-xs font-normal text-clr-marine-blue md:text-sm"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="number"
                placeholder="e.g. +1 234 567 890"
                {...register("phoneNumber")}
                aria-describedby="phoneNumber-error"
                className={`mt-1 text-base font-medium text-clr-marine-blue focus-visible:ring-clr-purplish-blue ${errors.phoneNumber ? "ring-2 ring-clr-strawberry ring-offset-2" : ""} `}
              />
              <div
                id="phoneNumber-error"
                aria-live="polite"
                className="mt-[0.375rem] flex h-4 w-full items-center justify-end md:h-6"
              >
                {errors.phoneNumber && (
                  <p className="text-sm font-bold text-clr-strawberry">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <section className="mx-4 grid -translate-y-[4.5rem] rounded-lg bg-white px-6 py-8 md:mt-0">
            <div className="mb-6 grid gap-3">
              <h2 className="text-2xl font-bold text-clr-marine-blue md:text-[2rem]">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-clr-cool-gray">
                {steps[currentStep - 1].description}
              </p>
            </div>
            <div className="flex w-full max-w-[28.125rem] flex-col items-center justify-between gap-3 md:flex-row md:gap-4">
              {plans.map((plan) => (
                <Label
                  key={plan.name}
                  className={`flex h-auto w-full cursor-pointer items-center justify-start gap-3 rounded-lg border px-4 pb-4 pt-5 hover:border-clr-purplish-blue md:h-[160px] md:w-[138px] md:flex-col md:justify-between md:gap-0 ${selectedPlan.name === plan.name ? "border-clr-purplish-blue bg-clr-alabaster" : "border-clr-light-gray bg-transparent"}`}
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
                    <p className="text-lg font-medium text-clr-marine-blue">
                      {plan.name}
                    </p>
                    <p className="text-sm font-normal text-clr-cool-gray">
                      {billingCycle === "monthly"
                        ? formatCurrency(plan.priceMonthly) + priceTag
                        : formatCurrency(plan.priceYearly) + priceTag}
                    </p>
                    {billingCycle === "yearly" && (
                      <p className="mt-1 text-xs font-normal text-clr-marine-blue">
                        {plan.promoYearly}
                      </p>
                    )}
                  </div>
                </Label>
              ))}
            </div>
            <Label
              htmlFor="billingCycle"
              className="mt-6 flex items-center justify-between gap-2 rounded-lg bg-clr-alabaster px-14 py-[0.875rem]"
            >
              <p>
                <span
                  className={`${billingCycle === "monthly" ? "text-clr-marine-blue" : "text-clr-cool-gray"} text-sm font-medium`}
                >
                  Monthly
                </span>
              </p>
              <Switch
                id="billingCycle"
                {...register("billingCycle")}
                value={billingCycle}
                checked={billingCycle === "yearly"}
                onCheckedChange={handleBillingCycleChange}
              />
              <p>
                <span
                  className={`${billingCycle === "yearly" ? "text-clr-marine-blue" : "text-clr-light-gray"} text-sm font-medium`}
                >
                  Yearly
                </span>
              </p>
            </Label>
          </section>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <section className="mx-4 grid -translate-y-[4.5rem] rounded-lg bg-white px-6 py-8 md:mt-0">
            <div className="mb-6 grid gap-3">
              <h2 className="text-2xl font-bold text-clr-marine-blue md:text-[2rem]">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-clr-cool-gray">
                {steps[currentStep - 1].description}
              </p>
            </div>
            <div className="grid gap-4">
              {addons.map((addon) => (
                <Label
                  key={addon.title}
                  className={`flex h-auto w-full items-center justify-between gap-4 rounded-lg border px-4 py-[1.125rem] md:px-6 ${
                    selectedAddons?.some((a) => a.title === addon.title)
                      ? "border-clr-purplish-blue bg-clr-alabaster"
                      : "border-clr-light-gray bg-transparent"
                  }`}
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
                      className="data-[state=checked]:bg-clr-purplish-blue data-[state=checked]:text-white"
                    />
                    <div>
                      <span className="test-sm font-medium text-clr-marine-blue">
                        {addon.title}
                      </span>
                      <p className="mt-2 text-xs font-normal text-clr-cool-gray">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-normal text-clr-purplish-blue">
                    {billingCycle === "monthly"
                      ? "+" + formatCurrency(addon.priceMonthly) + priceTag
                      : "+" + formatCurrency(addon.priceYearly) + priceTag}
                  </span>
                </Label>
              ))}
            </div>
          </section>
        )}
        {/* Step 4 */}
        {/* -mt-[4.5rem] */}
        {currentStep === 4 && (
          <section className="mx-4 grid -translate-y-[4.5rem] rounded-lg bg-white px-6 py-8 md:mx-0 md:translate-y-10 md:bg-transparent md:px-0 md:py-0">
            <div className="mb-6 grid gap-3">
              <h2 className="text-2xl font-bold text-clr-marine-blue md:text-[2rem]">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-clr-cool-gray">
                {steps[currentStep - 1].description}
              </p>
            </div>
            <div className="wrapper grid w-full rounded-lg bg-clr-alabaster px-4 py-4 md:px-6">
              <div className="flexwraper_for_the_plan flex w-full items-center justify-between border-b border-clr-light-gray pb-3 md:pb-6">
                <div className="grid place-items-start">
                  <p className="text-base font-medium text-clr-marine-blue">
                    {getValues("billingPlan.name")}
                    <span className="capitalize">{` (${billingCycle})`}</span>
                  </p>
                  <Button
                    className="rounded-lg bg-transparent px-0 py-2 text-sm font-normal text-clr-cool-gray underline hover:bg-transparent hover:text-clr-purplish-blue md:text-base"
                    onClick={() => setCurrentStep(2)}
                  >
                    Change
                  </Button>
                </div>
                <p>
                  {formatCurrency(getValues("billingPlan.price")) + priceTag}
                </p>
              </div>
              <div className="for_addons pt-3 md:pt-4">
                {getValues("selectedAddons") && (
                  <ul className="grid gap-3 md:gap-4">
                    {getValues("selectedAddons")?.map((addon) => (
                      <li
                        key={addon.title}
                        className="flex items-center justify-between"
                      >
                        <p className="text-sm text-clr-cool-gray">
                          {addon.title}
                        </p>
                        <span className="text-sm text-clr-marine-blue">
                          {"+" + formatCurrency(addon.price) + priceTag}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <p className="mt-6 flex items-center justify-between px-4 text-sm text-clr-cool-gray md:px-6">
              {billingCycle === "monthly"
                ? "Total (per month)"
                : "Total (per year)"}
              <span className="text-base font-bold text-clr-purplish-blue md:text-xl">
                {formatCurrency(
                  sum(
                    getValues("billingPlan.price"),
                    ...(getValues("selectedAddons")?.map(
                      (addon) => addon.price,
                    ) || []),
                  ),
                ) + priceTag}
              </span>
            </p>

            {/* <Button
              type="submit"
              className="hover:bg-grey-900 w-full cursor-pointer bg-green-600 font-bold"
              disabled={isSubmitting}
            >
              Submit
            </Button> */}
          </section>
        )}
        <div className="absolute bottom-0 flex h-[4.5rem] w-full items-center justify-between bg-white px-4 md:w-full md:max-w-[450px] md:bg-yellow-200">
          <Button
            onClick={handlePrevStep}
            className="hover:bg-transperent rounded-lg bg-transparent px-0 py-2 text-sm font-medium text-clr-cool-gray hover:text-clr-marine-blue disabled:invisible md:text-base"
            disabled={currentStep === 1}
          >
            Go Back
          </Button>
          <Button
            onClick={handleNextStep}
            className="cursor-pointer rounded-lg bg-clr-marine-blue px-4 py-2 hover:bg-clr-purplish-blue disabled:bg-red-400"
            disabled={currentStep === steps.length}
          >
            Next Step
          </Button>
        </div>
      </form>
      {/* fix the spacing beetween the footer and the card. Ex step 2 */}

      {/* <div className="flex h-[4.5rem] w-full items-center justify-between bg-white px-4">
        <Button
          onClick={handlePrevStep}
          className="rounded-lg bg-transparent px-0 py-2 text-sm font-medium text-clr-cool-gray hover:text-clr-marine-blue disabled:invisible md:text-base"
          disabled={currentStep === 1}
        >
          Go Back
        </Button>
        <Button
          onClick={handleNextStep}
          className="cursor-pointer rounded-lg bg-clr-marine-blue px-4 py-2 hover:bg-clr-purplish-blue disabled:bg-red-400"
          disabled={currentStep === steps.length}
        >
          Next Step
        </Button>
      </div> */}
    </div>
  );
};

// addons styles step 4
// border step 4
// remove the validFields if unneeded or atleast update the code
// add styles
// test
