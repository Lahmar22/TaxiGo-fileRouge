import "../css/app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <Router />
    </React.StrictMode>
);