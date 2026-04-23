const CountrySearch = ({search, searchHandler}) => {
    return(
        <div>find country: <input value={search} onChange={searchHandler}/></div>
    )
}

export default CountrySearch