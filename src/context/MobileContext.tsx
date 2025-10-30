import React, { createContext, useContext } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type MobileContextType = {
  isMobile: boolean;
};

const MobileContext = createContext<MobileContextType>({
  isMobile: false,
});

export const MobileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => useContext(MobileContext);
