import React from "react";
import { Route, Switch } from "react-router-dom";
import FilterNavigation from "./components/navigation/FilterNavigation";
import ViewComponent from "./components/View/ViewComponent";
import UserPanel from "./components/user/UserPanel";

function App() {
    return (
        <div className={"max-w-[1080px] mx-auto"}>
            <UserPanel />
            <FilterNavigation />
            <Switch>
                <Route path={"/"} component={ViewComponent} />
            </Switch>
        </div>
    );
}

export default App;
