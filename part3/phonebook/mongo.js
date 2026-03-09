const mongoose = require('mongoose')

const password = process.argv[2]
const inputName = process.argv[3]
const inputNumber = process.argv[4]

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const newPerson = new Person({
    name: inputName,
    number: inputNumber,
})

switch (true) {
    case (process.argv.length === 3): //All
    Person.find({}).then(result => {
            console.log(`Phonebook (${result.length}):`)
            result.forEach(person => {
                console.log(person.name, person.number)
            })

            mongoose.connection.close()
        })
        break
    case (process.argv.length === 5): //New
        newPerson.save().then(result => {
            console.log(`Added: ${result.name} ${result.number} to phonebook`)
            mongoose.connection.close()
        })
        break
    case (process.argv.length < 3):
        console.log('Password missing...')
        process.exit(1)
        break
}

const url = `mongodb+srv://fullstackopen:${password}@notes.hgdqgey.mongodb.net/phoneBookApp?retryWrites=true&w=majority&appName=phoneBook`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 }) //forces IPv4 to be used