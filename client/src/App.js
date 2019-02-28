/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';
// import dbCall from '../../config/key';

import Standings from './components/Standings';
import FullStandings from './components/FullStandings';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      view: 'main',
    };
    this.renderView = this.renderView.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get('/espn/teamstandings',
      {
        method: 'GET',
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        const data = res.data;
        this.setState({
          teams: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClick() {
    const { view } = this.state;
    this.setState({
      view: 'fullstandings',
    });
  }

  // eslint-disable-next-line consistent-return
  renderView() {
    const { view, teams } = this.state;
    if (view === 'main') {
      return (
        <div id="mainstandings">
          <Standings teams={teams} handleClick={this.handleClick} />
        </div>
      );
    } if (view === 'fullstandings') {
      return (
        <div id="fullstandings">
          <FullStandings teams={teams} />
        </div>
      );
    }
  }

  render() {
    return (
      this.renderView()
    );
  }
}
