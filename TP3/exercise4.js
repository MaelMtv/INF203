"use strict";

var data;
var slideNbr;
var count = -1;
var test_pause = false;
var time;
var div;

function load() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "slides.json");
    xhttp.onload = function() {
        data = JSON.parse(this.responseText);
        slideNbr = data.slides.length;
    };
    xhttp.send();
}

load();


function play(){
    count++;
    console.log("Before : " + count)
    div = document.getElementById("container");
    while (div.childElementCount != 0) {
        div.removeChild(div.firstChild);
    }
    var frame = document.createElement("iframe");
    frame.src = data.slides[counter].url;
    frame.style.height = "100%";
    frame.style.width = "100%";
    div.appendChild(frame);
    console.log("After : " + count)
    if (count < numberOfSlides && !test_pause) {
        setTimeout(play, 2000);
    }
}

function pause(){
    if (test_pause){
        pause = true;
    }
    else{
        pause = false;
        play();
    }
}

function next() {
    pause = true;
    console.log("Before : " + count)
    if (count < slideNbr) {
        count++;
        div = document.getElementById("container");
        while (div.childElementCount != 0) {
            div.removeChild(div.firstChild);
        }
        var frame = document.createElement("iframe");
        frame.src = data.slides[count].url;
        frame.style.height = "100%";
        frame.style.width = "100%";
        div.appendChild(frame);
        console.log("After : " + count)
    } else { return; }
}

function previous() {
    pause = true;
    console.log("Before : " + count)
    if (count > 0) {
        count--;
        div = document.getElementById("container");
        while (div.childElementCount != 0) {
            div.removeChild(div.firstChild);
        }
        var frame = document.createElement("iframe");
        frame.src = data.slides[count].url;
        frame.style.height = "100%";
        frame.style.width = "100%";
        div.appendChild(frame);
        console.log("After : " + count)
    } else { return; }
}