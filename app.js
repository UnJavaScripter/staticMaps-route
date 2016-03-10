"use strict";

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let port = 8080;
let API_KEY = process.argv[2] || false;

let request = require('request');

server.listen(port, function () {
    console.log('Server ready to go at port %d', port);
});

app.get('/', function(req, res) {
    try{
        let points = req.query.p.split('|').map((point)=>point.split(',')) || false;
        let pickUp = points[0];
        let dropOff = points[points.length-1];
        let size = req.query.size || "600x300";
        
        let polyline = (pointsArr) => {
            let polylineConfig = `path=color:0x00baca|weight:5`
            return polylineConfig += pointsArr.map((segment)=> `|${segment}`).toString().replace(/,\|/g, '|');
        };

        let hostString = `https://maps.googleapis.com/maps/api/staticmap?
        &size=${size}
        &maptype=roadmap
        &markers=color:green%7Clabel:O%7C${pickUp}
        &markers=color:red%7Clabel:D%7C${dropOff}
        &${polyline(points)}`;

        API_KEY ? hostString += `&key=${API_KEY}` : false;

        request.get(hostString).pipe(res);
    }catch(e){
        console.error("errr", e);
        res.status(400);
        res.setHeader('Content-type', 'text/html');
        let errorText = `
            <p>
                Remember to send a 'p' parameter with the format:
                    <pre>*latitude*,*longitude*|*latitude*,*longitude*|...</pre>
                and the optional 'size' parameter like:
                    <pre>*width*x*height*.</pre>
                <b>Example:</b>
                <pre>p=4.718799,-74.050629%7C4.714212,-74.037668&size=600x600</pre>
            </p>
        `
        if(e instanceof TypeError){
            res.send(`Ooops! Check the URL format. ${errorText}`);
        }else{
            res.send(`Ooops! Something happened. ${errorText}`);
        }


    }


    

});
