import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Route} from "react-router-dom";
import "./index.css";
import App from "./App";
import { YMaps } from "@pbe/react-yandex-maps";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <YMaps
                    query={{
                        ns: "use-load-option",
                        load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon"
                    }}
                >
                    <App />
                </YMaps>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
