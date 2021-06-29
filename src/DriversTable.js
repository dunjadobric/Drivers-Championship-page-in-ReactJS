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
    };
  }

  componentDidMount() {
    this.getResponse();
    this.getFlags();
  }

  getResponse() {
    var url = "http://ergast.com/api/f1/2013/driverStandings.json";
    $.get(url, (data) => {
      console.log(data);
      this.setState({
        drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
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
    console.log(this.state.flags);
    return (
      <div className="drivers">
        <h2>Drivers Championship</h2>
        <table>
          <thead>
            <tr>
              <th colSpan="4">Drivers Championships Standings - 2013</th>
            </tr>
          </thead>
          <tbody>
            {this.state.drivers.map((driver, i) => {
              return (
                <tr key={i}>
                  <td className="driverPosition">{driver.position}</td>
                  <td className="fullName">
                    <Link to="#">
                      {this.state.flags.map((flag, i) => {
                        if (
                          driver.Driver.nationality === "British" &&
                          flag.nationality === "British, UK"
                        ) {
                          return <Flag key={i} country="GB" size={30}/>;
                        } else if (driver.Driver.nationality === "Dutch" && flag.nationality==="Dutch, Netherlandic") {
                          return <Flag key={i} country="NL" />;
                        } else {
                          if (driver.Driver.nationality === flag.nationality) {
                            return <Flag key={i} country={flag.alpha_2_code} size={30}/>;
                          }
                        }
                      })}
                      <p>{driver.Driver.givenName + " " + driver.Driver.familyName}</p>
                    </Link>
                  </td>
                  <td className="constructor">{driver.Constructors[0].name}</td>
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
