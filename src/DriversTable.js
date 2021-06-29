import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";

export default class DriversTable extends React.Component {
	constructor() {
		super();

		this.state = {
			drivers: [],
		};
	}

	componentDidMount() {
		this.getResponse();
	}

	getResponse() {
		var url = "http://ergast.com/api/f1/2013/driverStandings.json";
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				drivers:
					data.MRData.StandingsTable.StandingsLists[0]
						.DriverStandings,
			});
		});
	}

	render() {
		return (
			<div className="drivers">
				<h2>Drivers Championship</h2>
				<table>
					<thead>
						<tr>
							<th colSpan="4">
								Drivers Championships Standings - 2013
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state.drivers.map((driver, i) => {
							return (
								<tr key={i}>
									<td className="driverPosition">
										{driver.position}
									</td>
									<td className="fullName">
										<Link to="#">
											{driver.Driver.givenName +
												" " +
												driver.Driver.familyName}
										</Link>
									</td>
									<td className="constructor">
										{driver.Constructors[0].name}
									</td>
									<td className="points">{driver.points}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
