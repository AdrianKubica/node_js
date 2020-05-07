"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postman_request_1 = __importDefault(require("postman-request"));
var weather = function (longitude, latitude, callback) {
    var url = "http://api.weatherstack.com/current?access_key=e4c121e7bdfa54cbe55936df8ef141db&query=" + longitude + "," + latitude;
    postman_request_1.default({ url: url, json: true }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Unable to connect to weather services', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: body.current.temperature,
                humidity: body.current.humidity,
                precip: body.current.precip,
                feelslike: body.current.feelslike,
                windspeed: body.current.wind_speed,
                time: body.current.observation_time
            });
        }
    });
};
