"use client";

import { useState, useEffect } from "react";
import store, { persistor } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Provider store={store}>
      {isClient ? (
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
