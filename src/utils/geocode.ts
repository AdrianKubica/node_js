import request from 'postman-request'

var apiKey = process.env.GEOCODE_API_KEY

export const geocode = (address: string, callback: Function) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiKey}&limit=1`

    request({ url, json: true}, (error: string, { body }: any) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}