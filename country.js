const countryName=new URLSearchParams(location.search).get('name')
const countryDetails = document.querySelector(".country-details")
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const countryPopulation = document.querySelector('.country-details h1')
const nativeName=document.querySelector('.native-Name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion=document.querySelector('.sub-Region')
const capital=document.querySelector('.capital')
const topLevelDomain=document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountriess = document.querySelector('.border-countries')
const themeChanger=document.querySelector(".theme-changer")
fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`).then((res)=>res.json())
.then(([data])=>{
    flagImage.src= data.flags.svg
    countryNameH1.innerText = data.name.common
    population.innerText= data.population.toLocaleString('en-IN')
    topLevelDomain.innerText=data.tld.join(',')
    currencies.innerText=data.currencies[0]
    languages.innerText=data.languages[0]
    if(data.name.nativeName){
        nativeName.innerText=Object.values(data.name.nativeName)[0].common
    }else{
        nativeName.innerText =data.name.common
    }
    if(data.currencies){
        currencies.innerText= (Object.values(data.currencies).map((currencies)=>currencies.name).join(", "))
    }
    if(data.capital){
        capital.innerText= data.capital.join(", ")
    }
    if(data.languages){
        languages.innerText= Object.values(data.languages).join(", ")
    }
    if(data.region){
        region.innerText=data.region
    }
    if(data.subregion){
        subRegion.innerText=data.subregion
    }
    if(data.borders){
        data.borders.forEach((border)=>{
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
            .then(([borderCountries])=>{
                if(borderCountries){
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText=borderCountries.name.common
                borderCountryTag.href=`country.html?name=${borderCountries.name.common}`
                borderCountriess .append(borderCountryTag)
                }
            })
        })
    }
})
themeChanger.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
    localStorage.setItem('themeChanger',document.body.classList)
    
})
document.body.classList = localStorage.getItem('themeChanger')