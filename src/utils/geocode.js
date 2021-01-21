const request = require('node-fetch');

const geocode = (city, callback) => 
    request(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1IjoicHItcG9saXNoY2h1ayIsImEiOiJja2p5bnNnZWEwdGNpMm5udzYyY2FuYTNiIn0.FH1qVdoolgdN-MR09s_Vag`)
        .then(resp => resp.json())
        .then(res => {
            // console.log(res.features);
            if (!res.features.length || !res.features) {
                return callback('Invalid location');
            }
            const latitude = res.features[0].center[1];
            const longitude = res.features[0].center[0];
            console.log(res.features[0].place_name)
            callback(undefined, { latitude, longitude, location: res.features[0].place_name })
        })
        .catch(error => {
            // console.log(error);
            callback('Service unavailable')
        });

module.exports = { geocode };