"use strict";

import {Stud, FrStd} from "./exercise3.mjs";
import * as fs from 'fs';

export class Prom{
    constructor(){
        this.stdlist = [];
    }

    add(student){
        this.stdlist.push(student);
    }

    size(){
        return this.stdlist.length;
    }

    get(i){
        return this.stdlist[i];
    }

    print(){
        let str = "";
        for(let i = 0; i<this.stdlist.length; i++){
            let student = this.stdlist[i].toString();
            console.log(student);
            str + student +", ";
        }
        return str;
    }

    write(){
        return JSON.stringify(this.stdlist);
    }

    read(str){
        let parse = JSON.parse(str);
        for(let student of parse){
            console.log(student);
            if(student.nationality != undefined){
                student = Object.assign(new FrStd(),student);
            }
            else{
                student = Object.assign(new Stud(),student);
            }
            this.add(student)
        }
    } 
    
    saveToFile(name){
        fs.writeFileSync(name,this.write());
    }

    readFile(name){
        this.read(fs.readFileSync(name));
    }

}