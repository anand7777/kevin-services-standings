/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';

const Standings = (props) => {
  const { teams, handleClick } = props;
  const nfcWestTeams = teams.filter(team => team.division === 'NFC West').sort((a, b) => b.wins - a.wins);

  return (
    <div className="col-md">
      <p className="h5 text-dark font-weight-bold">2019 NFC West Standings</p>
      <table className="table table-hover table-sm rounded" style={{ width: 30, height: 30 }}>
        <thead>
          <tr>
            <th scope="col">TEAM</th>
            <th scope="col">W</th>
            <th scope="col">L</th>
            <th scope="col">T</th>
            <th scope="col">PCT</th>
            <th scope="col">PF</th>
            <th scope="col">PA</th>
          </tr>
        </thead>
        <tbody>
          {nfcWestTeams.map(team => (
            <tr key={team._id}>
              <th scope="row"><a href={team.link}>{team.team_name}</a></th>
              <th scope="row">{team.wins}</th>
              <th scope="row">{team.losses}</th>
              <th scope="row">{team.tie}</th>
              <th scope="row">{team.percentage.toFixed(3).slice(1)}</th>
              <th scope="row">{team.points_for}</th>
              <th scope="row">{team.points_against}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="btn btn-link" onClick={handleClick}>Full Standings</button>
    </div>
  );
};

export default Standings;
