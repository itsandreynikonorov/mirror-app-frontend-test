import React, { useState, useEffect, useCallback } from "react";
import { useSettings } from "../hooks/useSettings";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const MIN_ANIMATION_DURATION = 500;

const SettingsPanel: React.FC = () => {
  const { settings, refreshSettings, isLoading } = useSettings();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    let animationTimer: NodeJS.Timeout;

    if (isLoading) {
      setIsAnimating(true);
    } else if (!isLoading && isAnimating) {
      animationTimer = setTimeout(() => {
        setIsAnimating(false);
      }, MIN_ANIMATION_DURATION);
    }

    return () => {
      if (animationTimer) clearTimeout(animationTimer);
    };
  }, [isLoading, isAnimating]);

  useEffect(() => {
    let safetyTimer: NodeJS.Timeout;

    if (isAnimating) {
      safetyTimer = setTimeout(() => {
        setIsAnimating(false);
      }, 5000);
    }

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
    };
  }, [isAnimating]);

  const handleRefresh = useCallback(() => {
    setIsAnimating(true);
    refreshSettings();
  }, [refreshSettings]);

  if (!settings) {
    return <div className="settings-panel-loading">Refreshing settings...</div>;
  }

  return (
    <div className="settings-panel">
      <h2 className="settings-title">Settings</h2>

      <button
        className="refresh-button flex flex-row items-center justify-center"
        onClick={handleRefresh}
        disabled={isLoading || isAnimating}
      >
        <ArrowPathIcon
          className={`h-5 w-5 mr-2 ${isAnimating ? "animate-spin" : ""}`}
        />
        {isAnimating ? "Refreshing..." : "Refresh settings"}
      </button>

      <div className="settings-details">
        <div className="setting-group">
          <h3 className="setting-group-title">Layout</h3>
          <ul className="settings-list">
            <li>Type: {settings.layout.current}</li>
            <li>
              Columns: {settings.layout.params[settings.layout.current].columns}
            </li>
            <li>
              Rows: {settings.layout.params[settings.layout.current].rows}
            </li>
          </ul>
        </div>

        <div className="setting-group">
          <h3 className="setting-group-title">Template</h3>
          <ul className="settings-list">
            <li>Type: {settings.template}</li>
          </ul>
        </div>

        <div className="setting-group">
          <h3 className="setting-group-title">Navigation</h3>
          <ul className="settings-list">
            <li>Type: {settings.navigation}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SettingsPanel);
