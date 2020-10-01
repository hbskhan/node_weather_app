const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Paths for Express Configuration
const publicDir = path.join(__dirname, '../public')
const viewsDir = path.join(__dirname, '../templates/views')
const partialDir = path.join(__dirname, '../templates/partials')

//Config Express
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialDir)

//Set path for static assets
app.use(express.static(publicDir))

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Hamdan Khan'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'HK'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'HK',
        description: 'Helpful text'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please input address'
        })
    }

    console.log(req.query)

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, {temperature, realFeel, description})=>{
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                description,
                temperature,
                realFeel,
                location,
                address: req.query.address
            })

        })
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'HK',
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'HK',
        message: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log('Server up on 3000!')
})