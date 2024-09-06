import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "@components/ui/switch";
import Image from "next/image";
import { TFormSchema } from "@lib/schema";
import { useFormContext } from "react-hook-form";
import { plans, formatCurrency } from "@lib/utils";

type FormStepPlanSelectProps = { priceTag: string } & Pick<
  TFormSchema,
  "billingCycle"
>;

// Step 2
const FormStepPlanSelect = ({
  billingCycle,
  priceTag,
}: FormStepPlanSelectProps) => {
  const { register, setValue, getValues, watch } =
    useFormContext<TFormSchema>();

  const selectedPlan = watch("billingPlan", { name: "Arcade", price: 9 });

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

  return (
    <>
      <div className="flex w-full max-w-[28.125rem] flex-col items-center justify-between gap-3 md:flex-row md:gap-4">
        {plans.map((plan) => (
          <Label
            key={plan.name}
            className={`flex h-auto w-full cursor-pointer items-center justify-start gap-3 rounded-lg border px-4 pb-4 pt-5 hover:border-clr-purplish-blue md:h-[10rem] md:w-[8.625rem] md:flex-col md:items-start md:justify-between md:gap-0 ${selectedPlan.name === plan.name ? "border-clr-purplish-blue bg-clr-alabaster" : "border-clr-light-gray bg-transparent"}`}
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
    </>
  );
};

export default FormStepPlanSelect;
