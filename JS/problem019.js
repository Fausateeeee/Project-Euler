/*jshint esversion: 6 */
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

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const numberOfDayInAMonth = [31 /*January*/, 28/*February*/, 31/*March*/, 30 /*April*/, 31/*May*/, 30/*June*/,
    31/*July*/, 31/*August*/, 30/*September*/, 31/*October*/, 30/*November*/, 31/*December*/];
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


rl.question('Enter the starting year above or equals 1901 followed by a space and the ending year bellow or equals 2000 : ', (answer) => {

    const startingYear = parseInt(answer.split(" ")[0]);
    const endingYear = parseInt(answer.split(" ")[1]);

    if (isNaN(startingYear) || isNaN(endingYear)) {
        console.log("Please, enter a valid year of the form YYYY <3");
        rl.close();
    }

    else if (endingYear < startingYear) {
        console.log("The ending year must be greater than the starting year");
        rl.close();
    }

    else if (endingYear > 2000 || startingYear < 1900)
    {
        console.log("A year was not within the accepted boundaries :,(");
        rl.close();
    }

    else
    {
        let data = {};
        setData(data);
        console.log("The number of Sundays that fell on the first of the month from 1st January", startingYear, "to 31st December", 
        endingYear, "is", getNumberofSundays(data, startingYear, endingYear));
        
        rl.close();
    }

});
function test(i)
{
    return (i%4==0 && (i%100 != 0 || i%400 == 0));
}
function setData(data)
{
    for (let i = 1901; i <= 2000; i++)
    {
         data[i] = {leap : (i%4==0 && (i%100 != 0 || i%400 == 0)), startingDayOfTheMonth : [], numberOfSundays: 0};
    }
    data[1901].startingDayOfTheMonth.push("Tuesday");
    populateData(data);
}
function setNumberOfSundays(data)
{
    for (let i of data.startingDayOfTheMonth)
    {
        if (i == "Sunday")
        {
            data.numberOfSundays++;
        }
    }
}

function getNumberofSundays(data, startingYear, endingYear)
{
    let sundays = 0;
    for(let year = startingYear; year <= endingYear; year++)
    {
        sundays += data[year].numberOfSundays;
    }
    return sundays;
}

function populateData(data)
{
    for(let year = 1901; year <= 2000; year++)
    {
        for (let month = 0; month < 11; month++)
        {

            let currentDay = daysOfTheWeek.indexOf(data[year].startingDayOfTheMonth[month]);
            let daysToAdd = numberOfDayInAMonth[month];
            if (month == 1 && data[year].leap)
            {
                daysToAdd++;
            }
            data[year].startingDayOfTheMonth.push(daysOfTheWeek[(currentDay+daysToAdd)%7]);

        }
        let currentDay = daysOfTheWeek.indexOf(data[year].startingDayOfTheMonth[11]);
        let daysToAdd = numberOfDayInAMonth[11];
        if(year+1 <= 2000)
        {
            data[year+1].startingDayOfTheMonth.push(daysOfTheWeek[(currentDay+daysToAdd)%7]);
        }

        setNumberOfSundays(data[year]);

    }
}