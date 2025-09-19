const countryCardContainer = document.querySelector(".countries-container");
const selectRegion = document.querySelector('.selectRegion');
const searchInput = document.querySelector('.searchFeature input');
const darkModeToggle = document.querySelector('#darkModeToggle');
const body = document.body;
const icon = darkModeToggle.querySelector('i');
const modeText = darkModeToggle.querySelector('span');

if(localStorage.getItem('darkMode') === 'enabled'){
  body.classList.add('dark-mode');
  icon.classList.replace('fa-moon', 'fa-sun');
  modeText.textContent = 'Light Mode';
}else{
  body.classList.remove('dark-mode');
  icon.classList.replace('fa-sun', 'fa-moon');
  modeText.textContent = 'Dark Mode';
}

darkModeToggle.addEventListener('click', ()=>{
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  if(isDark){
    localStorage.setItem('darkMode', 'enabled');
    icon.classList.replace('fa-moon', 'fa-sun');
    modeText.textContent = 'Light Mode';
  }else{
    localStorage.setItem('darkMode', 'disabled');
    icon.classList.replace('fa-sun', 'fa-moon');
    modeText.textContent = 'Dark Mode';
  }
})

let allCountriesData;

selectRegion.addEventListener("change", (e)=>{
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res)=> res.json()).then((data)=>{
    countryCardContainer.innerHTML=""
    data.forEach(renderCountryCards);
  })
})

searchInput.addEventListener("input", (e)=>{
  countryCardContainer.innerHTML = ""; 
  const filteredData = allCountriesData.filter((country)=> country.name.common.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()));
  filteredData.forEach(renderCountryCards);
});

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,currencies,languages,flags,borders"
)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(renderCountryCards);
    allCountriesData = data;
  });

function renderCountryCards(country) {
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
