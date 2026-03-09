const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const morgan = require('morgan')
app.use(express.json())
app.use(express.static('dist'))

let morganConfig = morgan(function (tokens, request, response) {
    if (tokens.method(request) == 'POST') {
        return [
            tokens.method(request, response),
            tokens.url(request, response),
            tokens.status(request, response),
            tokens.res(request, response, 'content-length'), '-',
            tokens['response-time'](request, response), 'ms',
            JSON.stringify(request.body)
        ].join(' ')
    }
})

app.use(morganConfig)

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

app.get('/api/persons', (request, response) => {
    response.send(persons);

    response.status(200)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id == id)

    if (person) {
        response.send(person)
        response.status(200)
    }
    else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (!request.body.name) {
        return response.status(400).json({
            error: 'Name is missing'
        })
    }

    if (!request.body.number) {
        return response.status(400).json({
            error: 'Number is missing'
        })
    }

    const checkName = persons.filter(person => person.name.toLowerCase() === request.body.name.toLowerCase())
    if (checkName.length) {
        return response.status(400).json({
            error: 'Name already excists in DB'
        })
    }

    const newPerson = {
        id: Math.random() * 1000,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(newPerson)

    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    const now = new Date()
    const HTML = `The phonebook has info on ${persons.length} people <br>
                ${now.toString()}`

    response.send(HTML)
    response.status(200)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})