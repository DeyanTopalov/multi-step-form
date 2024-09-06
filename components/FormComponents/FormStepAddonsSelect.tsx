import { TFormSchema } from "@lib/schema";
import { Label } from "../ui/label";
import { Checkbox } from "@components/ui/checkbox";
import { useFormContext } from "react-hook-form";
import { addons, formatCurrency } from "@lib/utils";

type FormStepAddonsSelectProps = { priceTag: string } & Pick<
  TFormSchema,
  "billingCycle" | "selectedAddons"
>;

// Step 3
const FormStepAddonsSelect = ({
  billingCycle,
  selectedAddons,
  priceTag,
}: FormStepAddonsSelectProps) => {
  const { register, setValue, getValues, watch } =
    useFormContext<TFormSchema>();

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

  return (
    <>
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
                checked={selectedAddons?.some((a) => a.title === addon.title)}
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
    </>
  );
};

export default FormStepAddonsSelect;
