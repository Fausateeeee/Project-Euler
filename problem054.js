/*jshint esversion: 6 */
/*

In the card game poker, a hand consists of five cards and are ranked, from lowest to highest, in the following way:

    High Card: Highest value card.
    One Pair: Two cards of the same value.
    Two Pairs: Two different pairs.
    Three of a Kind: Three cards of the same value.
    Straight: All cards are consecutive values.
    Flush: All cards of the same suit.
    Full House: Three of a kind and a pair.
    Four of a Kind: Four cards of the same value.
    Straight Flush: All cards are consecutive values of same suit.
    Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.

The cards are valued in the order:
2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

If two players have the same ranked hands then the rank made up of the highest value wins; 
for example, a pair of eights beats a pair of fives (see example 1 below).
But if two ranks tie, for example, both players have a pair of queens, 
then highest cards in each hand are compared (see example 4 below); 
if the highest cards tie then the next highest cards are compared, and so on.

Consider the following five hands dealt to two players:
Hand	 	Player 1	 	Player 2	 	Winner
1	 	5H 5C 6S 7S KD      2C 3S 8S 8D TD  Player 2
        Pair of Fives       Pair of Eights

2	 	5D 8C 9S JS AC      2C 5C 7D 8S QH  Player 1
        Highest card Ace    Highest card Queen

3	 	2D 9C AS AH AC  	3D 6D 7D TD QD  Player 2
        Three Aces          Flush with Diamonds

4	 	4D 6S 9H QH QC  	3D 6D 7H QD QS  Player 1
        Pair of Queens      Pair of Queens
        Highest card Nine   Highest card Seven

5	 	2H 2D 4C 4D 4S      3C 3D 3S 9S 9D  Player 1
        Full House          Full House
        With Three Fours    With Three Threes

The file, poker.txt, contains one-thousand random hands dealt to two players. 
Each line of the file contains ten cards (separated by a single space): 
the first five are Player 1's cards and the last five are Player 2's cards. 
You can assume that all hands are valid (no invalid characters or repeated cards),
 each player's hand is in no specific order, and in each hand there is a clear winner.

How many hands does Player 1 win?

*/

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Write the path to a valid input file  : ', (answer) => {
    let allText = fs.readFileSync("/home/fausateeeee/Projects/Project-Euler/Additional-Files/p054_poker.txt", 'utf8');
    //Split the names into an array
    let arrAllHands = allText.split("\n");
    let P1winCount = 0;
    for (let hands of arrAllHands)
    {
        let player1 = hands.substring(0, 14).split(" ");
        let player2 = hands.substring(15).split(" ");
        P1winCount += ComparePokerHand(player1, player2);
        console.log(player1, EvaluatePokerHands(player1), "|||", player2, EvaluatePokerHands(player2), "---", ComparePokerHand(player1, player2));
    }
    console.log("The player 1 wins exactly", P1winCount, "hands.");
    rl.close();

});
function ComparePokerHand(player1, player2)
{
    let P1 = EvaluatePokerHands(player1);
    let P2 = EvaluatePokerHands(player2);
    return P1[0] > P2[0] ? 1 : (P1[0] == P2[0] ? (P1[1] > P2[1] ? 1 : 0) : 0);
}

