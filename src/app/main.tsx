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
import { onlineManager } from "@tanstack/react-query";
import { Loader } from "./loader";
import { authSlice } from "../modules/auth/auth.slice";
import { authApi } from "../modules/auth/api";

onlineManager.setOnline(navigator.onLine);

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const userId = authSlice.selectors.userId(store.getState());
if (userId) {
  queryClient.prefetchQuery(authApi.getUserById(userId));
}

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
        <Loader>
          <App />
        </Loader>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </StrictMode>,
);
