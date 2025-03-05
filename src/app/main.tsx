import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { queryClient } from "../shared/api/query-client";
import { createSyncStoragePersister } from "../../node_modules/@tanstack/query-sync-storage-persister/src/index";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../shared/api/redux";
import "./index.css";
import { App } from "./app";

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
      onSuccess={() => {
        // resume mutations after initial restore from localStorage was successful
        queryClient.resumePausedMutations().then(() => {
          queryClient.invalidateQueries();
        });
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </StrictMode>,
);
