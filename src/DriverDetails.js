import React from "react";
import { Link } from "react-router-dom";
import * as $ from "jquery";
import Flag from "react-flagkit";

export default class DriverDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      drivers: [],
      flags: [],
    };
  }
  componentDidMount() {
    
    this.getDrivers();
    this.getFlags();
  }

  getDrivers() {
    const id = this.props.match.params.id;
    console.log(id);
    var url ="http://ergast.com/api/f1/2013/drivers/" + id + "/driverStandings.json";
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
      console.log(this.state.drivers)
    return ( 
    <div>
        {this.state.drivers.map((driver, i)=>{
            return(
                <div key={i}>
            <div>
                <img src="../img/drivers/Sebastian_Vettel.jpg"/>
            </div>
            <div>
                <div>
                {this.state.flags.map((flag, i) => {
                            if (
                              driver.Driver.nationality === "British" &&
                              flag.nationality === "British, UK"
                            ) {
                              return <Flag key={i} country="GB" />;
                            } else if (
                              driver.Driver.nationality === "Dutch" &&
                              flag.nationality === "Dutch, Netherlandic"
                            ) {
                              return <Flag key={i} country="NL" />;
                            } else {
                              if (
                                driver.Driver.nationality === flag.nationality
                              ) {
                                return (
                                  <Flag key={i} country={flag.alpha_2_code} size={60}/>
                                );
                              }
                            }
                          })}
                </div>
               
           
            </div>

            <table>

                <tr>
                    <th colSpan="2">{driver.Driver.givenName}</th>
                    
                </tr>
                <tr>
                    <th colSpan="2">{driver.Driver.familyName}</th>
                    
                </tr>
                <tr>
                    <th>Country:</th>
                    <td>{driver.Driver.nationality}</td>
                </tr>
                <tr>
                    <th>Team:</th>
                    <td>{driver.Constructors[0].name}</td>
                </tr>
                <tr>
                    <th>Birth:</th>
                    <td>{driver.Driver.dateOfBirth}</td>
                </tr>
                <tr>
                    <th colSpan="2"><Link to="#">Biography</Link></th>
                </tr>
                
                </table> 

           

        </div>
            )
        })}
        
    </div>
  )
  }
}








