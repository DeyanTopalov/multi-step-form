import { NavBgMobile, NavBgDesktop } from "@lib/icons";
import { steps } from "@lib/utils";

const FormNav = ({ currentStep }: { currentStep: number }) => {
  return (
    <nav
      aria-label="Progress"
      className="relative h-[10.75rem] w-full md:h-[35.5rem] md:max-w-[17.125rem] md:overflow-hidden md:rounded-lg"
    >
      <ol
        role="list"
        className="mt-8 flex items-center justify-center gap-4 md:mt-10 md:flex-col md:items-start md:gap-8 md:pl-8"
      >
        {/* Bg workaround due to buggy Image compoonent */}
        <div className="absolute inset-x-0 top-0 z-0 block h-full w-full object-cover md:inset-y-0 md:left-0 md:hidden">
          <NavBgMobile />
        </div>
        <div className="absolute inset-x-0 top-0 z-0 hidden h-full w-full object-cover md:inset-y-0 md:left-0 md:block">
          <NavBgDesktop />
        </div>
        {steps.map((step, index) => (
          <li key={step.id} className="">
            <div className="z-20 flex items-center justify-start md:gap-4">
              <div
                className={` ${index + 1 === currentStep ? "border-clr-light-blue bg-clr-light-blue text-clr-marine-blue" : "border-white text-white"} z-20 flex size-10 items-center justify-center rounded-full border font-bold transition-all duration-300 ease-in-out`}
              >
                {index + 1}
              </div>
              <div className="z-20 hidden md:grid">
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

export default FormNav;
