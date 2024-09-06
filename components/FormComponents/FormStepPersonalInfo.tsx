import { TFormSchema } from "@lib/schema";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormContext } from "react-hook-form";

// Step 1
const FormStepPersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormSchema>();

  return (
    <>
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
          type="text"
          inputMode="tel"
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
    </>
  );
};

export default FormStepPersonalInfo;
