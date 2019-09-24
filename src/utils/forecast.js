const request = require('request')

const forecast = (lat, lng, callback) => {
    const encodedCoordinates = encodeURIComponent(`${lat},${lng}`)
    const url = `https://api.darksky.net/forecast/2e37459618a1b0c6a9c227f950483024/${encodedCoordinates}`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) { 
            callback('Unable to find location!')
        } else {
            const todaySummary = body.daily.data[0].summary
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const temperatureLow = body.daily.data[0].temperatureLow
            const temperatureHigh = body.daily.data[0].temperatureHigh
            callback(undefined, `${todaySummary} It is currently ${temperature} degrees out. There is a 
                ${precipProbability}% chance of rain. Highs are around ${temperatureHigh} degrees 
                while lows are around ${temperatureLow} degrees.`)
        }
    })
}

module.exports = forecast