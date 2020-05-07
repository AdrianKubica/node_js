"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var hbs_1 = __importDefault(require("hbs"));
var geocode_1 = require("./utils/geocode");
var forecast_1 = require("./utils/forecast");
var app = express_1.default();
var port = 3000;
// Define paths for Express config
var publicDirectory = path_1.default.join(__dirname, '../public');
var viewsPath = 'templates/views';
var partialsPath = 'templates/partials';
// Setup habdlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs_1.default.registerPartials(partialsPath);
// Setup static directory to serve and not need to type extension .html in URL address
app.use(express_1.default.static(publicDirectory, {
    extensions: ["html"]
}));
app.get("/", function (req, res) {
    res.render('index', {
        title: 'Weather',
        name: 'Adrian Kubica'
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Adrian Kubica'
    });
});
app.get('/help', function (req, res) {
    res.render('help', {
        title: 'Help page',
        name: 'Adrian Kubica'
    });
});
app.get("/weather", function (req, res) {
    var _a;
    var address = (_a = req.query.address) === null || _a === void 0 ? void 0 : _a.toString();
    if (!address) {
        return res.send({
            error: "You must provide an address"
        });
    }
    geocode_1.geocode(address, function (error, _a) {
        var _b = _a === void 0 ? {} : _a, latitude = _b.latitude, longitude = _b.longitude, location = _b.location;
        if (error) {
            return res.send({ error: error });
        }
        forecast_1.forecast(longitude, latitude, function (error, forecastData) {
            if (error) {
                return res.send({ error: error });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: address
            });
        });
    });
});
app.get("/products", function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: [1, , 2]
    });
});
app.get("/help/*", function (req, res) {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Help article not found',
        name: 'Adrian Kubica'
    });
});
app.get("*", function (req, res) {
    res.render('404', {
        title: '404 Not Found',
        errorMessage: 'Page not found',
        name: 'Adrian Kubica'
    });
});
app.listen(port, '0.0.0.0', function () {
    console.log("Server is up on port " + port);
});
