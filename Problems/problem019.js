const { performance } = require('perf_hooks')
/*

You are given the following information, but you may prefer to do some research for yourself.

    1 Jan 1900 was a Monday.
    Thirty days has September,
    April, June and November.
    All the rest have thirty-one,
    Saving February alone,
    Which has twenty-eight, rain or shine.
    And on leap years, twenty-nine.
    A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.

How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

*/

const NUMBEROFDAYINAMONTH = [31 /* January */, 28/* February */, 31/* March */, 30 /* April */, 31/* May */, 30/* June */,
  31/* July */, 31/* August */, 30/* September */, 31/* October */, 30/* November */, 31/* December */]
const DAYSOFTHEWEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function p019 (startingYear, endingYear) {
  const t0 = performance.now()
  const data = {}
  setData(data)
  const answer = getNumberofSundays(data, startingYear, endingYear)
  const t1 = performance.now()
  return { answer: answer, time: t1 - t0 }
}

function setData (data) {
  for (let i = 1901; i <= 2000; i++) {
    data[i] = { leap: (i % 4 == 0 && (i % 100 != 0 || i % 400 == 0)), startingDayOfTheMonth: [], numberOfSundays: 0 }
  }
  data[1901].startingDayOfTheMonth.push('Tuesday')
  populateData(data)
}
function setNumberOfSundays (data) {
  for (const i of data.startingDayOfTheMonth) {
    if (i === 'Sunday') {
      data.numberOfSundays++
    }
  }
}

function getNumberofSundays (data, startingYear, endingYear) {
  let sundays = 0
  for (let year = startingYear; year <= endingYear; year++) {
    sundays += data[year].numberOfSundays
  }
  return sundays
}

function populateData (data) {
  for (let year = 1901; year <= 2000; year++) {
    for (let month = 0; month < 11; month++) {
      const currentDay = DAYSOFTHEWEEK.indexOf(data[year].startingDayOfTheMonth[month])
      let daysToAdd = NUMBEROFDAYINAMONTH[month]
      if (month === 1 && data[year].leap) {
        daysToAdd++
      }
      data[year].startingDayOfTheMonth.push(DAYSOFTHEWEEK[(currentDay + daysToAdd) % 7])
    }
    const currentDay = DAYSOFTHEWEEK.indexOf(data[year].startingDayOfTheMonth[11])
    const daysToAdd = NUMBEROFDAYINAMONTH[11]
    if (year + 1 <= 2000) {
      data[year + 1].startingDayOfTheMonth.push(DAYSOFTHEWEEK[(currentDay + daysToAdd) % 7])
    }

    setNumberOfSundays(data[year])
  }
}

module.exports = p019
