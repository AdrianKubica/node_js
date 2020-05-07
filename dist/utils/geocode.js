"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var postman_request_1 = __importDefault(require("postman-request"));
exports.geocode = function (address, callback) {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYWRyaWFua3ViaWNhIiwiYSI6ImNrOXQwbzduMzA1aDIzZ29hMnZsNmxyczUifQ.KKnBCv7E2pqCG9veEmBasw&limit=1}";
    postman_request_1.default({ url: url, json: true }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            });
        }
    });
};
