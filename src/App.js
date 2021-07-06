import React from "react";
// import "./css/style.css";
import "./scss/style.scss";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import * as $ from "jquery";
var ReactCSSTransitionGroup = require("react-addons-css-transition-group");
import { PropTypes } from "prop-types";
import Welcome from "./Welcome";
import DriversTable from "./DriversTable";
import Teams from "./Teams";
import Races from "./Races";
import Flag from "react-flagkit";
import DriverDetails from "./DriverDetails";
import TeamsDetails from "./TeamsDetails";
import RacesDetails from "./RacesDetails";

export default class App extends React.Component {
	render() {
		return (
			<Router>
				<div className="main">
					<div className="sidebar">
						<nav>
							<img src="img/praviLogo.jpg" />
							<ul className="links">
								<li className="link">
									<NavLink
										to="/drivers"
										activeClassName="selected"
									>
										<img src="img/helmet.png" />
										<p className="linkPara">Drivers</p>
									</NavLink>
								</li>

								<li className="link">
									<NavLink
										to="/teams"
										activeClassName="selected"
									>
										<img src="img/timovi1.png" />
										<p>Teams</p>
									</NavLink>
								</li>
								<li className="link">
									<NavLink
										to="/races"
										activeClassName="selected"
									>
										<img src="img/checkered-flag.png" />
										<p>Races</p>
									</NavLink>
								</li>
							</ul>
						</nav>
					</div>
					<div className="content">
						<Route path="/" exact component={Welcome} />
						<Route path="/drivers" component={DriversTable} />
						<Route path="/teams" component={Teams} />
						<Route path="/races" component={Races} />
						<Route
							path="/driverDetails/:id"
							component={DriverDetails}
						/>
						<Route
							path="/teamsDetails/:id"
							component={TeamsDetails}
						/>
						<Route
							path="/racesDetails/:id"
							component={RacesDetails}
						/>
					</div>
				</div>
			</Router>
		);
	}
}
