import React from "react";
//import "./css/style.css";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import * as $ from "jquery";
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
import { PropTypes } from "prop-types";
import Welcome from "./Welcome";
import DriversTable from "./DriversTable";
import Teams from "./Teams";
import Races from "./Races";
import Flag from 'react-flagkit';
import DriverDetails from "./DriverDetails";
import TeamsDetails from "./TeamsDetails";


export default class App extends React.Component {

    render() {
        return(
            <Router>
                <div className="main">
                    <div className='sidebar'>
                        <nav>
                            <img src="img/praviLogo.jpg"/>
                            <ul className="links">
                                
                                <li className="link">
                                    <Link to="/drivers">
                                        <img src="img/helmet.png"/>
                                        <p className="linkPara">Drivers</p>
                                        </Link>
                                </li>
                                
                                <li className="link">
                                    <Link to="/teams">
                                        <img src="img/timovi1.png"/>
                                        <p>Teams</p>
                                        </Link>
                                </li>
                                <li className="link">
                                    <Link to="/races">
                                        <img src="img/checkered-flag.png"/>
                                        <p>Races</p>
                                        </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className='content'>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/drivers" component={DriversTable}/>
                        <Route path="/teams" component={Teams}/>
                        <Route path="/races" component={Races}/>
                        <Route path="/driverDetails/:id" exact component={DriverDetails}/>
                        <Route path="/teamsDetails/:id" exact component={TeamsDetails}/>
                    </div>
                </div>
            </Router>
        )
    }
}