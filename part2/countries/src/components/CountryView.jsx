  const CountryView = ({countryList, buttonHandler}) => {
    if(countryList.length > 10){
      return (<div>Too many countries, specify a more specific filter</div>)
    } else if (countryList.length == 1){
        const countryToDisplay = countryList[0]
        const languagesToDisplay  = Object.values(countryToDisplay.languages)
        return(
            <div>
                <h1>{countryToDisplay.name.common}</h1>
                <p>Captial: {countryToDisplay.capital[0]}</p>
                <p>Area: {countryToDisplay.area}</p>
                <h2>Languages</h2>
                <ul>
                    {languagesToDisplay.map(item => <li key={item}>{item}</li>)}
                </ul>
                <img src={countryToDisplay.flags.png} />
            </div>
        )
    }
    else {
      return (countryList.map(item => <div key={item.name.common}>{item.name.common}<button onClick={() => buttonHandler(item.name.common)}>show</button></div>)      
      )
    }
  }

  export default CountryView