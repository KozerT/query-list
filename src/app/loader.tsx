import React, { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

export const Loader = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className=" flex flex-col items-center justify-center h-screen gap-6">
              <p className=" bold text-3xl">
                Oops! Something went wrong &#58;&#40;
              </p>
              <button
                onClick={() => resetErrorBoundary()}
                className="border border-indigo-400 p-3 rounded"
              >
                Try again
              </button>
            </div>
          )}
        >
          <Suspense
            fallback={
              <div className=" fixed inset-0 bg-white flex items-center justify-center">
                <div className="text-indigo-400 font-bold text-xl">
                  Loading...
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};
