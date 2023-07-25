import React from "react";
import { useEscapeKey } from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);
  const addToast = React.useCallback(
    (message, variant) => {
      const toast = {
        id: crypto.randomUUID(),
        message,
        variant,
      };
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );
  const removeToast = React.useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    },
    [setToasts]
  );

  useEscapeKey(() => setToasts([]));
  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
