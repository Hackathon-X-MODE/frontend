import React from "react";
import { Route, Switch, Navigate } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";

import Vendors from "./components/vendor/Vendors";
import Postamat from "./components/postamat/Postamat";
import Ticket from "./components/ticket/ticketIssueUi/Ticket";
import Tickets from "./components/ticket/ticketsUi/Tickets";
import Files from "./components/export/Files";
import Feedback from "./components/Mobile/Feedback";
import Dashboard from "./components/dashboard/Dashboard";
import Comments from "./components/card/Comments";
import TicketMain from "./components/ticket/ticketIssueUi/TicketMain";


function App() {
    return (
        <div
            className={
                "relative lg:max-w-[1920px] h-screen overflow-x-hidden mx-auto lg:flex bg-[#373A54]"
            }
        >
            <Navigation />
            <div className={"lg:relative w-5/6 w-full overflow-x-hidden overflow-y-scroll"}>
                <Switch>
                    <Route exact path={"/"} component={Dashboard} />
                    <Route path={"/view/postamates/:postamatId?"} component={Postamat} />
                    <Route path={"/view/vendors/"} component={Vendors} />
                    <Route path={"/view/tickets/:ticketId"} component={TicketMain} />
                    <Route path={"/view/tickets/"} component={Tickets} />
                    <Route path={"/view/files/"} component={Files} />
                    <Route path={"/view/comments"} component={Comments} />
                    <Route path={"/mobile/:code"} component={Feedback} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
