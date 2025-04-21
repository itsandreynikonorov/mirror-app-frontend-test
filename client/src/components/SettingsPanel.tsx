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
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500 border border-gray-200">
        Refreshing settings...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Settings</h2>

      <button
        className="w-full bg-blue-500 text-white border-none py-3 px-4 rounded-md font-medium cursor-pointer mb-6 transition-colors hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex flex-row items-center justify-center"
        onClick={handleRefresh}
        disabled={isLoading || isAnimating}
      >
        <ArrowPathIcon
          className={`h-5 w-5 mr-2 ${isAnimating ? "animate-spin" : ""}`}
        />
        {isAnimating ? "Refreshing..." : "Refresh settings"}
      </button>

      <div className="border-t border-gray-200 pt-6">
        <div className="mb-5 last:mb-0">
          <h3 className="text-base font-semibold mb-2 text-gray-600">Layout</h3>
          <ul className="list-none p-0 m-0">
            <li className="py-1.5 text-gray-500 text-sm border-b border-gray-100 last:border-b-0">
              Type: {settings.layout.current}
            </li>
            <li className="py-1.5 text-gray-500 text-sm border-b border-gray-100 last:border-b-0">
              Columns: {settings.layout.params[settings.layout.current].columns}
            </li>
            <li className="py-1.5 text-gray-500 text-sm border-b border-gray-100 last:border-b-0">
              Rows: {settings.layout.params[settings.layout.current].rows}
            </li>
          </ul>
        </div>

        <div className="mb-5 last:mb-0">
          <h3 className="text-base font-semibold mb-2 text-gray-600">
            Template
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="py-1.5 text-gray-500 text-sm border-b border-gray-100 last:border-b-0">
              Type: {settings.template}
            </li>
          </ul>
        </div>

        <div className="mb-5 last:mb-0">
          <h3 className="text-base font-semibold mb-2 text-gray-600">
            Navigation
          </h3>
          <ul className="list-none p-0 m-0">
            <li className="py-1.5 text-gray-500 text-sm border-b border-gray-100 last:border-b-0">
              Type: {settings.navigation}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SettingsPanel);
