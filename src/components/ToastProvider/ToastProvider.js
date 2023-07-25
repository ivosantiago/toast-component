import React from "react";

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

  React.useEffect(() => {
    const keyDownHandler = (e) => {
      if (e.key === "Escape") {
        setToasts([]);
      }
    };
    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [setToasts]);

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
