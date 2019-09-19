const request = require('request')

const geocode = (address, callback) => {
    const encodedAddress = encodeURIComponent(address)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoia3lva295YW1hIiwiYSI6ImNrMDh2dDh2YzAyY3QzaXE4cDhzNnBtOGEifQ.9VgTfO8Uo5GjKB-PFuidCw&limit=1`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geo service!')
        } else if (body.features.length === 0) {
            callback('No results found!')
        } else {
            callback(undefined, {
                location: body.features[0].place_name,
                lat: body.features[0].center[1],
                lng: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode