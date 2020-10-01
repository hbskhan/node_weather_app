//const { response } = require("express")

console.log("YEET")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    //console.log(search.value)
    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    fetch('/weather?address=' + search.value).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return msg1.textContent = data.error
            }
            msg1.textContent = data.location
            msg2.textContent = data.description + ' right now. Currently it is ' + data.temperature + ' and feels like ' + data.realFeel + '.'
        })
    })
})