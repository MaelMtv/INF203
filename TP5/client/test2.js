"use strict";


function show(){
    var req = new XMLHttpRequest();
    req.open('GET','../../Slices');
    req.onload = function(){
        if(this.status === 200){
            document.getElementById("MAINSHOW").textContent = this.responseText;
        }
        else{
            document.getElementById("MAINSHOW").textContent = "Error, file not found!";
        }
    }
    req.send();
}

function add(){
    document.getElementById("formadd").style.visibility="visible";
}

function remove(){
    document.getElementById("formrem").style.visibility="visible";
}

function clear_json(){
    var req = new XMLHttpRequest();
    req.open('GET', '../../clear');
    req.send();
}

function restore(){
    var req = new XMLHttpRequest();
    req.open('GET', '../../restore');
    req.send();
}

function sendAdd(){
    let title = document.getElementById("titleTF").value;
    let value = document.getElementById("valueTF").value;
    let color = document.getElementById("colorTF").value;
    var req = new XMLHttpRequest();
    req.open('GET', '../../add?title='+title+'&value='+value+'&color='+color);
    req.send();
    document.getElementById("formadd").style.visibility="hidden";
    document.getElementById("formadd").reset();
}

function sendRem(){
    let index = document.getElementById("indexTF").value;
    var req = new XMLHttpRequest();
    req.open('GET', '../../remove?index='+index);
    req.send();
    document.getElementById("formrem").style.visibility="hidden";
    document.getElementById("formrem").reset();
}

function show_pie(){
    
}