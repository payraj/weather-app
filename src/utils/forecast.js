const request = require('postman-request')

const forecast = (lat, long, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=7b0fb26c78aa358852498048745ca032&query=' + lat + ',' + long
    request( {url, json:true}, (err, {body}) => {
        if(err) {
            callback ('Network issue', undefined)
        } else if (body.error) {
            callback ('No Matches', undefined)
        } else {
            const {temperature} =   body.current
            callback (undefined, {
                temperature
                })
        }
    })

}

module.exports = forecast