/*jshint esversion: 6 */
/*

Each character on a computer is assigned a unique code and the preferred standard is ASCII
(American Standard Code for Information Interchange).
For example, uppercase A = 65, asterisk (*) = 42, and lowercase k = 107.

A modern encryption method is to take a text file, convert the bytes to ASCII, 
then XOR each byte with a given value, taken from a secret key. 
The advantage with the XOR function is that using the same encryption key on the cipher text, 
restores the plain text; for example, 65 XOR 42 = 107, then 107 XOR 42 = 65.

For unbreakable encryption, the key is the same length as the plain text message, 
and the key is made up of random bytes. The user would keep the encrypted message and the encryption key 
in different locations, and without both "halves", it is impossible to decrypt the message.

Unfortunately, this method is impractical for most users, 
so the modified method is to use a password as a key. If the password is shorter than 
the message, which is likely, the key is repeated cyclically throughout the message. The balance 
for this method is using a sufficiently long password key for security, but short enough to be memorable.

Your task has been made easy, as the encryption key consists of three lower case characters. 
Using p059_cipher.txt (right click and 'Save Link/Target As...'), 
a file containing the encrypted ASCII codes, and the knowledge that the plain text
must contain common English words, decrypt the message and find the sum of the ASCII values in the original text.

*/

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a password  : ', (answer) => {

    //xorPass = answer[0].charCodeAt(0) + answer[1].charCodeAt(0) + answer[2].charCodeAt(0);
    //console.log(answer, xorPass);
    let allText = fs.readFileSync("Additional-Files\\p059_cipher.txt", 'utf8');

    let arrNumbers = allText.split(",");
    let arrLetters = [];
    let passwordIndex = [97,97,97];
    let password = "aaa";
    let str;
    for (let i = 0; i < arrNumbers.length; ++i)
    {
        arrNumbers[i] = parseInt(arrNumbers[i]);
    }

    while(passwordIndex[0]<=122)
    {    
        flag = false;
        for (let i = 0; i < arrNumbers.length; ++i)
        {
           //console.log(arrNumbers[i],password[i%3],arrNumbers[i]^password[i%3], String.fromCharCode(arrNumbers[i]^password[i%3]));
            arrLetters[i] = String.fromCharCode(((arrNumbers[i]^password[0])^password[1])^password[2]);
        }
        if (!InvalidCharacter(arrLetters))
        {
            str = arrLetters.join("");
            break;
        }
        else
        {
            ++passwordIndex[2];
            if(passwordIndex[2] > 122)
            {
                passwordIndex[2] = 97;
                ++passwordIndex[1];
                if(passwordIndex[1] > 122)
                {
                    ++passwordIndex[0];
                    passwordIndex[1] = 97;
                }
            }
            password = String.fromCharCode(passwordIndex[0]) + String.fromCharCode(passwordIndex[1]) + String.fromCharCode(passwordIndex[2]);

           // console.log(password);
        }
    
    }


    console.log("The ASCII sum of the file is", str, password);
    rl.close();

});

function InvalidCharacter(arrCharacter)
{
    for (let i = 0; i < arrCharacter.length; i++)
    {
        character = arrCharacter[i];
        if (character.charCodeAt(0) < 32 || character.charCodeAt(0) > 122)
        {
            return true;
        }
    }

    return false;
}