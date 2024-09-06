import { Button } from "../ui/button";
import { Check, X } from "lucide-react";

type FormSuccessScreenProps = {
  handleClose: () => void;
};
const FormSuccessScreen = ({ handleClose }: FormSuccessScreenProps) => {
  return (
    <section className="mx-4 grid -translate-y-[4.5rem] animate-fadein place-items-center rounded-lg bg-white px-6 py-8 text-center drop-shadow-lg md:mx-0 md:max-w-[28.125rem] md:translate-y-0 md:bg-transparent md:px-0 md:py-0 md:drop-shadow-none">
      <div className="icon_and_thanks mt-12 flex flex-col items-center gap-6 md:mt-32 md:gap-8">
        <div className="icon flex size-[3.5rem] items-center justify-center rounded-full bg-clr-strawberry/75 md:size-20">
          <div className="flex size-8 items-center justify-center rounded-full bg-white md:size-11">
            <Check className="stroke-[3px] text-clr-strawberry/75 md:size-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-clr-marine-blue">Thank you!</h2>
      </div>
      <div className="mt-2 grid place-items-center gap-6 md:mt-3 md:gap-8">
        <p className="text-base text-clr-cool-gray">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>

        <Button
          className="group/button size-11 rounded-full border-2 border-clr-strawberry/75 bg-white px-0 py-0 text-clr-strawberry/75 transition-all duration-200 ease-in-out hover:bg-clr-strawberry/75 hover:text-white"
          type="button"
          onClick={handleClose}
        >
          <X className="stroke-[3px] group-hover/button:stroke-[3.5px]" />
        </Button>
      </div>
    </section>
  );
};

export default FormSuccessScreen;
