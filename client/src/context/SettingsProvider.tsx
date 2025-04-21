import React, { useState, useEffect } from "react";
import { AppSettings } from "../types";
import { fetchSettings } from "../api";
import { SettingsContext, SettingsContextType } from "./SettingsContext";

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const settingsData = await fetchSettings();
      setSettings(settingsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const refreshSettings = async () => {
    await loadSettings();
  };

  const value: SettingsContextType = {
    settings,
    isLoading,
    error,
    refreshSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
