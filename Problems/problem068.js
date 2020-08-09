/*jshint esversion: 6 */
/*

Consider the following "magic" 3-gon ring, filled with the numbers 1 to 6, and each line adding to nine.
4
  \
    3
   /  \
  1  - 2 - 6
 /
5 
Working clockwise, and starting from the group of three with the 
numerically lowest external node (4,3,2 in this example), each solution can be described uniquely. 
For example, the above solution can be described by the set: 4,3,2; 6,2,1; 5,1,3.

It is possible to complete the ring with four different totals: 9, 10, 11, and 12. 
There are eight solutions in total.

Total	Solution Set
9	4,2,3; 5,3,1; 6,1,2
9	4,3,2; 6,2,1; 5,1,3
10	2,3,5; 4,5,1; 6,1,3
10	2,5,3; 6,3,1; 4,1,5
11	1,4,6; 3,6,2; 5,2,4
11	1,6,4; 5,4,2; 3,2,6
12	1,5,6; 2,6,4; 3,4,5
12	1,6,5; 3,5,4; 2,4,6

By concatenating each group it is possible to form 9-digit strings; 
the maximum string for a 3-gon ring is 432621513.

Using the numbers 1 to 10, and depending on arrangements, 
it is possible to form 16- and 17-digit strings. 
What is the maximum 16-digit string for a "magic" 5-gon ring?

   A 
    \         B
     a \     /
    /    \  /
  e        b
 / \      /
E   \    /
     d -c -- C
      \
       \
        D

*/

/*

    The possible arrangement space is 10^10 which is way too big to brute force.
    I will need to find a way to approach a solution. 
    I have an intuition that it is close to a magic square.
    

    Since we want a 16 digit string, 10 must be in the outer nodes.

    We have the 5  default equations
    A + a + b = R;
    B + b + c = R;
    C + c + d = R;
    D + d + e = R;
    E + e + a = R;

    We can deduce 5 more equations
    A + a = B + c;
    B + b = C + d;
    C + c = D + e;
    D + d = E + a;
    E + e = A + b;

    Without lost of generality, we can set A = 10;
    Then a + b = R - 10 and a + 10 = B + c;
    Meaning that R > 10, and we can set a better lower bound since a + b >= 3, so R >= 13; 

    We can deduce the possible values of a,b with fixed values of R
    R = 13 => (1,2)*;
    R = 14 => (1,3);
    R = 15 => (1,4), (2,3);
    R = 16 => (1,5), (2,4);
    R = 17 => (1,6), (2,5), (3,4);
    R = 18 => (1,7), (2,6), (3,5);
    R = 19 => (1,8)*, (2,7)*, (3,6)*, (4,5);
    R = 20 => (1,9)*, (2,8)*, (3,7)*, (4,6)*; 

 Asterix marked possible values are impossible to use since they'll cause a contradiction

 When we test for specific values, the solution space drops below 7! which is far easier to brute force.
*/
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {
    let solutions = SolveEquations();

    console.log("The lowest sum for a set of five primes for which any two primes concatenate to produce another prime is",
    FormatSolution(solutions));
    rl.close();
});

function FormatSolution(solutions)
{
  let formatedSolution = [];
  for (let sol of solutions)
  {
    for (let nbr in sol)
    {
      sol[nbr] = sol[nbr].toString();
    }
    let currentSol = sol[9] + sol[4] + sol[0] + sol[5] + sol[0] + sol[1] + sol[6] + sol[1] + sol[2] + sol[7] + sol[2] + sol[3] + sol[8] + sol[3] + sol[4];
    formatedSolution.push(currentSol);
  }
  formatedSolution.sort();
  return formatedSolution.pop();
}
function SolveEquations()
{

  let A = 10;
  let B = 9;
  let C = 8;
  let D = 7;
  let E = 6;
  let solution = [];
  // let eqn1 = [A, a, b];
  // let eqn2 = [B, b, c];
  // let eqn3 = [C, c, d];
  // let eqn4 = [D, d, e];
  // let eqn5 = [E, e, a];
  let innerNodes = [1,2,3,4,5];
  do
  {
    //console.log(innerNodes);
    let a = innerNodes[0];
    let b = innerNodes[1];
    let c = innerNodes[2];
    let d = innerNodes[3];
    let e = innerNodes[4];

    let eqn1 = A + a + b;
    let eqn2 = B + b + c;
    let eqn3 = C + c + d;
    let eqn4 = D + d + e;
    let eqn5 = E + e + a;
    //console.log(eqn1, eqn2, eqn3, eqn4, eqn5);
    if (eqn1 == eqn2 && eqn2 == eqn3 && eqn3 == eqn4 && eqn4 == eqn5)
    {
      //console.log("A SOLUTION");
      solution.push([a,b,c,d,e,A,B,C,D,E]);
    }
  }
  while(NextNodePermuation(innerNodes));
  return solution;
}

function  NextNodePermuation(values)
{
  let i = values.length - 1;
  while (i > 0 && values[i-1] >= values[i])
  {
    --i;
  }

  if (i <= 0)
  {
    return false;
  }

  let j = values.length - 1;
  while (values[j] <= values[i-1])
  {
    --j;
  }

  let temp = values[i - 1];
  values[i-1] = values[j];
  values[j] = temp;

  j = values.length - 1;

  while(i < j)
  {
    temp = values[i];
    values[i] = values[j];
    values[j] = temp;
    ++i;
    --j;
  }

  return true;
}