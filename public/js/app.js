console.log('Client Side Javascript code running!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message.textContent = 'Retrieving results...'
    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then(({error, forecast, location} = {}) => {
            if (error) {
                message.textContent = error
            } else {
                message.textContent = location
                message2.textContent = forecast
            }
        })
    })
})
