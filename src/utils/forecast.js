const request = require('node-fetch');

const forecast = (latitude, longitude, callback) => 
    request(`http://api.weatherstack.com/current?access_key=bdef7c47877c5a693422cbb782f8a1e3&query=${latitude},${longitude}`)
        .then(resp => resp.json())
        .then(res => {
            if (res.error) {
                return callback('Bad coords');
            } 
            callback(undefined, `${res.current.weather_descriptions[0]}. Current temperature: ${res.current.temperature}. Feels like ${res.current.feelslike}`);
        })
        .catch(error => {
            console.log(error);
            callback('Unable to connect to weather service')
        });

module.exports = { forecast };