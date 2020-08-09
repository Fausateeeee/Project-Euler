/*jshint esversion: 6 */
/*

In the game, Monopoly, the standard board is set up in the following way:
GO 	A1 	CC1 	A2 	T1 	R1 	B1 	CH1 	B2 	B3 	JAIL
H2 	  	                                        C1
T2 	  	                                        U1
H1 	  	                                        C2
CH3 	  	                                    C3
R4 	  	                                        R2
G3 	  	                                        D1
CC3 	  	                                    CC2
G2 	  	                                        D2
G1 	  	                                        D3
G2J 	F3 	U2 	F2 	F1 	R3 	E3 	E2 	CH2 	E1 	FP

A player starts on the GO square and adds the scores on two 6-sided dice to determine the number of squares they advance 
in a clockwise direction. Without any further rules we would expect to visit each square with equal probability: 2.5%. 
However, landing on G2J (Go To Jail), CC (community chest), and CH (chance) changes this distribution.

In addition to G2J, and one card from each of CC and CH, that orders the player to go directly to jail, 
if a player rolls three consecutive doubles, they do not advance the result of their 3rd roll. 
Instead they proceed directly to jail.

At the beginning of the game, the CC and CH cards are shuffled. 
When a player lands on CC or CH they take a card from the top of the respective pile and, after following the instructions, 
it is returned to the bottom of the pile. There are sixteen cards in each pile, 
but for the purpose of this problem we are only concerned with cards that order a movement; 
any instruction not concerned with movement will be ignored and the player will remain on the CC/CH square.

    Community Chest (2/16 cards):
        Advance to GO
        Go to JAIL
    Chance (10/16 cards):
        Advance to GO
        Go to JAIL
        Go to C1
        Go to E3
        Go to H2
        Go to R1
        Go to next R (railway company)
        Go to next R
        Go to next U (utility company)
        Go back 3 squares.

The heart of this problem concerns the likelihood of visiting a particular square. 
That is, the probability of finishing at that square after a roll. 
For this reason it should be clear that, with the exception of G2J for which the probability of finishing on it is zero, 
the CH squares will have the lowest probabilities, as 5/8 request a movement to another square, 
and it is the final square that the player finishes at on each roll that we are interested in. 
We shall make no distinction between "Just Visiting" and being sent to JAIL, 
and we shall also ignore the rule about requiring a double to "get out of jail", 
assuming that they pay to get out on their next turn.

By starting at GO and numbering the squares sequentially from 00 to 39 we can concatenate 
these two-digit numbers to produce strings that correspond with sets of squares.

Statistically it can be shown that the three most popular squares, 
in order, are JAIL (6.24%) = Square 10, E3 (3.18%) = Square 24, and GO (3.09%) = Square 00. 
So these three most popular squares can be listed with the six-digit modal string: 102400.

If, instead of using two 6-sided dice, two 4-sided dice are used, find the six-digit modal string.

*/

/*

    The odds of rolling a double with 2 four-sided dice is 1/4. The odds of rolling three consicutive doubles
    is 1/64.

*/

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The six-digit modal string of the odds of Monopoly using two 4-sided dice is", 
    InitializeGame());
    rl.close();
});

function InitializeGame()
{
    var Board = InitializeBoard();
    var Chance = InitializeChance();
    var CommunityChest = InitializeCommunityChest();
    return PlayGame(10000000, Board, Chance, CommunityChest);

}

function PlayGame(NbrOfRoll, Board, Chance, CommunityChest)
{
    let position = 0;
    let double_count = 0;
    let dice_result;
    let probabilities = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for (let roll = 0; roll < NbrOfRoll; ++roll)
    {
        dice_result = RollDice();
        if (IsDouble(dice_result))
        {
            ++double_count;
        }
        else
        {
            double_count = 0;
        }

        if (double_count == 3)
        {
            double_count = 0;
            position = GoToJail();
        }
        else
        {
            position += dice_result[0] + dice_result[1];
            position = position%40;
            let what_to_do = Board[position];
            if (what_to_do == DrawChance)
            {
                let card = what_to_do(Chance);
                position = card(position);
            }
            else if (what_to_do == DrawCommunityChest)
            {
                let card = what_to_do(CommunityChest);
                position = card(position);
            }
            else if (what_to_do == GoToJail)
            {
                double_count = 0;
                position = what_to_do();
            }
        }

        ++probabilities[position];
    }

    return ComputeProbabilities(probabilities, NbrOfRoll);
}

function ComputeProbabilities(probabilities, NbrOfRoll)
{
    for (let prob in probabilities)
    {
        probabilities[prob] *= 100;
        probabilities[prob] /= NbrOfRoll;     
    }

    let max1 = probabilities.reduce(function(a,b) {
        return Math.max(a,b);
    });
    max1 = probabilities.indexOf(max1);
    probabilities[max1] = 0;

    let max2 = probabilities.reduce(function(a,b) {
        return Math.max(a,b);
    });
    max2 = probabilities.indexOf(max2);
    probabilities[max2] = 0;

    let max3 = probabilities.reduce(function(a,b) {
        return Math.max(a,b);
    });
    max3 = probabilities.indexOf(max3);
    probabilities[max3] = 0;

    max1 = max1.toString().padStart(2,'0');
    max2 = max2.toString().padStart(2,'0');
    max3 = max3.toString().padStart(2,'0');
    return max1 + max2 + max3;
}

