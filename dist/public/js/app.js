"use strict";
var _a;
console.log('Client side javascript is loaded!');
// To make fetch accessible from typescript add in tsconfig.json
//
// "compilerOptions": {
//     "lib": [ "dom" ],
// }
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })
// const weatherForm = document.querySelector('form')
// weatherForm?.addEventListener('submit', () => {
//     console.log('testing')
// })
var locationData = document.querySelector('input#search');
var messageOne = document.querySelector('#message-1');
var messageTwo = document.querySelector('#message-2');
(_a = document.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function (evt) {
    evt.preventDefault();
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch("/weather?address=" + locationData.value).then(function (response) {
        response.json().then(function (data) {
            if (data.error) {
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.innerHTML = "\n                    <p>Description: " + data.forecast.description + "</p>\n                    <p>Temperature: " + data.forecast.temperature + "</p>\n                    <p>Humidity: " + data.forecast.humidity + "</p>\n                    <p>Feels Like: " + data.forecast.feelslike + "</p>\n                    <p>Wind Speed: " + data.forecast.windspeed + "</p>\n                    <p>Time: " + data.forecast.time + "</p>\n                ";
            }
        });
    });
});
