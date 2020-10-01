import React, { Component } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Slider } from "primereact/slider";
import "primeflex/primeflex.css";

import "./App.css";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      source: "Pune",
      destination: "Mumbai",
      passenger: 1,
      data: [],
      price: 1,
      traveldate: "",
      isData: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.onDestinationChange = this.onDestinationChange.bind(this);
    this.selectedatedate = this.selectedatedate.bind(this);
    this.passengerCount = this.passengerCount.bind(this);
    this.priceSubmit = this.priceSubmit.bind(this);
    this.getFlightData();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let a = this.allData.filter((ele) => {
      return (
        ele["source"] === this.state.source &&
        ele["destination"] === this.state.destination
      );
    });
    this.setState({ data: a });
    console.log("filter", a);
    event.preventDefault();
  }

  priceSubmit(event) {
    let a = this.allData.filter((ele) => {
      console.log("fare", ele["fare"]);
      return (
        ele["source"] === this.state.source &&
        ele["destination"] === this.state.destination &&
        ele["fare"] <= this.state.price * 1000
      );
    });
    this.setState({ data: a });

    console.log("filter", a);
    event.preventDefault();
  }

  onSourceChange(e) {
    this.setState({ source: e.target.value });
  }
  onDestinationChange(e) {
    this.setState({ destination: e.target.value });
  }
  selectedatedate(e) {
    console.log("date", e.target.value);
    this.setState({ traveldate: e.target.value });
  }
  passengerCount(e) {
    this.setState({ passenger: e.target.value });
  }

  componentDidMount() {
    this.setState({ data: this.initialData });
  }

  getFlightData() {
    axios.get(`data/flight.json`).then((json) => {
      this.allData = json.data;
      console.log(this.allData);
    });
  }
  initialData = [
    {
      flight_id: "AI-201",
      source: "Delhi",
      source_code: "DEL",
      destination: "Pune",
      destination_code: "PNQ",
      fare: 9500.0,
      departs_at: "10:00 AM",
      arrives_at: "12:00 PM",
    },
    {
      flight_id: "AI-207",
      source: "Kolkata",
      source_code: "Kol",
      destination: "Mumbai",
      destination_code: "Mum",
      fare: 6500.0,
      departs_at: "10:00 PM",
      arrives_at: "01:00 AM",
    },
    {
      flight_id: "JA-711",
      source: "Delhi",
      source_code: "DEL",
      destination: "Pune",
      destination_code: "PNQ",
      fare: 11500.0,
      departs_at: "06:30 AM",
      arrives_at: "09:00 AM",
    },
  ];
  allData = [];

  minDate = new Date();

  render() {
    const isData = this.state.isData;
    let displayBox;

    return (
      <div className="App">
        <div className="App-header">
          <p>Flight Search Engine</p>
        </div>
        <div className="p-grid main">
          <div className="p-col-4">
            <div className="formClass">
              <Card
                title="Oneway Trip"
                style={{
                  width: "90%",
                  textAlign: "center",
                  border: "1px solid black",
                  margin: "10px 15px",
                  borderRadius: "5px",
                }}
                className="ui-card-shadow"
              >
                <form onSubmit={this.handleSubmit}>
                  <div className="inputData">
                    <div className="inputSource">
                      <div className="label">Source </div>

                      <select
                        value={this.state.source}
                        onChange={this.onSourceChange}
                      >
                        <option value="">Select Origin</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                      </select>
                    </div>
                    <div className="inputDestination">
                      <div className="label">Destination </div>
                      <select
                        value={this.state.destination}
                        onChange={this.onDestinationChange}
                      >
                        <option value="">Select Destination</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                      </select>
                    </div>
                    <div className="inputDate">
                      <div className="label">Date </div>

                      <input
                        type="date"
                        value={this.state.traveldate}
                        onChange={this.selectedatedate}
                      />
                    </div>
                    <div className="inputPerson">
                      <div className="label">No. of Passengers </div>
                      <input
                        type="number"
                        value={this.state.passenger}
                        onChange={this.passengerCount}
                        min="1"
                        max="10"
                      />
                    </div>
                    <div>
                      <Button label="Search" type="submit" />
                    </div>
                  </div>
                </form>
              </Card>
              <div>
                <Card
                  title="Refine Flight Search"
                  style={{
                    width: "90%",
                    textAlign: "center",
                    border: "1px solid black",
                    margin: "10px 15px",
                    borderRadius: "5px",
                  }}
                  className="ui-card-shadow"
                >
                  <form onSubmit={this.priceSubmit}>
                    <div>
                      <h5>Amount: {this.state.price * 1000}</h5>
                      <Slider
                        value={this.state.price}
                        onChange={(e) => {
                          console.log(this.state.price);
                          this.setState({ price: e.value });
                        }}
                      />
                    </div>
                    <br />
                    <div>
                      <Button
                        label="Search"
                        type="submit"
                        icon="pi pi-search"
                      />
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </div>
          <div className="p-col-8">
            <div className="displayClass">
              <div className="data">
                <div className="source-destination">
                  <Card
                    style={{
                      width: "100%",
                      margin: "20px -16px",
                      borderRadius: "5px",
                      fontSize: "24px",
                    }}
                  >
                    <div className="travelPath">
                      <p className="route">
                        <span>{this.state.source}</span> to{" "}
                        <span>{this.state.destination}</span>
                      </p>
                      <p className="date">
                        Travel date - {this.state.traveldate}
                      </p>
                      <p className="passengers">
                        Total Passengers: {this.state.passenger}
                      </p>
                    </div>
                  </Card>
                </div>
                <div className="flightDetails">
                  {this.state.data.map((element) => (
                    <Card
                      style={{
                        width: "100%",
                        margin: "2em -1em",
                        borderRadius: "5px",
                      }}
                      key={element.flight_id}
                    >
                      <div className="price">
                        <p>
                          Rs. {element.fare}
                          /person
                        </p>
                      </div>
                      <div className="flight">
                        Flight no. {element.flight_id}
                      </div>

                      <div className="source">
                        <span>{element.source_code}</span> &gt;{" "}
                        <span>{element.destination_code}</span>
                      </div>
                      <div className="depart">Depart: {element.departs_at}</div>
                      <div className="arrive">
                        Arrive: {element.arrives_at}
                        <Button
                          className="bookFlight"
                          label="Book this flight"
                          type="submit"
                          icon=""
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              {/* <div className="NoData">
                <Card
                  style={{
                    width: "100%",
                    margin: "20px -16px",
                    borderRadius: "5px",
                    fontSize: "24px",
                  }}
                >
                  <div className="travelPath">
                    <p className="date">No such flight found</p>
                  </div>
                </Card>
              </div> */}
            </div>
          </div>
        </div>
        <div />
      </div>
    );
  }
}

export default App;
