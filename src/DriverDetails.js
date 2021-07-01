import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import Flag from "react-flagkit";
import Races from "./Races";

export default class DriverDetails extends React.Component {
	constructor() {
		super();

		this.state = {
			drivers: [],
			flags: [],
			races: [],
			colors: ["", "yellow", "gray", "orange", "lightgreen", "lightblue", "greenyellow", "cadetblue", "wheat", "aquamarine", "coral", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey", "darkgrey"]

		};
	}
	componentDidMount() {
		this.getDrivers();
		this.getFlags();
		this.getRaces();
	}

	getDrivers() {
		const id = this.props.match.params.id;
		console.log(id);
		var url =
			"http://ergast.com/api/f1/2013/drivers/" +
			id +
			"/driverStandings.json";
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				drivers:
					data.MRData.StandingsTable.StandingsLists[0]
						.DriverStandings,
			});
		});
	}
	getFlags() {
		var url =
			"https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";

		$.get(url, (data) => {
			var flags = JSON.parse(data);
			this.setState({
				flags: flags,
			});
		});
	}

	getRaces() {
		const id = this.props.match.params.id;
		var url =
			"http://ergast.com/api/f1/2013/drivers/" + id + "/results.json";
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				races: data.MRData.RaceTable.Races,
			});
		});
	}

	render() {
		console.log(this.state.drivers);
		console.log(this.state.races);
		return (
			<div className="driverDetails">
				<div className="driverCard">
					{this.state.drivers.map((driver, i) => {
						return (
							<div key={i}>
								<div className="driverHeading">
									<div className="driverPhoto"
										style={{  
												backgroundImage: "url(" + "../img/drivers/" + driver.Driver.givenName + "_" + driver.Driver.familyName + ".jpg" + ")",
												backgroundPosition: 'center',
												backgroundSize: 'cover',
												backgroundRepeat: 'no-repeat'
											}}>
									</div>
									<div className="driverNameContent">
										<div>
											{this.state.flags.map((flag, i) => {
												if (
													driver.Driver
														.nationality ===
														"British" &&
													flag.nationality ===
														"British, UK"
												) {
													return (
														<Flag
															key={i}
															country="GB"
															size={60}
														/>
													);
												} else if (
													driver.Driver
														.nationality ===
														"Dutch" &&
													flag.nationality ===
														"Dutch, Netherlandic"
												) {
													return (
														<Flag
															key={i}
															country="NL"
															size={60}
														/>
													);
												} else {
													if (
														driver.Driver
															.nationality ===
														flag.nationality
													) {
														return (
															<Flag
																key={i}
																country={
																	flag.alpha_2_code
																}
																size={60}
															/>
														);
													}
												}
											})}
										</div>
										<div className="driverName">
											<div>{driver.Driver.givenName}</div>
											<div>
												{driver.Driver.familyName}
											</div>
										</div>
									</div>
								</div>

								<table className="driverCardTable">
									<tr>
										<th>Country:</th>
										<td>{driver.Driver.nationality}</td>
									</tr>
									<tr>
										<th>Team:</th>
										<td>{driver.Constructors[0].name}</td>
									</tr>
									<tr>
										<th>Birth:</th>
										<td>{driver.Driver.dateOfBirth}</td>
									</tr>
									<tr>
										<th>Biography:</th>
										<td>
											<Link to={"///en.wikipedia.org/wiki/" + driver.Driver.givenName + "_" + driver.Driver.familyName} target={"_blank"}>
												<i class="fa fa-external-link"></i>
											</Link>
										</td>
									</tr>
								</table>
							</div>
						);
					})}
				</div>
				<div className="driverDetailsTable">
					<table>
						<thead>
							<tr>
								<th colSpan="5">Formula 1 2013 Results</th>
							</tr>
							<tr>
								<th>Round</th>
								<th>Grand Prix</th>
								<th>Team</th>
								<th>Grid</th>
								<th>Race</th>
							</tr>
						</thead>
						<tbody>
							{this.state.races.map((race, i) => {
								return (
									<tr key={i}>
										<td className="position">
											{race.round}
										</td>
										<td className="constructorRaces">
											<Link to="#">
												{this.state.flags.map(
													(flag, i) => {
														if (
															race.Circuit
																.Location
																.country ===
																"UK" &&
															flag.en_short_name ===
																"United Kingdom of Great Britain and Northern Ireland"
														) {
															return (
																<Flag
																	key={i}
																	country="GB"
																	size={30}
																/>
															);
														} else if (
															race.Circuit
																.Location
																.country ===
																"Korea" &&
															flag.en_short_name ===
																"Korea (Republic of)"
														) {
															return (
																<Flag
																	key={i}
																	country="KR"
																/>
															);
														} else if (
															race.Circuit
																.Location
																.country ===
																"UAE" &&
															flag.en_short_name ===
																"United Arab Emirates"
														) {
															return (
																<Flag
																	key={i}
																	country="AE"
																/>
															);
														} else if (
															race.Circuit
																.Location
																.country ===
																"USA" &&
															flag.en_short_name ===
																"United States of America"
														) {
															return (
																<Flag
																	key={i}
																	country="US"
																/>
															);
														} else {
															if (
																race.Circuit
																	.Location
																	.country ===
																flag.en_short_name
															) {
																return (
																	<Flag
																		key={i}
																		country={
																			flag.alpha_2_code
																		}
																		size={
																			30
																		}
																	/>
																);
															}
														}
													}
												)}
												<p>{race.raceName}</p>
											</Link>
										</td>
										<td className="driversTeam">
											{race.Results[0].Constructor.name}
										</td>
										<td className="driversGrid">{race.Results[0].grid}</td>
										
										
										<td className="driversRace" style={{backgroundColor: this.state.colors[race.Results[0].position]}}>{race.Results[0].position}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
