const countryName = new URLSearchParams(window.location.search).get("name");
const countryDetailsContainer = document.querySelector(".country-details");

fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((res) => res.json())
  .then(([country]) => {
    let nativeName = country.name.common;
    if (country.name.nativeName) {
      nativeName = Object.values(country.name.nativeName)[0].official;
    }

    let currencies = "N/A";
    if (country.currencies) {
      currencies = Object.values(country.currencies)[0].name;
    }

    countryDetailsContainer.innerHTML = `
     <div class="country-flag">
          <img src="${
            country.flags.svg
          }" alt="Country Flag" class="country-flag" />
        </div>
        <div class="country-data">
          <h1 class="country-name">${country.name.common}</h1>
          <div class="country-info">
            <p><b>Native Name :</b>${nativeName}</p>
            <p><b>Population :</b> ${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region :</b> ${country.region}</p>
            <p><b>Sub Region :</b> ${country.subregion}</p>
            <p><b>Capital :</b> ${country.capital}</p>
            <p><b>Top Level Domain :</b> ${country.tld}</p>
            <p><b>Currencies :</b> ${currencies} </p>
            <p><b>Languages :</b> ${Object.values(country.languages).join(
              ", "
            )} </p>
          </div>
          <div class="border-countries">
            <b>Border Countries:</b>
          </div>
        </div>
    `;

    const borderCountriesContainer =
      document.querySelector(".border-countries");
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([data]) => {
            const borderCountry = document.createElement("a");
            borderCountry.classList.add("border-country");
            borderCountry.href = `/country.html?name=${data.name.common}`;
            borderCountry.innerText = data.name.common;
            borderCountriesContainer.appendChild(borderCountry);
          });
      });
    }
  });
