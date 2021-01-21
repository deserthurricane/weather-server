const { geocode } = require("./geocode");
const { forecast } = require("./forecast");

const getWeather = (address, callback) => {
    geocode(address, (error, geocodeData) => {
        if (error) {
            return callback('Error: ', error);
        } 
        
        forecast(geocodeData.latitude, geocodeData.longitude,/* 100500, 100500, */ (error, forecastData) => {
            if (error) {
                return callback('Error: ', error);
            } 

            console.log(geocodeData, forecastData);

            const result = {
                address,
                location: geocodeData.location,
                forecast: forecastData,
            }

            callback(undefined, result);
        });
    })
}; 

module.exports = { getWeather };