console.log('Client side javascript is loaded!')

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

const locationData = <HTMLInputElement>document.querySelector('input#search')
const messageOne = <HTMLParagraphElement>document.querySelector('#message-1')
const messageTwo = <HTMLParagraphElement>document.querySelector('#message-2')

document.querySelector('button')?.addEventListener('click', (evt) => {

    evt.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${locationData.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.innerHTML = `
                    <p>Description: ${data.forecast.description}</p>
                    <p>Temperature: ${data.forecast.temperature}</p>
                    <p>Humidity: ${data.forecast.humidity}</p>
                    <p>Feels Like: ${data.forecast.feelslike}</p>
                    <p>Wind Speed: ${data.forecast.windspeed}</p>
                    <p>Time: ${data.forecast.time}</p>
                `
            }
        })
    })
})