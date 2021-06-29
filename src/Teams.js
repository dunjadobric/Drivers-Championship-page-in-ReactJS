import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";

export default class Teams extends React.Component {
	constructor() {
		super();

		this.state = {
			teams: [],
		};
	}

	componentDidMount() {
		this.getResponse();
	}

	getResponse() {
		var url = "http://ergast.com/api/f1/2013/constructorStandings.json";
		$.get(url, (data) => {
			console.log(data);
			this.setState({
				teams: data.MRData.StandingsTable.StandingsLists[0]
					.ConstructorStandings,
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
					{this.state.teams.map((team, i) => {
						return (
							<tr key={i}>
								<td className="position">{team.position}</td>
								<td className="constructor">
									{team.Constructor.name}
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
		);
	}
}
