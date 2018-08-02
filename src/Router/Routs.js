import React, { Component } from 'react';
import { Router, Route } from "react-router-dom"
import {
    CreateAccount,
    LogIn,
    Dashboard,
    ViweBooking
} from "../Components/index"
import history from "../History"
class Routers extends Component {
    // componentDidMount() {
    //     let checkAouth = localStorage.getItem("token")
    //     console.log(checkAouth)
    //     if (checkAouth === null) {
    //         history.push("/logIn")
    //     }
    //     else {
    //         history.push("/Dashboard")
    //     }

    // }
    render() {
        return (
            <div>
                <Router history={history} >
                    <div>
                        <Route exact path="/CreateAccount" component={CreateAccount} />
                        <Route  path="/logIn" component={LogIn} />
                        <Route  path="/Dashboard" component={Dashboard} />
                        <Route  path="/ViweBooking" component={ViweBooking} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default Routers;
