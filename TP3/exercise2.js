"use strict";

function send(){
    var xhttp = new XMLHttpRequest();
    var message = document.getElementById("textedit").value;
    if (message == ""){return;}
    req = "chat.php?phrase="+message
    xhttp.open("GET", req, true);
    xhttp.onload = function() {
        console.log(this.responseText);
    };
    xhttp.send();
}

function relaod(){
    var xhttp = new XMLHttpRequest();
    var div;
    xhttp.open("GET", "chatlog.txt");
    xhttp.onload = function() {
        var lines = this.responseText.split("\n").reverse();
        div = document.getElementById("tarea");
        let n = div.childElementCount;
        for (let i=0; i<n; i++){
            div.removeChild(div.firstChild);
        }
        var p;
        for (let i in lines) {
            if (lines[i] == "") continue;
            p = document.createElement("p");
            p.textContent = lines[i];
            div.appendChild(p);
            if (div.childElementCount == 10) break;
        }
    };
    xhttp.send();
}

setInterval(relaod,1000);