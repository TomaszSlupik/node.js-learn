const mongoose = require("mongoose")
const express = require("express")
const app = express()
const Character = require('../models/Character')
const router = express.Router()
const connectionString = 'mongodb+srv://tomek:tomek@cluster0.xylx99e.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', true)

async function run() {



    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("Połączono z bazą"))

    const licznik = await Character.countDocuments()
    console.log(licznik)
    if (licznik) {
        Character.collection.drop()
    }

    await Character.create([{
            name: "Marcin",
            age: 34,
            rank: "mid"
        },
        {
            name: "Tomasz",
            age: 30,
            rank: "mid"
        },
        {
            name: "Ula",
            age: 21,
            rank: "junior"
        },
        {
            name: "Natalia",
            age: 26,
            rank: "regular"
        },
        {
            name: "Michał",
            age: 26,
            rank: "junior"
        },
        {
            name: "Wojtek",
            age: 16,
            rank: "junior"
        }
    ])

    // METODY 

    // Znalezienie użytkownika
    // const searchJunior = await Character.collection.find({ rank: "junior" }).toArray()
    // console.log(searchJunior)

    // Update 
    // const findMid = await Character.find()
    // const old = await Character.findByIdAndUpdate({_id: findMid[3]._id}, {rank: "starszy"})
    // console.log(old)

    // Zamiana wieku u jednej osoby - update
    // const personChange = await Character.findOneAndUpdate({name: "Michał"}, {age: 39})
    //  console.log(personChange)

    //  Update u wielu osób
    // const updateMany = await Character.updateMany({rank: "junior"}, {rank: "lead"})
    // console.log (updateMany)

    // U wszytskich użytkowników zminiam na aktywny: 
    // await Character.updateMany({}, {work: 'aktywny'})

    // I sposób dodanie do bazy użytkownika
    // const insert = new Character ({name: "Łucja", age: 33})
    // await insert.save(function(err, someVal){
    //     if (err) {return `Błąd w zapisie Error ${err}`}
    //     console.log(`Dodano do bazy ${someVal}`)
    // })

    // II sposób dodanie do bazy użytkownika
    // await Character.collection.insertOne({name: "Krzysiek", age: 22})

    // usuwanie użytkownika
    // await Character.deleteOne({name: "Michał"})

    // Usuwanie wszytskich użytkowników 
    // await Character.deleteMany()
}

// Wyrenderowanie na stronę
run()
router.get('/', async function (req, res) {

    const dataBase = await Character.find()

    await res.render('index', {
        title: "Tytuł strony",
        find: dataBase
    })
})

router.get('/posts', async function (req, res) {
    const dataShow = await Character.find()
    await res.json(dataShow)
})

router.post("/", async function (req, res) {
    console.log("Dane z formularza", req.body)
    const insert = new Character({
        name: req.body.name,
        rank: req.body.rank,
        age: req.body.age
    })
    await insert.save(function (err, someVal) {
        if (err) {
            return `Błąd w zapisie Error ${err}`
        }
        console.log(`Dodano do bazy ${someVal}`)
    })
    res.redirect("/")
})

router.post("/update", async function (req, res) {

    const findMid = await Character.find()
    const old = await Character.findByIdAndUpdate({
        _id: findMid[0]._id
    }, {
        name: req.body.name
    })
    console.log(old)
    res.redirect("/")
})


router.post("/delete", async function (req, res) {
    await Character.deleteOne({
        name: req.body.name
    })
    res.redirect("/")
})


router.post("/deleteOnetoThree", async function (req, res) {
    const docs = await Character.find()
    await Character.deleteOne({
        _id: docs[req.body.ktoryusunac]._id
    })
    res.redirect("/")
})


module.exports = router