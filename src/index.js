import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import {YMaps} from "@pbe/react-yandex-maps";
import {Provider} from "react-redux";
import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <YMaps>
                    <App />
                </YMaps>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
