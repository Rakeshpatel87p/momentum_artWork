// Tried browserifying main.js and sever.js - no success; same error of require not defined

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http'),
    unirest = require('unirest')
    // path = require('path');
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

app.get('/', function(req, response) {
    // Tried directly loading it
    response.json("Hello world");
});

app.get('/example', function(req, res) {
    res.status(201).json({});
})

app.get('/artworks', function(req, response) {
    var responseHere;
    unirest.post('https://api.artsy.net/api/tokens/xapp_token')
        .headers({ 'Accept': 'application/json' })
        .send({ "client_id": "cd7051715d376f899232", "client_secret": "de9378d3d12c2cbfb24221e8b96d212c" })
        .end(function(res) {
            unirest.get('https://api.artsy.net/api/artworks')
                .headers({ 'Accept': 'application/json', 'X-XAPP-Token': res.body.token })
                .end(function(res_) {
                    response.json(res_.body)
                })
        });
})

app.get('/artworks/:id', function(req, response) {
    var id = req.params.id;
    unirest.post('https://api.artsy.net/api/tokens/xapp_token')
        .headers({ 'Accept': 'application/json' })
        .send({ "client_id": "cd7051715d376f899232", "client_secret": "de9378d3d12c2cbfb24221e8b96d212c" })
        .end(function(res) {
            unirest.get('https://api.artsy.net/api/artworks/' + id)
                .headers({ 'Accept': 'application/json', 'X-XAPP-Token': res.body.token })
                .end(function(res_) {
                    console.log(res_.body)
                    response.json(res_.body)
                })
        });
})

app.listen(process.env.PORT || 8080);
console.log('Connected Captain. Safe journey.');
exports.app = app;
