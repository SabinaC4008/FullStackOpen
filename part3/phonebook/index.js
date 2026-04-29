require('dotenv').config()

const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')
const person = require('./models/person')


const app = express()

app.use(express.json())
morgan.token('data', function getData(req, res){
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))








//Request Methods
app.get('/', (request, response) => {
  response.send('<div>Testing Get for Base URL</div>')
})

app.get('/info', (request, response) => {
  const requestTime = new Date()
  const sizeOfCollection = 0; 
  Person.find({}).then(persons => {
    response.send(`Phonebook has info for ${persons.length} people <div>${requestTime.toString()}</div>`)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  }
  )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(result => 
    {
      if (result) { 
        response.json(result)
      } else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})





app.delete('/api/persons/:id', (request, response) => {  
  Person.findByIdAndDelete(request.params.id).then(result => response.status(204).end())
})



//Creating new persons
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  } 
  if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }

  //Comeback to this error
  if(!(Person.findOne({name: body.name}))){
    return response.status(400).json({ error: 'name must be unique' })
  }





  const personTemp = new Person({
    "name": body.name,
    "number": body.number,
  })

  personTemp.save()
  .then(result => response.json(result))
  .catch(error => next(error))
})




app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  if (!body.number){
    return response.status(400).json({
      error: 'number missing'
    })
  }
  Person.findById(request.params.id).then(result => {
    if(!result){
      return response.status(400).end()
    }

    result.name = body.name
    result.number = body.number

    return result.save()
    .then(result => response.json(result))
  })
  .catch(error => next(error))
})






//Endpoint Unknown
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)







const errorHandling = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }
  next(error)
}

app.use(errorHandling)







//Making sure connecting to right port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

