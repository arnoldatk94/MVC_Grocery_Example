import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./Components/AddProduct";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain="dev-v8d6ndoe6namv4ez.us.auth0.com"
    clientId="oYVO8N6HaObnPGSxV7trYKbXG0KrQsR6"
    audience="https://myApp/api"
    scope="read:current_user update:current_user_metadata"
    // authorizationParams={{
    redirectUri={window.location.origin}
    // }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
