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



rl.question('Enter the starting year above or equals 1901 followed by a space and the ending year bellow or equals 2000', (answer) => {

    const startingYear = parseInt(answer.split(" ")[0]);
    const endingYear = parseInt(answer.split(" ")[1]);

    if (isNaN(startingYear) || isNaN(endingYear)) {
        console.log("Please, enter a valid year of the form YYYY <3");
        rl.close();
    }

    if (endingYear < startingYear) {
        console.log("The ending year must be greater than the starting year");
        rl.close();
    }

    if (endingYear > 2000 || startingYear < 1900)
    {
        console.log("A year was not within the accepted boundaries :,(");
        rl.close();
    }

    console.log("The number of Sunday that fell on the first of the month from 1st January", startingYear, "to 31st December", 
    endingYear, "is", "ANSWER");
    
    rl.close();
});