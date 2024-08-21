import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const steps: Step[] = [
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

export const plans = [
  {
    name: "Arcade",
    priceMonthly: 9,
    promoMonthly: "",
    priceYearly: 90,
    promoYearly: "2 months free",
    image: "icon-arcade.svg",
  },
  {
    name: "Advanced",
    priceMonthly: 12,
    promoMonthly: "",
    priceYearly: 120,
    promoYearly: "2 months free",
    image: "icon-advanced.svg",
  },
  {
    name: "Pro",
    priceMonthly: 15,
    promoMonthly: "",
    priceYearly: 150,
    promoYearly: "2 months free",
    image: "icon-pro.svg",
  },
];

export const addons = [
  {
    title: "Online service",
    description: "Access to multiplayer games",
    priceMonthly: 1,
    priceYearly: 10,
  },
  {
    title: "Larger storage",
    description: "Extra 1TB of cloud save",
    priceMonthly: 2,
    priceYearly: 20,
  },
  {
    title: "Customizable profile",
    description: "Custom theme on your profile",
    priceMonthly: 2,
    priceYearly: 20,
  },
];

export const formatCurrency = (amount: number) => {
  return "$" + amount.toFixed(0);
};

export const sum = (...args: (string | number)[]): number => {
  return args.reduce<number>((acc, curr) => {
    const num = Number(curr);
    return isNaN(num) ? acc : acc + num;
  }, 0);
};
