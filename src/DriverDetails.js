import React from "react";
import * as $ from "jquery";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";

export default class DriversTable extends React.Component {
    constructor() {
        super();

        this.state = {
            drivers: [],
            flags: [],
            id: ""
        };
    }

    componentDidMount() {
        this.getResponse();
        this.getFlags();
    }

    getResponse() {
        const { id } = this.props.location.state
        console.log(id)
        var url = 'http://ergast.com/api/f1/2013/drivers/' + id + '/driverStandings.json';
        $.get(url, (data) => {
            console.log(data);
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
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

    render() {
        return (
            <div className="drivers">
                <h2>Drivers Championship</h2>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="5">Drivers Championships Standings - 2013</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((driver, i) => {
                            return (
                                <table  key={i}>
                                    <tr>
                                        <td><img src="img/helmet.png" />
                                        <tr><td>{this.state.flags.map((flag, i) => {
                                        if (
                                            driver.Driver.nationality === "British" &&
                                            flag.nationality === "British, UK"
                                        ) {
                                            return <Flag key={i} country="GB" />;
                                        } else if (driver.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                            return <Flag key={i} country="NL" />;
                                        } else {
                                            if (driver.Driver.nationality === flag.nationality) {
                                                return <Flag key={i} country={flag.alpha_2_code} />;
                                            }
                                        }
                                    })}
                                        </td>
                                        <td>
                                            </td></tr>
                                            <tr><td>{driver.Driver.givenName}</td></tr>
                                            <tr><td>{driver.Driver.familyName}</td></tr>
                                        </td>
                                    </tr>
                                    <tr><td>Country: {driver.Driver.nationality}</td></tr>
                                    <tr><td>Team: {driver.Constructors[0].name}</td></tr>
                                    <tr><td>Birth: {driver.Driver.dateOfBirth}</td></tr>
                                    <tr><td><Link to="#">Biography</Link></td></tr>
                                </table>
                            )


                            
                        })}
                    </tbody>
                </table>
            </div>

        );
    }
}
