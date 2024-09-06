import { TFormSchema } from "@lib/schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "@components/ui/switch";
import { Button } from "@components/ui/button";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { plans, formatCurrency, sum } from "@lib/utils";

type FormStepFinishingUpProps = {
  priceTag: string;
  setCurrentStep: (value: number) => void;
} & Pick<TFormSchema, "billingCycle" | "selectedAddons">;

// setCurrentStep: (value: SetStateAction<number>) => void

const FormStepFinishingUp = ({
  billingCycle,
  //   selectedAddons,
  priceTag,
  setCurrentStep,
}: FormStepFinishingUpProps) => {
  const { register, setValue, getValues, watch } =
    useFormContext<TFormSchema>();
  return (
    <>
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
          <p>{formatCurrency(getValues("billingPlan.price")) + priceTag}</p>
        </div>
        <div className="for_addons pt-3 md:pt-4">
          {getValues("selectedAddons") && (
            <ul className="grid gap-3 md:gap-4">
              {getValues("selectedAddons")?.map((addon) => (
                <li
                  key={addon.title}
                  className="flex items-center justify-between"
                >
                  <p className="text-sm text-clr-cool-gray">{addon.title}</p>
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
        {billingCycle === "monthly" ? "Total (per month)" : "Total (per year)"}
        <span className="text-base font-bold text-clr-purplish-blue md:text-xl">
          {formatCurrency(
            sum(
              getValues("billingPlan.price"),
              ...(getValues("selectedAddons")?.map((addon) => addon.price) ||
                []),
            ),
          ) + priceTag}
        </span>
      </p>
    </>
  );
};

export default FormStepFinishingUp;
