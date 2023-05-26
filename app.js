const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/data'); //data is db
    console.log("db started")
}

const loginSchema = new mongoose.Schema({   //schema is ntg but collection
    username: String,
    password: String
  });

const User = mongoose.model('User', loginSchema); // model is a document

app.post('/', async (request,response) => {

    let user = new User()
    user.username = request.body.username
    user.password = request.body.password
    const doc = await user.save() // to save model(document) in db and it is asynchronous function
    
    console.log(doc)
    response.json(doc)
})

app.get("/user", async (request,response) => {
    const result = await User.find({})
    response.send(result)
})

app.listen(3000, () => {
    console.log("server started")
})