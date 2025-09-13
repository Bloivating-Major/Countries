const countryCardContainer = document.querySelector(".countries-container");

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,currencies,languages,flags,borders"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      console.log(country);
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
            <img src=${country.flags.svg} alt="flag" />
              <div class="country-card-info">
                <h3 class="country-card-name">${country.name.common}</h3>
                <p><b>Population : </b>${country.population}</p>
                <p><b>Region : </b>${country.region}</p>
                <p><b>Capital : </b>${country.capital}</p>
              </div>
    `;
      countryCardContainer.appendChild(countryCard);
    });
  });
