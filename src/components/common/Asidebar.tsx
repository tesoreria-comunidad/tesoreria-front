import { type PropsWithChildren } from "react";

import NavBar from "./NavBar";

export function Asidebar({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col  bg-accent min-h-screen text-foreground transition-colors duration-300 relative">
      <NavBar />
      <main
        className={` container mx-auto  py-24 h-[100vh] flex-1  text-foreground transition-colors duration-300 w-full `}
      >
        {children}
      </main>
    </div>
  );
}
