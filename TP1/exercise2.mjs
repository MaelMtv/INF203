"use strict";

export function wcount(s){
    const words = s.split(" ");
    var object = {};
    for(let i = 0; i < words.length; i++){
        if(object [words[i]] >= 0){
            object [words[i]] ++;
        }
        else{
            object [words[i]] = 1;
        }
    }
    return object;
}

export class WordList{
    constructor(string){
        this.counts = wcount(string);
    }

    getWords(){
        return Object.keys(this.counts).sort()
    }

    maxCountWord(){
        let max_w = "zz";
        let max_nb = 0;
        for(const x of this.getWords()){
            if(this.getCount(x) > max_nb){
                max_nb = this.getCount(x);
                max_w = x;
            }
        }
        return max_w;
    }

    minCountWord(){
        let min_w = "a";
        let min_nb = Infinity;
        for(const x of this.getWords()){
            if(this.getCount(x) < min_nb){
                min_nb = this.getCount(x);
                min_w = x;
            }
        }
        return min_w;
    }

    getCount(word){
        return this.counts[word];
    }

    applyWordFunc(f){
        return this.getWords().map(f);
    }
}