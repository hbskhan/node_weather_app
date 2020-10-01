const request = require('request')

const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=09047bd356e4903d82e35819dd419ed3&query='+latitude+','+longitude+''

    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback(body.error.info, undefined)
        }
        else{
            callback(undefined, {
                temperature: body.current.temperature, 
                realFeel: body.current.feelslike,
                description: body.current.weather_descriptions[0] 
            })
        }
    })
}

module.exports = forecast