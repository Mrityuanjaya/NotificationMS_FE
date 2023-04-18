import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ToastContainer />
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
