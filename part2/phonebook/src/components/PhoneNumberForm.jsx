const PhoneNumberForm = ({append, name, nameHandler, number, numberHandler}) => {
    return (
        <div> 
            <h2>Add A New Person or Number</h2>
            <form onSubmit={append}>
                <div>name: <input value={name} onChange={nameHandler}/></div>
                <div>number: <input value={number} onChange={numberHandler}/></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default PhoneNumberForm