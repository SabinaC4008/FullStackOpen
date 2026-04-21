const PhonebookView = ({list, filterReq}) => {
  const regExVar = new RegExp(filterReq, "i")
  return(

    <div>
        <h2>Numbers</h2>
        {list.filter(item => regExVar.test(item.name)).map(item => <div key={item.name}>{item.name} {item.number}</div>)}
    </div>
  )

}

export default PhonebookView