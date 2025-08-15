import fetchWeatherData from '../apis/api1/api1.ts';
import React, { Component } from 'react';
import getDistanceFromLatLonInKm from '../utils.ts';

class Home extends Component {
  state: {
    style: string;
    loading: boolean;
    location: string;
    range: number;
    sort: string;
    dayIndex: number;
    crags: {
      aspect: string;
      rockType: string;
      long: string;
      lat: string;
      crag_name: string;
      stared_routes: string;
      distance: string;
      weather_data: any;
      weather_score: number[];
    }[];
  } = {
    style: '',
    location: '53.31864, -1.60161',
    range: 10,
    sort: 'weather score',
    dayIndex: 0,
    crags: [],
  };
  render() {
    return (
      <div>
        <h1 className='justify-center m-auto text-center'>Connies</h1>
        <form className='bg-slate-400 max-w-lg p-4 rounded-md ml-auto mr-auto '>
          <div className='grid grid-cols-2 gap-4'>
            <label>Climbing style:</label>
            <div>
              <select id='styles' name='styles'>
                <option value='boulder'>Boulder</option>
                <option value='sport'>Sport</option>
                <option value='trad'>Trad</option>
                <option value='winter'>Winter</option>
              </select>
            </div>
            <label>Origin location</label>
            <input
              id='location'
              onChange={this.handleLocationChange}
              value={this.state.location}
            ></input>
            <label>Range</label>
            <input
              id='range'
              onChange={this.handleRangeChange}
              value={this.state.range}
            ></input>
            <label>Date:</label>
            <select id='date' name='date'>
              <option value='0'>today</option>
              <option value='1'>{this.getDay(1)}</option>
              <option value='2'>{this.getDay(2)}</option>
              <option value='3'>{this.getDay(3)}</option>
              <option value='4'>{this.getDay(4)}</option>
              <option value='5'>{this.getDay(5)}</option>
              <option value='6'>{this.getDay(6)}</option>
            </select>
          </div>
          <div className='justify-center ml-auto mr-auto'>
            <button
              onClick={(e: any) => {
                this.handleFromSubmit(e);
              }}
            >
              Search
            </button>
          </div>
        </form>
        <div className='max-w-lg mr-auto ml-auto'>
          <form className='grid grid-cols-2 gap-4'>
            <label>Sort order:</label>
            <select
              onChange={this.handleSortChange}
              value={this.state.sort}
              id='sort'
              name='sort'
            >
              <option value='weather score'>
                Conditions: best -{'>'} worst
              </option>
              <option value='distance'>
                Distance: closest -{'>'} furthest
              </option>
              <option value='num stared routes'>
                Num of stared routes: most - {'>'} least
              </option>
              <option value='alphabetically'>Alphabetically</option>
            </select>
          </form>
          {this.state.loading ? <h2>Loading</h2> : <></>}
          <this.makeCragList />
        </div>
      </div>
    );
  }

  handleSortChange = () => {
    const sort = document.getElementById('sort') as HTMLSelectElement;
    this.setState({ sort: sort.value });
  };

  getDay = (daysToAdd: number) => {
    const today = new Date();
    const day = today.getDay() + daysToAdd;
    // Sunday - Saturday : 0 - 6
    const weekdays = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];

    return weekdays[day % 7];
  };

  makeCragList = () => {
    const crags: {
      aspect: string;
      rockType: string;
      long: string;
      lat: string;
      crag_name: string;
      stared_routes: string;
      distance: string;
      weather_data: any;
      weather_score: number[];
    }[] = this.state.crags;

    crags.sort((a, b) => {
      if (this.state.sort === 'weather score') {
        return (
          b.weather_score[this.state.dayIndex] -
          a.weather_score[this.state.dayIndex]
        );
      } else if (this.state.sort === 'distance') {
        return parseInt(a.distance) - parseInt(b.distance);
      } else if (this.state.sort === 'num stared routes') {
        return parseInt(b.stared_routes) - parseInt(a.stared_routes);
      } else {
        const nameA = a.crag_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.crag_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    });

    if (crags[0]) {
      return (
        <ul className='flex flex-wrap justify-center'>
          {crags.map((crag) => (
            <li
              key={crag.crag_name}
              className='flex flex-col m-4 h-64 w-full border-1 r-md'
            >
              <div>
                <h2>crag_name: {crag.crag_name}</h2>
                <h2>distance: {parseInt(crag.distance)}</h2>
                <h2>
                  weather_score: {crag.weather_score[this.state.dayIndex]}
                </h2>
                <h2>num stared routes: {crag.stared_routes}</h2>
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

    enum Styles {
      boulder,
      sport,
      trad,
      winter,
    }

    const searchObj: { style: Styles; location: string; range: number } = {
      style: styles.value,
      location: this.state.location,
      range: this.state.range,
    };

    // example location: 53.52574940018496, -1.919685834247175

    const searchLatLong = searchObj.location.split(', ');
    const searchLat = parseFloat(searchLatLong[0]);
    const searchLong = parseFloat(searchLatLong[1]);

    const dayIndexElem: any = document.getElementById(
      'date'
    ) as HTMLSelectElement;
    const dayIndex: number = dayIndexElem.value;

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
          dayIndex: dayIndex,
          loading: false,
        });
      }
    });
  };
}

export default Home;
