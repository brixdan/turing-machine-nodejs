const { tm, tmg } = require('../../engine')
const p1000 = require('../../_data/primes/primes1000.json')

function checkTwo(a,b/*numbers*/, v = true/*boolean*/) {
    if (isNaN(a) || !isFinite(a) || a%1 || a<2)
    {
        console.log('Bad type of a: ' + a);
        return false;
    }
    if (isNaN(b) || !isFinite(b) || b%1 || b<2)
    {
        console.log('Bad type of b: ' + b);
        return false;
    }
    if (a == b) {
        console.log("Equals a==b",a==b);
        return false;
    }
    let it = a.increase();
    let it1 = b.increase();
    var res = {}, i = 0
    while(true) {
        let n = it.next().value;
        let n1 = it1.next().value;
        if (n.isPrime() !== n1.isPrime()) {
            res[i] = "" + a + '~>' + n + n.isPrime() + " " + b + '~>' + n1 + n1.isPrime();
            break;
        } else if (i > 10000) {
            console.log("failed for " + a + " and " + b + " on step = " + i);
            return false;
        }
        i++;
    }
    if ( v ) console.log(res);
    // return Object.keys(res).length;
    return i;
}
//console.log(checkTwo(5,13));
console.log(checkTwo( 7933,1951, false));

function checkDiv(div/*number*/,set/*array*/,v = true) {
    if (set.indexOf(div) > -1) {
        console.log('' + div + ' contains in set ' + set)
        return false;
    }
    let j = 1, champ = {step:1,desc:""};
    for (const setElement of set) {
        j = checkTwo(div,setElement, v);
        if (!j) return false;
        if (j >= champ.step) {
            champ.step = j;
            champ.desc = "for a = " + div + " b = " + setElement;
        }
    }
    console.log(' champ = ',champ)
    return true;
}

  console.log(checkDiv(7933,p1000, false))
//console.log(p1000.indexOf(7919))
var temp = [];
for (const p1000Element of p1000) {
    temp = [...p1000];
    temp.splice(temp.indexOf(p1000Element), 1);
    temp = temp.slice(temp.indexOf(p1000Element));
    console.log(checkDiv(p1000Element, temp,false));
}
// Result: all primes diverge from each other via increase