function EvaluatePokerHands(hand)
{
    H = {high : GetHighestCard(hand), 
          pair : HasOnePair(hand), 
          twopair : HasTwoPair(hand),
          threekind : HasThreeOfAKind(hand),
          straight : HasStraight(hand),
          flush : HasFlush(hand),
          fullhouse : HasFullHouse(hand),
          fourkind : HasFourOfAKind(hand)         
          }; 

    if (H.flush && H.straight)
    {
        return [8, H.high];
    }
    else if (H.fourkind)
    {
        return [7, H.high];
    }
    else if (H.fullhouse)
    {
        return [6, H.high];
    }
    else if (H.flush)
    {
        return [5, H.high];
    }
    else if (H.straight)
    {
        return [4, H.high];
    }
    else if (H.threekind)
    {
        return [3, H.high];
    }
    else if (H.twopair)
    {
        return [2, H.high];
    }
    else if (H.pair)
    {
        return [1, H.high];
    }
    else
    {
        return [0, H.high];
    }

}
//Works
function HasOnePair(hand)
{
    let analysis = {};
    for (let card of hand)
    {
        if (analysis[card[0]])
        {
            return true;
        }
        else
        {
            analysis[card[0]] = true;
        }
    }
    return false;
}
//Works
function HasTwoPair(hand)
{
    let analysis = {};
    let onePair = false;
    for (let card of hand)
    {
        if (analysis[card[0]])
        {
            if (onePair)
            {
                return true;
            }
            onePair = true;
        }
        else
        {
            analysis[card[0]] = true;
        }
    }
    return false;
}
//Works
function HasThreeOfAKind(hand)
{
    let analysis = {};
    for (let card of hand)
    {
        if (analysis[card[0]])
        {
            return true;
        }
        else
        {
            if (analysis[card[0]] === 0)
            {
                analysis[card[0]] = true;
            }
            else
            {
                analysis[card[0]] = 0;
            }
        }
    }
    return false;
}
//Works
function HasFourOfAKind(hand)
{
    let analysis = {};
    for (let card of hand)
    {
        if (analysis[card[0]])
        {
            return true;
        }
        else
        {
            if (analysis[card[0]] === 0)
            {
                analysis[card[0]] = true;
            }
            else if (analysis[card[0]] === false)
            {
                analysis[card[0]] = 0;
            }
            else
            {
                analysis[card[0]] = false;
            }
        }
    }
    return false;
}
//Works
function HasStraight(hand)
{
    let straight= [];
    for (let card of hand)
    {
        let value = card[0];

        switch(value)
        {
            case "A":
                straight.push(14);
                break;
            case "K":
                straight.push(13);
                break;
            case "Q":
                straight.push(12);
                break;
            case "J":
                straight.push(11);
                break;
            case "T":
                straight.push(11);
                break;
            default:
                straight.push(Number.parseInt(value));
                break;           
        }
    }
    straight.sort();
    if (straight[4] == straight[0] + 4 && straight[3] == straight[0] + 3 &&
        straight[2] == straight[0] + 2 && straight[1] == straight[0] + 1)
        {
            return true;
        }
    return false;
}
//Works
function HasFlush(hand)
{
    let suit = hand[0][1];

    for(let card of hand)
    {
        if (suit != card[1])
        {
            return false;
        }
    }

    return true;
}

function HasFullHouse(hand)
{
    if (HasThreeOfAKind(hand))
    {
        let analysis = {};
        for (let card of hand)
        {
            if(analysis[card[0]])
            {
                analysis[card[0]]++;
            }
            else
            {
                analysis[card[0]] = 1;
            }
        }
        if (Object.keys(analysis).length == 2)
        {
            pair = false;
            threeofakind = false;
            for (let key of Object.keys(analysis))
            {
                if (analysis[key] == 2)
                {
                    pair = true;
                }
                if (analysis[key] == 3)
                {
                    threeofakind = true;
                }
            }
            if (pair && threeofakind)
            {
                return true;
            }
        }

    }
    return false;
}
//Works
function GetHighestCard(hand)
{
    let highest = 0;

    for (let card of hand)
    {
        let value = card[0];

        switch(value)
        {
            case "A":
                highest = 14;
                break;
            case "K":
                if (highest < 13)
                {
                    highest = 13;
                }
                break;
            case "Q":
                if (highest < 12)
                {
                    highest = 12;
                }
                break;
            case "J":
                if (highest < 11)
                {
                    highest = 11;
                }
                break;
            case "T":
                if (highest < 10)
                {
                    highest = 10;
                }
                break;
            default:
                if(highest < Number.parseInt(value))
                {
                    highest = value;
                    break;
                }           
        }
    }
    return highest;
}