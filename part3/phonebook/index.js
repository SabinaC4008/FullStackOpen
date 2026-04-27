const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())
morgan.token('data', function getData(req, res){
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))
// Data 
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//Request Methods
app.get('/', (request, response) => {
  response.send('<div>Testing Get for Base URL</div>')
})

app.get('/info', (request, response) => {
  const requestTime = new Date()
  response.send(`Phonebook has info for ${persons.length} people <div>${requestTime.toString()}</div>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const note = persons.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(note => note.id !== id)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
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
  if(persons.find(item => item.name === body.name)){
    return response.status(400).json({ error: 'name must be unique' })
  }

  const idVal = Math.floor(Math.random() * 10000)

  const note = {
    "id": String(idVal),
    "name": body.name,
    "number": body.number,
  }

  persons = persons.concat(note)
  response.json(note)
})


//Endpoint Unknown
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)



//Making sure connecting to right port
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

