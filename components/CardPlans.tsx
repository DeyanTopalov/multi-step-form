"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { plans } from "@lib/utils";
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

  return (
    <div className="">
      <h1>Select your plan</h1>
      <h2>You have the option of monthly or yearly billing</h2>
      <div className="flex w-full max-w-[28.125rem] items-center justify-between gap-4">
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
              <p className="text-sm font-normal">
                {billingCycle === "monthly"
                  ? plan.priceMonthly
                  : plan.priceYearly}
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

export default CardPlans;
