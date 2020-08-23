import React, { Component } from 'react';
import { Station } from './models/Station';
import { http } from "../http";

interface IProps { }

interface IState {
  stations: Array<Station>;
  loading: Boolean;
  name: String;
}

export class FetchData extends Component<IProps, IState> {
  static displayName = FetchData.name;

  constructor(props: IProps) {
    super(props);
    this.state = { stations: [], loading: false, name: "" };
  }

  private renderForecastsTable(stations: Array<Station>) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Name</th>
            <th>Province</th>
            <th>Latitude (N)</th>
            <th>Longitude (E)</th>
            <th>Elevation (m)</th>
            <th>First Year</th>
            <th>Last Year</th>
          </tr>
        </thead>
        <tbody>
          {stations.map(station =>
            <tr key={station.id}>
              <td>{station.stationName}</td>
              <td>{station.province}</td>
              <td>{station.latitude}</td>
              <td>{station.longitude}</td>
              <td>{station.elevation}</td>
              <td>{station.firstYear}</td>
              <td>{station.lastYear}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  private setName = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ name: event.currentTarget.value })
  }

  public render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderForecastsTable(this.state.stations);

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

  private fetchStationData = async () => {
    this.setState({ loading: true });
    const data = await http<Array<Station>>(`weather/station/name/${this.state.name}`);
    this.setState({ stations: data, loading: false });
  }
}
