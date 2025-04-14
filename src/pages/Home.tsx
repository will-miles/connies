import fetchWeatherData from '../apis/api1/api1.ts';
import React, { Component } from 'react';
import getDistanceFromLatLonInKm from '../utils.ts';

class Home extends Component {
  state: {
    style: string;
    location: string;
    range: number;
    crags: {
      aspect: string;
      rockType: string;
      long: string;
      lat: string;
      name: string;
      numStaredClimbs: string;
      distance: string;
      weather_data: any;
    }[];
  } = {
    style: '',
    location: '53.52574940018496, -1.919685834247175',
    range: 50,
    crags: [],
  };
  render() {
    return (
      <div>
        <h1 className='justify-center m-auto text-center'>Connies</h1>
        <form className=''>
          <label>Choose a climbing style:</label>
          <select id='styles' name='styles'>
            <option value='boulder'>Boulder</option>
            <option value='sport'>Sport</option>
            <option value='trad'>Trad</option>
            <option value='winter'>Winter</option>
          </select>
          <label>What is your location?</label>
          <input
            id='location'
            onChange={this.handleLocationChange}
            value={this.state.location}
          ></input>
          <label>What range?</label>
          <input
            id='range'
            onChange={this.handleRangeChange}
            value={this.state.range}
          ></input>
          <button
            onClick={(e: any) => {
              this.handleFromSubmit(e);
            }}
          >
            Search
          </button>
        </form>
        <this.makeCragList />
      </div>
    );
  }

  makeCragList = () => {
    const crags: {
      aspect: string;
      rockType: string;
      long: string;
      lat: string;
      name: string;
      numStaredClimbs: string;
      distance: string;
      weather_data: any;
    }[] = this.state.crags;
    console.log(crags);
    if (crags[0]) {
      return (
        <ul className='flex flex-wrap justify-center'>
          {crags.map((crag) => (
            <li className='flex flex-col m-4 h-64 w-full border-1 r-md'>
              <div>
                <h2>{crag.name}</h2>
                <h2>{parseInt(crag.distance)}</h2>
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };

  handleLocationChange = () => {
    const location = document.getElementById('location') as HTMLSelectElement;
    this.setState({ location: location.value });
  };

  handleRangeChange = () => {
    const range = document.getElementById('range') as HTMLSelectElement;
    this.setState({ range: range.value });
  };

  handleFromSubmit = (e: any) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const styles: any = document.getElementById('styles') as HTMLSelectElement;

    enum Direction {
      boulder,
      sport,
      trad,
      winter,
    }

    const searchObj: { style: Direction; location: string; range: number } = {
      style: styles.value,
      location: this.state.location,
      range: this.state.range,
    };

    // example location: 53.52574940018496, -1.919685834247175

    const searchLatLong = searchObj.location.split(', ');
    const searchLat = parseFloat(searchLatLong[0]);
    const searchLong = parseFloat(searchLatLong[1]);

    fetchWeatherData(
      searchObj.style,
      searchLat,
      searchLong,
      searchObj.range
    ).then((response) => {
      if (response.error) {
        // error occurred let the user know
        this.setState({
          error: response.error,
          loading: false,
        });
      } else {
        this.setState({
          error: false,
          crags: response,
          loading: false,
        });
      }
    });
  };
}

export default Home;
