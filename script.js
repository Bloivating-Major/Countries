const countryCardContainer = document.querySelector(".countries-container");
const selectRegion = document.querySelector(".selectRegion");

selectRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      countryCardContainer.innerHTML = "";
      data.forEach(renderCountryCards);
    });
});

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,currencies,languages,flags,borders"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(renderCountryCards);
  });

function renderCountryCards(country) {
  console.log("hello");
  const countryCard = document.createElement("a");
  countryCard.classList.add("country-card");
  countryCard.href = `/country.html?name=${country.name.common}`;
  countryCard.innerHTML = `
            <img src=${country.flags.svg} alt="${country.name.common} Flag" />
              <div class="country-card-info">
                <h3 class="country-card-name">${country.name.common}</h3>
                <p><b>Population : </b>${country.population.toLocaleString(
                  "en-IN"
                )}</p>
                <p><b>Region : </b>${country.region}</p>
                <p><b>Capital : </b>${country.capital}</p>
              </div>
    `;
  countryCardContainer.appendChild(countryCard);
}
