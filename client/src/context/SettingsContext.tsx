import { createContext } from "react";
import { AppSettings } from "../types";

export interface SettingsContextType {
  settings: AppSettings | null;
  isLoading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);
