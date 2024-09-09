


function getPopulation() {
  const city = document.getElementById('input').value;
  const PopulationDetails = document.getElementById('PopulationDetails');
 
  if (city === "") {
      PopulationDetails.innerHTML = '<p>City Not Found</p>';
      return;
  }
  const url = 'https://countriesnow.space/api/v0.1/countries/population/cities';

  fetch(url, {
      method: 'POST', // Use POST method as required by the API
      headers: {
          'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ city: city }) // Include city in the request body
  })
  .then(response => response.json())
  .then(data => {
      if (data.error) {
          PopulationDetails.innerHTML = '<p>City not found. Please try again.</p>';
      } else {
          console.log(data);
          const cityName = data.data.city;
          const populationCounts = data.data.populationCounts;
          // Get the most recent population count
          const latestPopulation = populationCounts[populationCounts.length - 1];
          PopulationDetails.innerHTML = `<h2>${cityName}</h2><p>Population: ${latestPopulation.value}</p>
          <p></p>`;
      }
  })
  .catch(error => {
      console.error(error);
      PopulationDetails.innerHTML = '<p>Error fetching data</p>';
  });
}
