// Tried browserifying main.js and sever.js - no success; same error of require not defined

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http');
    path = require('path');
// request = require('superagent');

app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/bundle.js', express.static(__dirname + '/bundle.js'))
app.use('/server.js', express.static(__dirname + '/server.js'));

// app.use('/public', express.static(__dirname + '/public'));
// Tries:
// app.use('/public', express.static(__dirname + '/public'));
// Rearranging order of when use files are processed
// /public is tempermental

app.get('/', function(req, res) {
    // Tried directly loading it
    console.log("Hello world");
});

app.get('/example', function(req, res) {
    res.status(201).json({});
})

app.get('/authorization', function(req, res) {
    var responseHere;
    var params = {
        'client_id': 'cd7051715d376f899232',
        'client_secret': 'de9378d3d12c2cbfb24221e8b96d212c',
    }
    http.request({
        host: 'https://api.artsy.net/api/tokens/xapp_token',
        method: 'POST',
        headers: {params}
    }, function(response) {
        console.log('this is the response--------', response)
        responseHere = response
    })
    res.send(responseHere)
})

app.listen(process.env.PORT || 8080);
console.log('Connected Captain. Safe journey.');
exports.app = app;
