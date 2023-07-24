import React from "react";

export function useEscapeKey(callback) {
  React.useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "Escape") {
        callback();
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [callback]);
}
