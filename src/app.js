const path = require('path');
const express = require('express');
const hbs = require('hbs');

const { getWeather } = require('./utils/weather');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 3000; // heroku port

// Define paths for Express config
const pubDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Static directory
app.use(express.static(pubDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    });
});

app.get('/help/*', (req, res) => {
    res.send('<h1>Article not found</h1>');
});

app.get('/weather', (req, res) => {
    const { address } = req.query;

    if (!address) {
        return res.send({
            error: 'Provide an address'
        });
    }

    getWeather(address, (error, data) => {
        if (data) {
            res.send(data);
        }

        if (error) {
            res.send(error);
        }
    })
});

app.get('/products', (req, res) => {
    console.log(req.query);
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        });
    }
    res.send({
        products: []
    });
});

app.get('*', (req, res) => {
    res.send('<h1>404</h1>');
});

app.listen(port, () => {
    console.log('Server is up on port 3000');
});