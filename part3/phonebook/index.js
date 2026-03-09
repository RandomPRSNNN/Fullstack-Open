require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const mongoose = require('mongoose')
const app = express()

const morgan = require('morgan')

let requestLogger = morgan(function (tokens, request, response) {
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

const errorHandler = (error, request, response, next) => {
    console.log('EDWInnnnnn')
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    else if(error.name = 'ValidationError')
    {
        return response.status(400).send(error.message)
    }

    next(error)
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

let persons = []

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.post('/api/persons', (request, response, next) => {
    console.log('BEGGGGGGGGGGGGGG')
    const body = request.body
    console.log('BEG')

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error =>{
            console.log('EDWINNNNNNNNNNNNNNNNNNNNNNNNNNN')
            console.log(error.message)
            console.log('EDWINNNNNNNNNNNNNNNNNNNNNNNNNNN2')
            next(error)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { number } = request.body

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end()
            }

            person.number = number

            return person.save().then((updatedPerson) => {
                response.json(updatedPerson)
            })
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.find({}).then(people => {
        const now = new Date()
        const HTML = `The phonebook has info on ${people.length} people <br>
        ${now.toString()}`

        response.send(HTML)
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})