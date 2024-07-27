"use client";
import { addons } from "@lib/utils";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";
import { Switch } from "./ui/switch";

const AddonsCard = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  //   const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  const handleBillingCycleChange = () => {
    setBillingCycle((prevCycle) =>
      prevCycle === "monthly" ? "yearly" : "monthly",
    );
  };

  //   const handleAddonChange = (checked: CheckedState)  => {
  //     if (event.target) {
  //       const addon = event.target.value;
  //       const newSelectedAddons = [...selectedAddons];
  //       if (selectedAddons.includes(addon)) {
  //         newSelectedAddons.splice(newSelectedAddons.indexOf(addon), 1);
  //       } else {
  //         newSelectedAddons.push(addon);
  //       }
  //       setSelectedAddons(newSelectedAddons);
  //     }
  //   };

  return (
    <div className="max-w-[28.125rem]">
      <h1>Pick add-ons</h1>
      <h2>Add-ons help enhance your gaming experience</h2>
      <div className="grid gap-4">
        {addons.map((addon) => (
          <Label
            key={addon.title}
            className="flex items-center justify-between gap-4 rounded-lg border border-slate-950 px-6 py-[1.125rem]"
          >
            <div className="flex items-center justify-between gap-4">
              <Checkbox />
              <div>
                <span>{addon.title}</span>
                <p>{addon.description}</p>
              </div>
            </div>
            <span>
              {billingCycle === "monthly"
                ? addon.priceMonthly
                : addon.priceYearly}
            </span>
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
          value={billingCycle}
          onCheckedChange={handleBillingCycleChange}
        />
        <p>
          <span>Yearly</span>
        </p>
      </Label>
    </div>
  );
};

export default AddonsCard;
