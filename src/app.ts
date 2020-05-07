import path from 'path'

import express from 'express'
import hbs from 'hbs'

import { geocode } from './utils/geocode'
import { Coordinate } from './models/interfaces'
import { forecast } from './utils/forecast'

const app = express()
const port = parseInt(process.env.PORT || "3000")

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = 'templates/views'
const partialsPath = 'templates/partials'

// Setup habdlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve and not need to type extension .html in URL address
app.use(express.static(publicDirectory, {
    extensions: ["html"]
    })
)

app.get("/", (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Adrian Kubica'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adrian Kubica'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Adrian Kubica'
    })
})

app.get("/weather", (req, res) => {
    const address = req.query.address?.toString()
    if (!address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(address, (error: string, {latitude, longitude, location}: Coordinate = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(longitude!!, latitude!!, (error: string, forecastData: any) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
           error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: [1, ,2]
    })
})

app.get("/help/*", (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Help article not found',
        name: 'Adrian Kubica'
    })
})

app.get("*", (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Page not found',
        name: 'Adrian Kubica'
    })
})

app.listen(port, '0.0.0.0', ()=> {
    console.log(`Server is up on port ${port}`)
})