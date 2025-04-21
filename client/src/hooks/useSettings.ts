import { useContext } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../context/SettingsContext";

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);

  if (context === undefined) {
    throw new Error("useSettings must be used in SettingsProvider");
  }

  return context;
};
