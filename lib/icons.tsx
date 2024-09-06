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

//Bg workaround due to buggy Image compoonent
export const NavBgMobile = () => {
  return (
    <Image
      src="/bg-sidebar-mobile.svg"
      width={375}
      height={172}
      alt="background pattern"
      className="h-full w-full object-cover"
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
      className="h-full w-full object-cover"
    />
  );
};

export const FavIcon = () => {
  return (
    <Image
      src="/favicon-32x32.png"
      width={32}
      height={32}
      alt="logo"
      className="h-full w-full object-cover"
    />
  );
};
