/*jshint esversion: 6 */
/*

By counting carefully it can be seen that a rectangular grid measuring 3 by 2 contains eighteen rectangles:

6 1x1 rectangles, 4 2x1 rectangles, 2 3x1 rectangles, 3 1x2 rectangles, 2 2x2 rectangles, 1 3x2 rectangle;

Although there exists no rectangular grid that contains exactly two million rectangles, 
find the area of the grid with the nearest solution.

*/

/*

    Define n, m, j, k be integers, j < n, k < m and n x m be a rectangular, then
    1 x 1 = n x m;
    n x 1 = m;
    1 x m = n;
    j x 1 = m(n - k + 1);
    1 x k = n(m - j + 1);

    In fact, we have the more general equation for a specific sub-rectangle size

    j x k = (n - j + 1)(m - k + 1);

    The total of sub-rectangle in a rectangle of size n x m is

    sum_{k=1}^m sum_{j=1}^n (n - j + 1)(m - k + 1) =  sum_{k=1}^m (m - k + 1) sum_{j=1}^n (n - j + 1)
                                                   = (m + (m-1) + (m-2) + ... + 1)(n + (n-1) + (n-2) + ... + 1)
                                                   = (m(m+1)/2)(n(n+1)/2)
                                                   = nm(n + 1)(m + 1)/4;

*/
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Press enter to continue : ', (answer) => {

    console.log("The area of the grid with the nearest total of sub-rectangle to 2,000,000 is", 
    FindClosestRectangle());
    rl.close();
});

function FindClosestRectangle()
{
    const TOTAL = 2000000;
    let n = 1;
    let m = 1;
    let n_f = 1;
    let m_f = 1;
    let difference = 2000000;
    let total = 1;
    while (total < TOTAL)
    {
        total = TotalOfSubrectangle(n,m);
        if (Math.abs(TOTAL - total) < difference)
        {
            n_f = n;
            m_f = m;
            difference = Math.abs(TOTAL - total);
        }
        if (total > TOTAL)
        {
            m = 1;
            ++n;   
            total = TotalOfSubrectangle(n,m);       
        }
        ++m;
        
    }

    return n_f * m_f;
}

function TotalOfSubrectangle(n,m)
{
    return  n*m*(n + 1)*(m + 1)/4;
}