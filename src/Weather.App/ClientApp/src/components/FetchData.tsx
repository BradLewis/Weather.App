import React, { Component } from 'react';

interface IProps { }

interface IState {
  stations: Array<any>;
  loading: Boolean;
  name: String;
}

export class FetchData extends Component<IProps, IState> {
  static displayName = FetchData.name;

  constructor(props: IProps) {
    super(props);
    this.state = { stations: [], loading: false, name: "" };
  }

  static renderForecastsTable(stations: Array<any>) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(forecast =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  setName = (event: React.FormEvent<HTMLInputElement>) => {
    console.log("setting name")
    this.setState({ name: event.currentTarget.value })
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.stations);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        <input type="text" onChange={this.setName} />
        <button className="btn btn-primary" onClick={this.fetchStationData}>Increment</button>
        {contents}
      </div>
    );
  }
  fetchStationData = async () => {
    this.setState({ loading: true });
    console.log("Fetching...");
    const response = await fetch(`weather/station/name/${this.state.name}`);
    const data = await response.json();
    console.log(data);
    this.setState({ stations: data, loading: false });
  }
}
