var request = require('request')

// var baseUrl = 'http://api.worldweatheronline.com/free/v2/past-weather.ashx?tp=24&format=json&key=' + process.env.WORLDWEATHER
var baseUrl = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?tp=24&format=json&key=' + process.env.WORLDWEATHER

function WorldWeather (apiKey, options) {
  this.apiKey = apiKey
  this.baseUrl = 'http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=' + this.apiKey
  this.options = {
    format: 'json',
    tp: 24
  }
}

function worldWeatherHistorycal (q, startDate, endDate, callback) {
  var url = baseUrl + '&q=' + q + '&date=' + startDate + '&enddate=' + endDate

  request(url, function (err, resp, body) {
    if (err) {
      return callback(new Error(err))
    }
    if (resp.statusCode !== 200) {
      return callback(new Error(body))
    }

    var data
    try {
      data = JSON.parse(body)
    } catch (e) {
      return callback(e)
    }

    return callback(null, data)
  })
}

module.exports = worldWeatherHistorycal
