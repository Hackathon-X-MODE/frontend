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
import Postamat from "./components/card/Postamat";
import PostamatCreate from "./components/postamat/PostamatCreate";

function App() {
    return (
        <div className={"relative max-w-[1920px] mx-auto flex bg-[#373A54]"}>
            <Navigation />
            {/*<UserPanel />*/}
            {/*<FilterNavigation />*/}
            <div className={'relative w-5/6'}>
                <Switch>
                    {/*<Route path={"/"} component={ViewComponent} />*/}
                    {/*<Route path={"/registration"} component={Registration} />*/}
                    <Route path={"/view/vendors/update/:id"} component={VendorUpdate} />
                    {/*<Route path={"/view/vendors/:id/create"} component={PostamatCreate} />*/}
                    <Route path={"/view/vendors/:id"} component={Postamat} />
                    <Route path={"/view/vendors/"} component={Vendors} />
                    <Route path={"/view"} component={ViewTables} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
