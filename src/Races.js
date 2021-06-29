import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";

export default class Races extends React.Component {
	constructor() {
		super();

		this.state = {
			races: [],
		};
	}

	componentDidMount() {
		this.getResponse();
	}

	getResponse() {
		var url = "http://ergast.com/api/f1/2013/results/1.json";
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				races: data.MRData.RaceTable.Races,
			});
		});
	}

	render() {
		return (
			<table>
				<thead>
					<tr>
						<th>Constructors Championships Standings - 2013</th>
					</tr>
				</thead>
				<tbody>
					{this.state.races.map((race, i) => {
						return (
							<tr key={i}>
								<td className="position">{race.round}</td>
								<td className="constructor">{race.raceName}</td>
								<td className="circuit">
									{race.Circuit.circuitName}
								</td>
								<td className="date">{race.date}</td>
								<td className="winner">
									{race.Results[0].Driver.familyName}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}
}
