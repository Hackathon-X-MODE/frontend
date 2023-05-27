import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";

import Vendors from "./components/card/Vendors";
import Postamat from "./components/card/Postamat";
import Ticket from "./components/ticket/Ticket";
import Tickets from "./components/ticket/Tickets";
import Files from "./components/export/Files";
import Feedback from "./components/Mobile/Feedback";
import Dashboard from "./components/dashboard/Dashboard";


function App() {
    return (
        <div
            className={
                "relative lg:max-w-[1920px] h-screen overflow-x-hidden mx-auto lg:flex bg-[#373A54]"
            }
        >
            <Navigation />
            <div className={"lg:relative w-5/6 w-full"}>
                <Switch>
                    <Route exact path={"/"} component={Dashboard} />
                    <Route path={"/view/postamates"} component={Postamat} />
                    <Route path={"/view/vendors/"} component={Vendors} />
                    <Route path={"/view/tickets/:ticketId"} component={Ticket} />
                    <Route path={"/view/tickets/"} component={Tickets} />
                    <Route path={"/view/files/"} component={Files} />
                    <Route path={"/mobile/:code"} component={Feedback} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
