const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackopen:${password}@notes.hgdqgey.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Notes`

mongoose.set('strictQuery', false)

mongoose.connect(url, { family: 4 }) //forces IPv4 to be used

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Edwin was here testing ',
    important: true,
})

//FETCHING ALL
// Note.find({important : true}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })

// CREATING NEW
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})