import Image from "next/image";

// Buggy Nextjs img, not conditionally rednering based on screen size
export const NavBackground = () => {
  return (
    <>
      <Image
        src="/bg-sidebar-mobile.svg"
        width={375}
        height={172}
        alt="background pattern"
        className="block h-full w-full object-cover md:hidden"
      />
      <Image
        src="/bg-sidebar-desktop.svg"
        width={274}
        height={568}
        alt="background pattern"
        className="hidden h-full w-full object-cover md:block"
      />
    </>
  );
};

export const NavBgMobile = () => {
  return (
    <Image
      src="/bg-sidebar-mobile.svg"
      width={375}
      height={172}
      alt="background pattern"
      className="block h-full w-full object-cover md:hidden"
    />
  );
};

export const NavBgDesktop = () => {
  return (
    <Image
      src="/bg-sidebar-desktop.svg"
      width={274}
      height={568}
      alt="background pattern"
      className="hidden h-full w-full object-cover md:block"
    />
  );
};
