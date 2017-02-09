var request = require('request')
var stringTemplate = require('string-template')

// https://api.forecast.io/forecast/+ process.env.FORECASTIOAPI +/51.47,0,2013-05-06T12:00:00?units=si
var forecastUrl = 'https://api.forecast.io/forecast/' + process.env.FORECASTIOAPI + '/{0},{1}?units=si'

function getWeather (location, time, callback) {
  var url = stringTemplate(forecastUrl, arguments)

  request(url, function (err, resp, body) {
    if (err) return callback(err)
    return callback(null, body && JSON.parse(body))
  })
}

module.exports = getWeather
