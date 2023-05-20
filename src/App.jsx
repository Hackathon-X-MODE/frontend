import React from "react";
import { Route, Switch } from "react-router-dom";
import FilterNavigation from "./components/navigation/FilterNavigation";
import ViewComponent from "./components/View/ViewComponent";
import UserPanel from "./components/user/UserPanel";
import Navigation from "./components/navigation/Navigation";
import Registration from "./components/registration/Registration";
import ViewTables from "./components/View/ViewTables";
import Vendors from "./components/card/Vendors";
import VendorUpdate from "./components/vendor/VendorUpdate";

function App() {
    return (
        <div className={"relative max-w-full mx-auto flex bg-third"}>
            <Navigation />
            {/*<UserPanel />*/}
            {/*<FilterNavigation />*/}
            <Switch>
                {/*<Route path={"/"} component={ViewComponent} />*/}
                <Route path={"/registration"} component={Registration} />
                <Route path={"/view/vendors/:id"} component={VendorUpdate} />
                <Route path={"/view/vendors"} component={Vendors} />
                <Route path={"/view"} component={ViewTables} />
            </Switch>
        </div>
    );
}

export default App;
