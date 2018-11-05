'use strict';


function getDataFromApi(searchTerm, callback) {
  // const url = `https://statsapi.mlb.com/api/v1/people/${searchTerm}`;
  const url = `https://statsapi.mlb.com/api/v1/people/${searchTerm}?season=2018&hydrate=stats(type=season=2018)`;
  $.getJSON(url, callback);
}

function displaySearchData(data) {
  const playerId = data.people[0].id;
  const fullname = data.people[0].fullName;
  const birthDate = data.people[0].birthDate;
  const currentAge = data.people[0].currentAge;
  const primaryNumber = data.people[0].primaryNumber;
  const height = data.people[0].height;
  const weight = data.people[0].weight;
  const active = data.people[0].active;
  const primaryPosition = data.people[0].primaryPosition.name;
  const draftYear = data.people[0].draftYear;
  const mlbDebutDate = data.people[0].mlbDebutDate;

  const avg = data.people[0].stats[0].splits[0].stat.avg;
  const gamesPlayed = data.people[0].stats[0].splits[0].stat.gamesPlayed;
  const runs = data.people[0].stats[0].splits[0].stat.runs;
  const doubles = data.people[0].stats[0].splits[0].stat.doubles;
  const triples = data.people[0].stats[0].splits[0].stat.triples;
  const homeRuns = data.people[0].stats[0].splits[0].stat.homeRuns;
  const strikeOuts = data.people[0].stats[0].splits[0].stat.strikeOuts;
  const baseOnBalls = data.people[0].stats[0].splits[0].stat.baseOnBalls;
  const hits = data.people[0].stats[0].splits[0].stat.hits;
  const obp = data.people[0].stats[0].splits[0].stat.obp;
  const slg = data.people[0].stats[0].splits[0].stat.slg;
  const ops = data.people[0].stats[0].splits[0].stat.ops;
  const rbi = data.people[0].stats[0].splits[0].stat.rbi;


  const results = `
    <p>
      <img src="https://securea.mlb.com/mlb/images/players/head_shot/${playerId}.jpg">
      <h2>${fullname}</h2>
        <ul>
          <li>Birth Date: ${birthDate}</li>
          <li>Current Age: ${currentAge}</li>
          <li>Jersey Number: ${primaryNumber}</li>
          <li>Height: ${height}</li>
          <li>Weight: ${weight}</li>
          <li>Active: ${active}</li>
          <li>Primary Position: ${primaryPosition}</li>
          <li>Draft Year: ${draftYear}</li>
          <li>MLB Debut: ${mlbDebutDate}</li>
        </ul>
    </p>
    <p>    
      <h2>2018 Stats:</h3>
        <ul>
          <li>Batting Average: ${avg}</li>
          <li>Games Played: ${gamesPlayed}</li>
          <li>Runs: ${runs}</li>
          <li>Doubles: ${doubles}</li>
          <li>Triples: ${triples}</li>
          <li>Home Runs: ${homeRuns}</li>
          <li>Strike Outs: ${strikeOuts}</li>
          <li>Walks: ${baseOnBalls}</li>
          <li>Hits: ${hits}</li>
          <li>On Base %: ${obp}</li>
          <li>Slugging %: ${slg}</li>
          <li>OPS: ${ops}</li>
          <li>RBI: ${rbi}</li>
        </ul>
    </p>
  `;
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let queryTarget = $(event.currentTarget).find('.js-query');
    let query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, displaySearchData);
  });
}

$(watchSubmit);