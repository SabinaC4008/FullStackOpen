const PhonebookView = ({list, filterReq, deleteHandler}) => {
  const regExVar = new RegExp(filterReq, "i")
  return(
    <div>
        <h2>Numbers</h2>
        {
            list.filter(item => regExVar.test(item.name)).map(item => 
                <div key={item.name}>
                    {item.name} {item.number} <button onClick={() => deleteHandler(item.id)}>delete</button> 
                </div>
                //check after submission if deleteHandler(item.id) is the appropriate way to handle this because this feels incorrect/unprofessional
            )
        }
    </div>
  )

}

export default PhonebookView