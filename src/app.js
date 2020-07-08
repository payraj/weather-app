const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log('Testing git!')
const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

 app.get( '', (req,res) => {
// res.send('Home page')
res.render('index' , {
    title: 'Home hbs',
    name: 'Raja'
})
 })

 app.get( '/about', (req,res) => {
     //res.send('<h1>About page</h1>')
     res.render('about' , {
        title: 'about hbs',
        name: 'Raja'
    })
     })

app.get( '/weather', (req,res) => {

    if(!req.query.address) {
        return res.send({
            error: 'Address yedi ra'
           })
    }
    console.log(req.query)
    geocode(req.query.address, (err,{latitude, longitude, location} = {}) => {
       
        if (err) {
        return res.send({error: err})
        }
        
        forecast(latitude, longitude, (err,fdata) => {
          if (err) {
             return res.send({
                 error: err
                })
          }
          res.send({
          location: location,
          forecast: fdata
        })
       })
     })
    })
       

app.get( '/products', (req,res) => {
    if(!req.query.search) {
        return res.send({
            error: 'Search yedi ra'
           })
    }
    console.log(req.query)
        res.send({
            products: []
           })
        })     


 app.get( '/help', (req,res) => {
//     res.send('Help page')
res.render('help' , {
    title: 'help hbs',
    name: 'Raja'
     })
    })

 app.get( '/help/*', (req,res) => {
    res.render('error' , {
        error: 'help page not found'
        }) 
    })

 app.get( '*', (req,res) => {
    res.render('error' , {
        error: 'page not found 404'
         })      
    })          

app.listen (3000, () => {
    console.log('Server created!')
})    


