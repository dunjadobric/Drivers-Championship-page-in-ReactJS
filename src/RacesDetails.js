import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class RacesDetails extends React.Component {
	constructor() {
		super();
		this.state = {
			qngResults: [],
			raceResults: [],
			flags: [],
			raceCard: [],
			colors: [
				"yellow",
				"lightgray",
				"orange",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"lightgreen",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
				"darkgrey",
			],
		};
	}
	componentDidMount() {
		this.getResults(this.props.match.params.id);
	}
	getResults(id) {
		var urlQngResults = $.ajax(
			`http://ergast.com/api/f1/2013/${id}/qualifying.json`
		);
		var urlRaceResults = $.ajax(
			`http://ergast.com/api/f1/2013/${id}/results.json`
		);
		var urlFlags = $.ajax(
			`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`
		);

		$.when(urlQngResults, urlRaceResults, urlFlags).done(
			function (data1, data2, data3) {
				this.setState({
					qngResults:
						data1[0].MRData.RaceTable.Races[0].QualifyingResults,
					raceResults: data2[0].MRData.RaceTable.Races[0].Results,
					flags: JSON.parse(data3[0]),
					raceCard: data1[0].MRData.RaceTable.Races,
				});
			}.bind(this)
		);
	}

	render() {
		return (
			<div className="racesDetails">
				<div className="raceCard">
					{this.state.raceCard.map((card, i) => {
						return (
							<div key={i}>
								<div>
									{this.state.flags.map((flag, i) => {
										if (
											card.Circuit.Location.country ===
												"UK" &&
											flag.en_short_name ===
												"United Kingdom of Great Britain and Northern Ireland"
										) {
											return (
												<Flag
													key={i}
													country="GB"
													size={200}
												/>
											);
										} else if (
											card.Circuit.Location.country ===
												"Korea" &&
											flag.en_short_name ===
												"Korea (Republic of)"
										) {
											return (
												<Flag key={i} country="KR" />
											);
										} else if (
											card.Circuit.Location.country ===
												"UAE" &&
											flag.en_short_name ===
												"United Arab Emirates"
										) {
											return (
												<Flag key={i} country="AE" />
											);
										} else if (
											card.Circuit.Location.country ===
												"USA" &&
											flag.en_short_name ===
												"United States of America"
										) {
											return (
												<Flag key={i} country="US" />
											);
										} else {
											if (
												card.Circuit.Location
													.country ===
												flag.en_short_name
											) {
												return (
													<Flag
														key={i}
														country={
															flag.alpha_2_code
														}
														size={200}
													/>
												);
											}
										}
									})}
								</div>
								<div className="raceCardHeading">
									{card.raceName}
								</div>
								<table className="raceCardTable">
									<tr>
										<td>Country:</td>
										<td>{card.Circuit.Location.country}</td>
									</tr>
									<tr>
										<td>Location:</td>
										<td>
											{card.Circuit.Location.locality}
										</td>
									</tr>
									<tr>
										<td>Date:</td>
										<td>{card.date}</td>
									</tr>
									<tr>
										<td>Full report:</td>
										<td>
											<Link
												to={`///en.wikipedia.org/wiki/2013${card.raceName}`}
												target={"_blank"}
											>
												<i class="fa fa-external-link"></i>
											</Link>
										</td>
									</tr>
								</table>
							</div>
						);
					})}
				</div>
				<div className="raceDetailsTable">
					{/* Qnd table */}

					<table>
						<thead>
							<tr>
								<th colSpan="4">Qualifying Results</th>
							</tr>
							<tr>
								<th>Pos</th>
								<th>Driver</th>
								<th>Team</th>
								<th>Best Time</th>
							</tr>
						</thead>
						<tbody>
							{this.state.qngResults.map((res, i) => {
								var niz = [];
								niz.push(res.Q1);
								niz.push(res.Q2);
								niz.push(res.Q3);
								var niz1 = niz.sort();
								console.log("niz1", niz1);
								console.log("niz", niz);
								return (
									<tr key={i}>
										<td className="blackColor">
											{res.position}
										</td>
										<td>
											<div className="constructorRaces">
												{this.state.flags.map(
													(flag, i) => {
														if (
															res.Driver
																.nationality ===
																"British" &&
															flag.nationality ===
																"British, UK"
														) {
															return (
																<Flag
																	key={i}
																	country="GB"
																/>
															);
														} else if (
															res.Driver
																.nationality ===
																"Dutch" &&
															flag.nationality ===
																"Dutch, Netherlandic"
														) {
															return (
																<Flag
																	key={i}
																	country="NL"
																/>
															);
														} else {
															if (
																res.Driver
																	.nationality ===
																flag.nationality
															) {
																return (
																	<Flag
																		key={i}
																		country={
																			flag.alpha_2_code
																		}
																	/>
																);
															}
														}
													}
												)}
												<p>{res.Driver.familyName}</p>
											</div>
										</td>
										<td>{res.Constructor.name}</td>
										<td className="blackColor">
											{niz1[0]}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					<table>
						<thead>
							<tr>
								<th colSpan="5">Race results</th>
							</tr>
							<tr>
								<th>Pos</th>
								<th>Driver</th>
								<th>Team</th>
								<th>Results</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{this.state.raceResults.map((rec, i) => {
								return (
									<tr key={i}>
										<td className="blackColor">
											{rec.position}
										</td>
										<td>
											<div className="constructorRaces">
												{this.state.flags.map(
													(flag, i) => {
														if (
															rec.Driver
																.nationality ===
																"British" &&
															flag.nationality ===
																"British, UK"
														) {
															return (
																<Flag
																	key={i}
																	country="GB"
																/>
															);
														} else if (
															rec.Driver
																.nationality ===
																"Dutch" &&
															flag.nationality ===
																"Dutch, Netherlandic"
														) {
															return (
																<Flag
																	key={i}
																	country="NL"
																/>
															);
														} else {
															if (
																rec.Driver
																	.nationality ===
																flag.nationality
															) {
																return (
																	<Flag
																		key={i}
																		country={
																			flag.alpha_2_code
																		}
																	/>
																);
															}
														}
													}
												)}
												<p>{rec.Driver.familyName}</p>
											</div>
										</td>
										<td>{rec.Constructor.name}</td>
										<td className="blackColor">
											{rec.Time !== undefined
												? rec.Time.time
												: "/"}
										</td>
										<td
											className="blackColor"
											style={{
												backgroundColor:
													this.state.colors[
														parseInt(rec.position) -
															1
													],
											}}
										>
											{rec.points}
										</td>
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
