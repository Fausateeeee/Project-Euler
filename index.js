const p001 = require('./Problems/problem001')
const p002 = require('./Problems/problem002')
const p003 = require('./Problems/problem003')
const p004 = require('./Problems/problem004')
const p005 = require('./Problems/problem005')
const p006 = require('./Problems/problem006')
const p007 = require('./Problems/problem007')
const { p008, TEST_NUMBER_008 } = require('./Problems/problem008')
const p009 = require('./Problems/problem009')
const p010 = require('./Problems/problem010')

const a001 = p001(1000)
console.log('Problem 1', a001)

const a002 = p002(4000000)
console.log('Problem 2', a002)

const a003 = p003(600851475143)
console.log('Problem 3', a003)

const a004 = p004(800000)
console.log('Problem 4', a004)

const a005 = p005(20)
console.log('Problem 5', a005)

const a006 = p006(100)
console.log('Problem 6', a006)

const a007 = p007(10001)
console.log('Problem 7', a007)

const a008 = p008(13, TEST_NUMBER_008)
console.log('Problem 8', a008)

const a009 = p009(1000)
console.log('Problem 9', a009)

const a010 = p010(2000000)
console.log('Problem 10', a010)
