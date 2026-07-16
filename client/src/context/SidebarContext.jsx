import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {

  const [collapsed, setCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem("sidebarCollapsed")) || false;
  });

  useEffect(() => {
    localStorage.setItem(
      "sidebarCollapsed",
      JSON.stringify(collapsed)
    );
  }, [collapsed]);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        toggleSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}