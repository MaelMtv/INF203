"use strict";

import {createServer} from "http";
import * as fs from 'fs';

const mimetype = {
    '.html' : 'text/html',
    '.css' : 'text/css',
    '.js' : 'application/javascript',
    '.png' : 'image/png',
    '.txt' : 'text/plain',
    '.mjs' : 'application/javascript',
    '.jpg' : 'image/jpeg',
    '.jpeg' : 'image/jpeg',
    '.json' : 'application/json',
    '.svg' : 'image.svg+xml'
};

// request processing
function webserver( request, response ) {  

    const {method, url} = request;

    if(url === "/"){
        response.setHeader("Content-Type", "text/html; charset=utf-8");  
        response.end("<!doctype html><html><body>Server works!</body></html>");
    }

    else{ if(url === "/kill"){// peut etre mettre kill au lieu de exit
        response.writeHead(200,{"Content-type": "text/html"});
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    }

    else{ if(url.startsWith("/files/")){
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

    else{ if(url === "/Slices"){
        if(fs.existsSync('./storage.json')){
            response.writeHead(200,{"Content-type": mimetype['.json']});
            response.end(fs.readFileSync('./storage.json'));
        }
        else{
            response.writeHead(404,{"Content-type": "text/html"});
            response.end("<!doctype html><html><body>The file you asked for does not exist</body></html>");
        }
    }

    else{ if(url.startsWith("/add?")){
        let slice = url.substring(5).split('&')
        let title = slice[0].substring(slice[0].lastIndexOf("=")+1);
        let value = slice[1].substring(slice[1].lastIndexOf("=")+1);
        let color = slice[2].substring(slice[2].lastIndexOf("=")+1);
        let ndata = {"title": title, "color": color, "value": value};
        if(fs.existsSync('./storage.json')){
            let odata = JSON.parse(fs.readFileSync('./storage.json'));
            odata.push(ndata);
            fs.writeFileSync('./storage.json', JSON.stringify(odata));
        }
        else{
            fs.writeFileSync('./storage.json', JSON.stringify(ndata));
        }
        response.writeHead(200,{'Content-type': 'text/html'});
        response.end("<!doctype html><html><body>Added element in Json file succesfully!</body></html>");
    }

    else{ if(url.startsWith("/remove?")){
        let index = url.substring(url.lastIndexOf('=')+1);
        console.log(index);
        if(fs.existsSync('./storage.json')){
            let odata = JSON.parse(fs.readFileSync('./storage.json'));
            if(index < odata.length){
                let ndata = odata.splice(index,1);
            }
            fs.writeFileSync('./storage.json',JSON.stringify(odata));
        }
        response.writeHead(200,{'Content-type': 'text/html'});
        response.end("<!doctype html><html><body>Removed element from Json file succesfully!</body></html>");
    }

    else{ if(url === "/clear"){
        let data = JSON.stringify([{"title": "empty", "color": "red", "value": 1}]);
        fs.writeFileSync('./storage.json',data);
        response.writeHead(200,{'Content-type': 'text/html'});
        response.end("<!doctype html><html><body>Cleared Json file succesfully!</body></html>");
    }
    else{ if(url === "/restore"){
        let data = JSON.stringify([{"title": "foo", "color": "red", "value": 20}, {"title": "bar", "color": "ivory", "value": 100}, {"title": "xun", "color": "green", "value": 110}]);
        fs.writeFileSync('./storage.json',data);
        response.writeHead(200,{'Content-type': 'text/html'});
        response.end("<!doctype html><html><body>Restored Json file succesfully!</body></html>");
    }

    else{ if(url === "/PChart"){

    }

    else{
        response.writeHead(404,{'Content-type': 'text/html'});
        response.end("<!doctype html><html><body>Requested url does not exist</body></html>");
    }
    }}}}}}}}
}

// create server object
const server = createServer(webserver);

// server starting

server.listen(process.argv[2], (err) => {});