var weather = require('./modules/worldweatheronline')

var moment = require('moment')
require('moment-range')

var async = require('async')
var low = require('lowdb')

var db

function getWeatherRange (city, startDate, endDate, cb) {
  weather(city, startDate, endDate, function (err, data) {
    if (err) return cb(err)
    db('weather').push(data.data.weather)
    cb(null, data)
  })
}

function createYearFetch (city) {
  var getter = []

  for (let i = 12; ; i-- > 0) {
    console.log()
    getter.push(function () {
      var endDate = moment().subtract(i, 'months').format('YYYY-MM-DD')
      var startDate = moment().subtract(i + 1, 'months').add(1, 'day').format('YYYY-MM-DD')

      return function (cb) {
        getWeatherRange(city, startDate, endDate, cb)
      }
    }())
  }
  return getter
}

function printResults () {
  var yearlyWeather = db('weather').chain().flatten().map(function (day) {
    return {
      date: day.date,
      cloudcover: day.hourly[0].cloudcover,
      weatherDesc: day.hourly[0].weatherDesc[0].value,
      precipMM: day.hourly[0].precipMM
    }
  }).countBy('weatherDesc').value()

  console.log(yearlyWeather)
}

function getWeather (city) {
  db = low('db/weather_' + city + '.json')

  async.series(createYearFetch(city), function (err, result) {
    if (err) return console.error(err)
    printResults()
  })
}

getWeather('mil')
