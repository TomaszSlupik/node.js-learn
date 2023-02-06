const express = require("express")
const path = require("path")
const app = express()
const port = process.env.port || 3400;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())


app.set('views', path.join(__dirname, './../frontend/views'))
app.set('view engine', 'ejs')

app.use('/', require('./routes/routes'))
app.use('/assets', express.static(path.join(__dirname, './../frontend/assets')))
app.use('/js', express.static(path.join(__dirname, './../frontend/js')))


app.listen(port, (err) => {
    if (err) {
        return "Pojawił się błąd"
    }
    console.log(`Apka działa na porcie ${port}`)
})