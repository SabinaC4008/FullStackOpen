const mongoose = require('mongoose')

const password = process.argv[2]

const url = `mongodb+srv://sabinac_db_user:${password}@cluster0.g6vyqpj.mongodb.net/persons?appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
    "name": String, 
    "number": String
})

const Person = mongoose.model('Person', personSchema)

if(!process.argv[3]){
    Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else {
    const inputTemp = new Person({
        "name": process.argv[3], 
        "number": process.argv[4]
    })

    inputTemp.save().then(responseObject => 
    {
        console.log(process.argv[3], "saved to phonebook")
        mongoose.connection.close()
    })
}

