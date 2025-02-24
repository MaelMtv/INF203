"use strict";

import {fibonaIt,fiboRec,fibo_arr,fibMap} from "./exercise1.mjs";
import {wcount,WordList} from "./exercise2.mjs";
import {Stud, FrStd} from "./exercise3.mjs";
import {Prom} from "./exercise4.mjs";
/*
console.log(fibonaIt(7)); // do more that one test per function
console.log(fiboRec(8));
console.log(fibo_arr([3,5]));
console.log(fibMap([3,5]));
console.log(wcount("aa aa aa bb"))
const wlist = new WordList("aa aa aa bb");
console.log(wlist.getWords());
console.log(wlist.maxCountWord());
console.log(wlist.minCountWord());
console.log(wlist.getCount("aa"));
console.log(wlist.applyWordFunc(x => x.length))
//...*/
let student1 = new Stud("aa","b",12);
console.log(student1.toString());
let student2 = new FrStd("bb","c",15,"aaaeaea");
console.log(student2.toString());

let prom = new Prom();
prom.add(new Stud("aa",'a',122));
prom.add(new FrStd("ee",'d',15,'french'));
let j = prom.write();
prom.read(j);
prom.print()
prom.saveToFile('test.txt');
prom.readFile('test.txt');
prom.print();