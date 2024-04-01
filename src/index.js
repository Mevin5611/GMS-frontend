import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { CenterContextProvider } from "./context/CenterContext";
import { PackageContextProvider } from "./context/PackageContext";
import { MemberContextProvider } from "./context/MemberContext";
import { TrainerContextProvider } from "./context/TrainerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MemberContextProvider>
        <PackageContextProvider>
          <TrainerContextProvider>
            <CenterContextProvider>
              <WorkoutContextProvider>
                <App />
              </WorkoutContextProvider>
            </CenterContextProvider>
          </TrainerContextProvider>
        </PackageContextProvider>
      </MemberContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