function RollDice()
{
    return [Math.ceil(Math.random()*4),Math.ceil(Math.random()*4)];
}

function IsDouble(diceroll)
{
    return diceroll[0] == diceroll[1];
}

function DrawCommunityChest(CommunityChest)
{
    let card = CommunityChest.shift();
    CommunityChest.push(card);
    return card;
}

function DrawChance(Chance)
{
    let card = Chance.shift();
    Chance.push(card);
    return card;
}

function GoToJail()
{
    return 10;
}

function GoToGo()
{
    return 0;
}

function GoToPink1()
{
    return 11;
}

function GoToRed3()
{
    return 24;
}

function GoToBlue2()
{
    return 39;
}

function GoToStation1()
{
    return 5;
}

function GoToNextStation(position)
{
    if (position == 7)
    {
        return 15;
    }
    else if (position == 22)
    {
        return 25;
    }
    else
    {
        return 5;
    }
}

function GoToNextUtility(position)
{
    if (position == 7)
    {
        return 12;
    }
    else if (position == 22)
    {
        return 27;
    }
    else
    {
        return 12;
    }
}

function GoBackThreeSquares(position)
{
    return position - 3;
}

function InitializeBoard()
{
    let Board = [];
    Board[0] = DoNotMove;                 //Go
    Board[1] = DoNotMove;                 //Purple 1
    Board[2] = DrawCommunityChest;        //Community Chest 1
    Board[3] = DoNotMove;                 //Purple 2
    Board[4] = DoNotMove;                 //Tax 1
    Board[5] = DoNotMove;                 //Station 1
    Board[6] = DoNotMove;                 //Light blue 1
    Board[7] = DrawChance;                //Chance 1
    Board[8] = DoNotMove;                 //Light blue 2
    Board[9] = DoNotMove;                 //Light blue 3

    Board[10] = DoNotMove;                //Jail
    Board[11] = DoNotMove;                //Pink 1
    Board[12] = DoNotMove;                //Utility 1
    Board[13] = DoNotMove;                //Pink 2
    Board[14] = DoNotMove;                //Pink 3
    Board[15] = DoNotMove;                //Station 2
    Board[16] = DoNotMove;                //Orange 1
    Board[17] = DrawCommunityChest;       //Community Chest 2
    Board[18] = DoNotMove;                //Orange 2
    Board[19] = DoNotMove;                //Orange 3

    Board[20] = DoNotMove;                //Parking
    Board[21] = DoNotMove;                //Red 1
    Board[22] = DrawChance;               //Chance 2
    Board[23] = DoNotMove;                //Red 2
    Board[24] = DoNotMove;                //Red 3
    Board[25] = DoNotMove;                //Station 3
    Board[26] = DoNotMove;                //Yellow 1
    Board[27] = DoNotMove;                //Utility 2
    Board[28] = DoNotMove;                //Yellow 2
    Board[29] = DoNotMove;                //Yellow 3

    Board[30] = GoToJail;                 //Go To Jail
    Board[31] = DoNotMove;                //Green 1
    Board[32] = DrawCommunityChest;       //Community Chest 3
    Board[33] = DoNotMove;                //Green 2
    Board[34] = DoNotMove;                //Green 3
    Board[35] = DoNotMove;                //Station 4
    Board[36] = DrawChance;               //Chance 3
    Board[37] = DoNotMove;                //Blue 1
    Board[38] = DoNotMove;                //Tax 2
    Board[39] = DoNotMove;                //Blue 2

    return Board;
}

function InitializeCommunityChest()
{
    let Chest = [];
    Chest[0] = DoNotMove;
    Chest[1] = DoNotMove;
    Chest[2] = DoNotMove;
    Chest[3] = DoNotMove;
    Chest[4] = DoNotMove;
    Chest[5] = DoNotMove;
    Chest[6] = DoNotMove;
    Chest[7] = DoNotMove;
    Chest[8] = DoNotMove;
    Chest[9] = DoNotMove;
    Chest[10] = DoNotMove;
    Chest[11] = DoNotMove;
    Chest[12] = DoNotMove;
    Chest[13] = DoNotMove;
    Chest[14] = GoToGo;
    Chest[15] = GoToJail;
    shuffle(Chest);
    return Chest;
}

function InitializeChance()
{
    let Chance = [];
    Chance[0] = DoNotMove;
    Chance[1] = DoNotMove;
    Chance[2] = DoNotMove;
    Chance[3] = DoNotMove;
    Chance[4] = DoNotMove;
    Chance[5] = DoNotMove;
    Chance[6] = GoToGo;
    Chance[7] = GoToJail;
    Chance[8] = GoToPink1;
    Chance[9] = GoToRed3;
    Chance[10] = GoToBlue2;
    Chance[11] = GoToStation1;
    Chance[12] = GoToNextStation;
    Chance[13] = GoToNextStation;
    Chance[14] = GoToNextUtility;
    Chance[15] = GoBackThreeSquares;
    shuffle(Chance);
    return Chance;
}

function DoNotMove(position)
{
    return position;
}

function shuffle(arr) {
    let ctr = arr.length;
    let temp;
    let index;

    // While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
}