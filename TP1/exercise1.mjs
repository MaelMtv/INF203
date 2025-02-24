"use strict";

// no recursion
export function fibonaIt(n) {
    let a = 0,b=1,c=1,d=1;
    if (n === 0){
        return 0;
    }
    else{
        if(n===1){
            return 1;
        }
        else{
            for(let i = 0; i<n-1; i++){
                c = a+b;
                a = b ;
                b = c ;
            }
            return c;
        }
    }
}

// recursive programming
export function fiboRec(n) {
    if(n===0){
        return 0;
    }
    else{
        if(n===1){
            return 1;
        }
        else{
            return fiboRec(n-1)+fiboRec(n-2);
        }
    }
}

// use a loop
export function fibo_arr(t) {
    let n = t.length
    let r = []
    r.length = n;
    for(let i = 0;i<n;i++){
        r[i] = fiboRec(t[i]);
    }
    return r
}

// use of map
export function fibMap(t) {
    const a = t.map(fiboRec);
    return a
}