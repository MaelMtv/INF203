"use strict";

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "text.txt", true);
    xhttp.onload = function() {
        document.getElementById("tarea").textContent += this.responseText;
    };
    xhttp.send();
}

function randomColor(){
    return "#"+ Math.floor(Math.random()*16777215).toString(16);
}

function loadDoc2(){
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "text.txt", true);
    xhttp.onload = function() {
        var all_lines = this.responseText.split('\n');
        var div = document.getElementById('tarea2');
        var col;
        var p;
        for(let i=0;i<all_lines.length; i++){
            col = randomColor();
            p = document.createElement('p');
            p.style.color = col;
            p.textContent = all_lines[i];
            div.appendChild(p);
        }
    };
    xhttp.send();
}