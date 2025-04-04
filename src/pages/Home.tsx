import boulderJson from '../data/boulder_crags.json';
import sportJson from '../data/sport_crags.json';
import tradJson from '../data/trad_crags.json';
import winterJson from '../data/winter_crags.json';
import { computeDistanceBetween } from 'spherical-geometry-js';
import React, { Component } from 'react';

const cragObj: { [index: string]: any } = {
  boulder: boulderJson,
  sport: sportJson,
  trad: tradJson,
  winter: winterJson,
};

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
    }[];
  } = {
    style: '',
    location: '',
    range: 50000,
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
    }[] = this.state.crags;
    console.log(crags);
    return (
      <ul className='flex flex-wrap justify-center'>
        {crags.map((crag) => (
          <li className='flex flex-col animate-pulse m-4 h-64 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 shadow-lg'>
            <div>
              <h2>{crag.name}</h2>
            </div>
          </li>
        ))}
      </ul>
    );
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

    if (cragObj[searchObj.style]) {
      console.log(searchObj);
      this.setState({ crags: cragObj[searchObj.style] });
    }
  };
}

export default Home;
