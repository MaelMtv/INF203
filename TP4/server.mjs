"use strict";

import {createServer} from "http";
import * as fs from 'fs';
import * as querystring from 'querystring';

const mimetype = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'application/javascript',
    '.png' : 'image/png',
    '.txt' : 'text/plain',
    '.mjs' : 'application/javascript',
    '.jpg' : 'image/jpeg',
    '.jpeg' : 'image/jpeg'
};

let receivednames =[];

// request processing
function webserver( request, response ) {  

    const {method, url} = request;

    if(url === "/"){
        response.setHeader("Content-Type", "text/html; charset=utf-8");  
        response.end("<!doctype html><html><body>Server works!</body></html>");
    }
    if(url === "/exit"){
        response.writeHead(200,{"Content-type": "text/html"});
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    }
    if(url.startsWith("/files/")){
        const path = url.substring(7);
        if(!fs.existsSync(path)){
            response.writeHead(404,{"Content-type": "text/html"});
            response.end("<!doctype html><html><body>The file you asked for does not exist</body></html>");
        }
        else{
            console.log("Displaying content of " + path);
            let data = fs.readFileSync(path);
            let filetype = path.substring(path.lastIndexOf('.'));
            response.writeHead(200,{"Content-type": mimetype[filetype]});
            response.end(data);
        }
        
    }
    if(url.startsWith('/hi?visiteur=')){
        const name = querystring.unescape(url.substring(13));
        response.writeHead(200,{'Content-type': 'text/html; charset=utf-8'});
        response.end('hi '+name);
    }
    if(url.startsWith('/bonsoir?nom=')){
        let name = querystring.unescape(url.substring(13));
        let othernames = receivednames.toString().replace(/,/g,', ');
        name = name.replace(/</g,'_');
        name = name.replace(/>/g,'_');
        if(!receivednames.includes(name)){
            receivednames.push(name);
        }
        response.writeHead(200,{'Content-type': 'text/html; charset=utf-8'});
        response.end('bonsoir '+name+', the following users have already visited this page: '+othernames);
    }
    if(url === '/clear'){
        receivednames = [];
        response.writeHead(200,{'Content-type': 'text/html'});
        response.end("<!doctype html><html><body>The memory of previous bonsoir requests was cleared</body></html>");
        //recievednames.forEach(pop);
    }
}

// create server object
const server = createServer(webserver);

// server starting

server.listen(process.argv[2], (err) => {});