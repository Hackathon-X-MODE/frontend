import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigation from "./components/navigation/Navigation";
import Vendors from "./components/vendor/Vendors";
import Postamat from "./components/postamat/Postamat";
import Tickets from "./components/ticket/ticketsUi/Tickets";
import Feedback from "./components/Mobile/Feedback";
import Dashboard from "./components/dashboard/Dashboard";
import TicketMain from "./components/ticket/ticketIssueUi/TicketMain";
import CommentsTable from "./components/comments/CommentsTable";


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
                    <Route path={"/view/comments"} component={CommentsTable} />
                    <Route path={"/mobile/:code"} component={Feedback} />
                </Switch>
            </div>
        </div>
    );
}

export default App;
