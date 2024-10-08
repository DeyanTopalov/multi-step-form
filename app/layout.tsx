import type { Metadata } from "next";
import { ubuntu } from "./ui/fonts";
import "@styles/globals.css";

export const metadata: Metadata = {
  title: "Multi-Step-Form",
  description: "Frontend Mentor challenge to build a Multi-Step-Form",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.className} relative -z-50 grid h-svh w-svw place-items-center gap-0 bg-clr-magnolia text-left text-base antialiased md:h-screen md:w-full`}
      >
        <main className="grid h-full w-svw md:max-w-[90rem] md:place-items-center md:px-10">
          {children}
        </main>
      </body>
    </html>
  );
}
