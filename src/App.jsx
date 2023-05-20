import React from "react";
import { Route, Switch } from "react-router-dom";
import FilterNavigation from "./components/navigation/FilterNavigation";
import ViewComponent from "./components/View/ViewComponent";
import UserPanel from "./components/user/UserPanel";
import Navigation from "./components/navigation/Navigation";
import Registration from "./components/registration/Registration";

function App() {
    return (
        <div className={"relative max-w-full mx-auto flex bg-third"}>
            <Navigation />
            {/*<UserPanel />*/}
            {/*<FilterNavigation />*/}
            <Switch>
                {/*<Route path={"/"} component={ViewComponent} />*/}
                <Route path={"/registration"} component={Registration} />
            </Switch>
        </div>
    );
}

export default App;
