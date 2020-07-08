const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +  encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGF5cmFqIiwiYSI6ImNrYmY0dHFobzA1cW8ycm1sYW4xYXA0eGoifQ.aSdX6qqEa9K45_9lUE3h5Q&limit=1'
    request( {url, json:true}, (err, {body}) => {
        if(err) {
            callback ('Network issue', undefined)
        } else if (body.features.length === 0) {
            callback ('No Matches', undefined)
        } else {
            const {center : cordinates, place_name: location } =   body.features[0]
                        
            callback (undefined, {
                latitude: cordinates[1],
                longitude: cordinates[0],
                location
                })
        }
    })

}


module.exports = geocode