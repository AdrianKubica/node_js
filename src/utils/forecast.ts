import request from 'postman-request'

var apiKey = process.env.WEATHER_API_KEY

export const forecast = (longitude: number, latitude: number, callback: Function) => {
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${longitude},${latitude}`

    request({ url, json: true }, (error: string, { body }: any) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                precip: body.current.precip,
                feelslike: body.current.feelslike,
                windspeed: body.current.wind_speed,
                time: body.current.observation_time
            })
        }
    })
}