import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import Flag from "react-flagkit";
import Races from "./Races";


export default class TeamsDetails extends React.Component {

    constructor() {
        super();

        this.state = {
            teams: [],
            flags: [],
            // teamResults : []
        }
    }

    componentDidMount() {
        this.getTeamDetails(this.props.match.params.id)
    }

    getTeamDetails(id) {
        var urlTeams = $.ajax(`http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`);
        var urlFlags = $.ajax(`https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json`);
        // var urlTeamResults = $.ajax(`http://ergast.com/api/f1/2013/constructors/${id}/results.json `)
        
        $.when(urlTeams, urlFlags).done(function (data1, data2) {
            this.setState({
                teams:
                    data1[0].MRData.StandingsTable.StandingsLists[0]
                        .ConstructorStandings,
                flags: JSON.parse(data2[0]),
                // teamResults: data3[0].MRData.RaceTable.Races


            })
        }.bind(this))
    }

    render() {
        console.log(this.state.teams)
        return (
            <div>
                <div>
                    {this.state.teams.map((team, i) => {
                        return (
                            <div key={i} style={{ backgroundColor: "gray", width: "350px" }}>
                                <div className="driverHeading">
                                    <div className="driverPhoto">
                                        <img
											src={
												"../img/teams_crests/" +
												team.Constructor.name +
												".jpg"
											}
										/>
                                    </div>
                                    <div className="driverNameContent">
                                        <div>
                                            {this.state.flags.map((flag, i) => {
                                                if (
                                                    team.Constructor
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
                                                    team.Constructor
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
                                                                size={60}
                                                            />
                                                        );
                                                    }
                                                }
                                            })}
                                        </div>
                                        <div className="driverName">
                                            <div>{team.Constructor.name}</div>
                                            <div>
                                                {/* {driver.Driver.familyName} */}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <table className="driverCardTable">
                                    <tr>
                                        <th>Country:</th>
                                        <td>{team.Constructor.nationality}</td>
                                    </tr>
                                    <tr>
                                        <th>Position:</th>
                                        <td>{team.position}</td>
                                    </tr>
                                    <tr>
                                        <th>Points:</th>
                                        <td>{team.points}</td>
                                    </tr>
                                    <tr>
                                        <th>History:</th>
                                        <td>
                                            <Link
                                                to={
                                                    "///en.wikipedia.org/wiki/" +
                                                    team.Constructor.name

                                                }
                                                target={"_blank"}
                                            >
                                                <i class="fa fa-external-link"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        )
                    })}
                </div>
                {/* <div className="driverDetailsTable">
					<table>
						<thead>
							<tr>
								<th colSpan="5">Formula 1 2013 Results</th>
							</tr>
							<tr>
								<th>Round</th>
								<th>Grand Prix</th>
								<th>Team</th>
								<th>Team</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{this.state.teamResults.map((race, i) => {
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
										<td className="driversGrid">
											{race.Results[0].grid}
										</td>

										<td
											className="driversRace"
											style={{
												backgroundColor:
													this.state.colors[
														parseInt(race.Results[0].position) -1
													],
											}}
										>
											{race.Results[0].position}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div> */}
            </div>


        )
    }

}