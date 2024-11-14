const countriesContainer=document.querySelector(".contries-container")
const filterByRegion = document.querySelector(".filter-by-region")
let allCountriesData
const searchInput=document.querySelector(".search-container input")
const themeChanger=document.querySelector(".theme-changer")
fetch("https://restcountries.com/v3.1/all")
.then((response)=>response.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData = data;
   
})

filterByRegion.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((response)=>response.json())
    .then(renderCountries)
   
})

function renderCountries(data){
    countriesContainer.innerHTML=""
    data.forEach((country) =>{
    const countryCard = document.createElement("a")
    countryCard.classList.add("country-card")
    countryCard.href=`country.html?name=${country.name.common}`
    countryCard.innerHTML= `<img src="${country.flags.svg}" alt="${country.name.common}"/>
    <div class="card-text">
    <h3 class="card-title">${country.name.common}</h3>
    <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
    <p><b>Region: </b>${country.region}</p>
    <p><b>Capital: </b>${country.capital}</p>
`
    countriesContainer.append(countryCard)
})
}

searchInput.addEventListener('input',(e)=>{
console.log(e.target.value)
const filterCountries=allCountriesData.filter((country)=>country.name.common.toLowerCase().includes(e.target.value))
renderCountries(filterCountries)
})

themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
})

