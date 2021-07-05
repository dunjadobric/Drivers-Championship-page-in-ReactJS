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
      colors: [
        "yellow",
        "gray",
        "orange",
        "lightgreen",
        "lightblue",
        "greenyellow",
        "cadetblue",
        "wheat",
        "aquamarine",
        "coral",
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
          qngResults: data1[0].MRData.RaceTable.Races[0].QualifyingResults,
          raceResults: data2[0].MRData.RaceTable.Races[0].Results,
          flags: JSON.parse(data3[0]),
        });
      }.bind(this)
    );
  }

  render() {
    return (
      <div className="driverDetails">
        <div className="driverDetailsTable">
          {/* Qnd table */}
          <div>
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
                      <td>{res.position}</td>
                      <td>
                        <div className="constructorRaces">
                          {this.state.flags.map((flag, i) => {
                            if (
                              res.Driver.nationality === "British" &&
                              flag.nationality === "British, UK"
                            ) {
                              return <Flag key={i} country="GB" />;
                            } else if (
                              res.Driver.nationality === "Dutch" &&
                              flag.nationality === "Dutch, Netherlandic"
                            ) {
                              return <Flag key={i} country="NL" />;
                            } else {
                              if (res.Driver.nationality === flag.nationality) {
                                return (
                                  <Flag key={i} country={flag.alpha_2_code} />
                                );
                              }
                            }
                          })}
                          <p>{res.Driver.familyName}</p>
                        </div>
                      </td>
                      <td>{res.Constructor.name}</td>
                      <td>{niz1[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div >
              <div >
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
                                   <div key={i}></div>  );
                            })}
                  </tbody>
                </table>
              </div>
        </div>
        </div>
        
      </div>
    );
  }
}
                            
