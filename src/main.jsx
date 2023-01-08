import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.scss";
import Home from "./routes/home/home.component";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(

//     <BrowserRouter>
//       <RouterProvider router={router} />
//     </BrowserRouter>
// );

ReactDOM.createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <App />
    </BrowserRouter>
);
