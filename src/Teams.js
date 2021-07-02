import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { FlagSpinner } from "react-spinners-kit";

export default class Teams extends React.Component {
	constructor() {
		super();

		this.state = {
			teams: [],
			flags: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		this.getResponse();
		this.getFlags();
	}

	getResponse() {
		var url = "http://ergast.com/api/f1/2013/constructorStandings.json";
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				teams: data.MRData.StandingsTable.StandingsLists[0]
					.ConstructorStandings,
				isLoading: false,
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
				// isLoading: false,
			});
		});
	}

	render() {
		const { loading } = this.state;
		if (this.state.isLoading) {
			return (
				<div className="teams">
					<h2>Constructor Championship</h2>
					<div className="spinner">
						<FlagSpinner
							size={200}
							color="#000"
							loading={loading}
						/>
					</div>
					;
				</div>
			);
		}
		return (
			<div className="teams">
				<h2>Constructors Championship</h2>
				<table>
					<thead>
						<tr>
							<th colSpan="4">
								Constructors Championships Standings - 2013
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.teams.map((team, i) => {
							return (
								<tr key={i}>
									<td className="position">
										{team.position}
									</td>
									<td className="constructorTeams">
										{this.state.flags.map((flag, i) => {
											if (
												team.Constructor.nationality ===
													"British" &&
												flag.nationality ===
													"British, UK"
											) {
												return (
													<Flag
														key={i}
														country="GB"
														size={30}
													/>
												);
											} else if (
												team.Constructor.nationality ===
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
													team.Constructor
														.nationality ===
													flag.nationality
												) {
													return (
														<Flag
															key={i}
															country={
																flag.alpha_2_code
															}
															size={30}
														/>
													);
												}
											}
										})}
										<p>{team.Constructor.name}</p>
									</td>
									<td>
										<Link to="#">Details</Link>
									</td>
									<td className="points">{team.points}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
