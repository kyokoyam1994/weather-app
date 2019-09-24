const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Configuration
const dirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlerbar setup code for dynamic rendering
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up directory for static rendering
app.use(express.static(dirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Kosei Yokoyama'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kosei Yokoyama'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Kosei Yokoyama',
        message: 'This is the help page.'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {lat, lng, location} = {}) => {
        if (error) {
            return res.send({error})
        } 

        forecast(lat, lng, (error, forecast) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })   
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    } 

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'ERROR',
        name: 'Kosei Yokoyama',
        message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'ERROR',
        name: 'Kosei Yokoyama',
        message: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})