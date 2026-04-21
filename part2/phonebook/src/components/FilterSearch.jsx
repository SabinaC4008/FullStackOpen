const FilterSearch = ({filter, filterHandler}) => {
    return(
        <div>filter: <input value={filter} onChange={filterHandler}/></div>
    )
}

export default FilterSearch