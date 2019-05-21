/*jshint esversion: 6 */
/*

A common security method used for online banking is to ask the user for three random characters from a passcode. 
For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.

The text file, keylog.txt, contains fifty successful login attempts.

Given that the three characters are always asked for in order, 
analyse the file so as to determine the shortest possible secret passcode of unknown length.

*/

const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The password is", 
    FindPassword(FormatFile()));
    rl.close();
});

function FormatFile()
{
    let allText = fs.readFileSync("Additional-Files\\p079_keylog.txt", 'utf8');
    let allKeys = allText.split("\n");
    let allSplittedKeys = [];
    for (let row of allKeys)
    {
        row = row.split("");
        allSplittedKeys.push(row);
    }
    return allSplittedKeys;
}

function FindPassword(keylog)
{
    let passwordRecovery = {'0': [],
    '1': [],
    '2': [],
    '3': [],
    '4': [],
    '5': [],
    '6': [],
    '7': [],
    '8': [],
    '9': [] };

    let pinCheck = {'0': false,
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7': false,
    '8': false,
    '9': false };

    keylog.forEach(key => {
        pinCheck[key[0]] = true;
        pinCheck[key[1]] = true;
        pinCheck[key[2]] = true;
        let pin = key[0];

        if (!passwordRecovery[pin].includes(key[1]))
        {
            passwordRecovery[pin].push(key[1]);
        }
        if (!passwordRecovery[pin].includes(key[2]))
        {
            passwordRecovery[pin].push(key[2]);
        }
        pin = key[1];
        if (!passwordRecovery[pin].includes(key[2]))
        {
            passwordRecovery[pin].push(key[2]);
        }
    });

    for (let pin in pinCheck)
    {
        if (!pinCheck[pin])
        {
            delete passwordRecovery[pin];
        }
    }

    let password = [];
    for (let pin in passwordRecovery)
    {
        password[passwordRecovery[pin].length] = pin;
    }
    password.reverse();
    return password;
}