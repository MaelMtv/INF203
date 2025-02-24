"use strict";

var data;

function load() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "slides.json");
    xhttp.onload = function() {
        data = JSON.parse(this.responseText);
    };
    xhttp.send();
}

load();

function load_slide(url) {
    var div = document.getElementById("container");
    if (div.firstChild) div.removeChild(div.firstChild);
    var frame = document.createElement("iframe");
    frame.src = url;
    frame.style.height = "100%";
    frame.style.width = "100%";
    div.appendChild(frame);
}

function play(){
    for (var i in data.slides) {
        setTimeout(load_slide, 1000 * data.slides[i].time, data.slides[i].url);
    }
}