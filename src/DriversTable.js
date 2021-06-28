import React from "react";
import * as $ from "jquery";

export default class DriversTable extends React.Component {
    constructor() {
        super();

        this.state = {
            drivers: []
        }
    }

    componentDidMount() {
        this.getResponse();
    }

    getResponse() {
        var url = "http://ergast.com/api/f1/2013/driverStandings.json";
        $.get(url, (data) => {
            console.log(data);
            this.setState({
                drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings
            })
        })
    }

    render() {
        return(
            <table>
                <thead>
                    <tr>
                        <th>Constructors Championships Standings - 2013</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.drivers.map((driver, i) => {
                        return(
                            <tr key={i}>
                                <td>{driver.position}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }
}

