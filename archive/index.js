var weather = require('../modules/forecastio')

var Moment = require('moment')
var momentRange = require('moment-range')

var moment = momentRange.extendMoment(Moment)

var low = require('lowdb')

var dbFull = low('weather_full.json')
var dbDaily = low('weather_daily.json')

var londonGeo = '51.506, -0.127'

// db('posts').push({ title: 'lowdb is awesome'})

function getWeatherDay (time) {
  weather(londonGeo, time, function (e, data) {
    console.log(data)
    dbFull('weather').push(data)
    dbDaily('weather').push(data.daily.data)
  })
}

function lastYear () {
  var range = moment.range(moment().subtract(365, 'days'), new Date())

  range.by('days', function (day) {
    getWeatherDay(day.format())
  })
}

lastYear()

/*
var tempo = db_daily('weather').chain().flatten().map(function(we){
return {time: moment.unix(we.time).format(), icon: we.icon}
}).value()
*/
// console.log(tempo)

// console.log(db_daily('weather').chain().flatten().countBy('icon').value())

/*
var tiii = db_daily('weather').chain().flatten().filter(function(day){
return day.cloudCover > 0
}).countBy('cloudCover').value()

console.log(tiii)
*/
