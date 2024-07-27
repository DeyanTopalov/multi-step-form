"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import Image from "next/image";

const CardPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("Arcade");
  const [billingCycle, setBillingCycle] = useState("monthly");

  const handlePlanChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      setSelectedPlan(event.target.value);
    }
  };

  const handleBillingCycleChange = () => {
    setBillingCycle((prevCycle) =>
      prevCycle === "monthly" ? "yearly" : "monthly",
    );
  };

  const plans = [
    {
      name: "Arcade",
      priceMonthly: "$9/mo",
      promoMonthly: "",
      priceYearly: "$90/yr",
      promoYearly: "2 months free",
      image: "icon-arcade.svg",
    },
    {
      name: "Advanced",
      priceMonthly: "$12/mo",
      promoMonthly: "",
      priceYearly: "$120/yr",
      promoYearly: "2 months free",
      image: "icon-advanced.svg",
    },
    {
      name: "Pro",
      priceMonthly: "$15/mo",
      promoMonthly: "",
      priceYearly: "$150/yr",
      promoYearly: "2 months free",
      image: "icon-pro.svg",
    },
  ];

  return (
    <div className="wrapper">
      {plans.map((plan) => (
        <Label
          key={plan.name}
          className={`flex h-[160px] w-[138px] cursor-pointer flex-col justify-between rounded-lg border px-4 pb-4 pt-5 ${selectedPlan === plan.name ? "border-green-400 bg-blue-200" : "border-gray-400 bg-red-200"}`}
        >
          <Input
            type="radio"
            name="plan"
            value={plan.name}
            checked={selectedPlan === plan.name}
            onChange={handlePlanChange}
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
            <p className="text-sm font-normal">{plan.priceYearly}</p>
            <p className="text-sm font-normal">{plan.promoYearly}</p>
          </div>
        </Label>
      ))}
      <div>
        <div className="mt-6 flex items-center justify-center">
          <span className="mr-2">Monthly</span>
          <div className="relative mr-2 inline-block w-12 select-none align-middle transition duration-200 ease-in">
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              checked={billingCycle === "yearly"}
              onChange={handleBillingCycleChange}
              className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white"
            />
            <label
              htmlFor="toggle"
              className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300"
            ></label>
          </div>
          <span className="ml-2">Yearly</span>
        </div>
        <style jsx>{`
          .toggle-checkbox:checked {
            right: 0;
            border-color: #2563eb; /* Blue-500 */
          }
          .toggle-checkbox:checked + .toggle-label {
            background-color: #2563eb; /* Blue-500 */
          }
        `}</style>
      </div>
      <Switch value={billingCycle} onCheckedChange={handleBillingCycleChange} />
    </div>
  );
};

export default CardPlans;
