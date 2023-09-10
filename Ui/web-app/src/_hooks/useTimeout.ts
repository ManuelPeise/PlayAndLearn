import React from "react";

export interface ITimeoutResult {
  startTimer: (cb: () => void, timeout: number) => void;
  startTimerOnWindow: (cb: () => void, timeout: number) => void;
}

export const useTimeout = (): ITimeoutResult => {
  const startTimer = React.useCallback((cb: () => void, timeout: number) => {
    const timer = setTimeout(cb, timeout * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const startTimerOnWindow = React.useCallback(
    (cb: () => void, timeout: number) => {
      const timer = window.setTimeout(cb, timeout * 1000);

      return () => {
        clearTimeout(timer);
      };
    },
    []
  );

  return { startTimer, startTimerOnWindow };
};
