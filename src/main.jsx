import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Layouts/Router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {" "}
      <RouterProvider router={Router}>
        {" "}
        <React.StrictMode>
          <App />
        </React.StrictMode>
        ,
      </RouterProvider>
    </AuthProvider>
  </QueryClientProvider>
);
