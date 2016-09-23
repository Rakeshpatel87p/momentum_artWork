var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http');
    // request = require('superagent');

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/example', function(req, res) {
    res.status(201).json({});
})

// http.get({
//     host: 'https://pixabay.com/api/',
//     path: 
// })

// var url = 'https://api.shutterstock.com/v2/images/recommendations';
// request
//     .get(url).end(function(res, err){
//         if (err){
//             console.log(err)
//         }
//         console.log(res);
//         res.json(res);
//     })

// For artsy
// var getAppToken = function(req, res) {
//     var clientID = 'cd7051715d376f899232',
//         clientSecret = 'de9378d3d12c2cbfb24221e8b96d212c',
//         apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
//         xappToken;

//     request
//         .post(apiUrl)
//         .send({ client_id: clientID, client_secret: clientSecret })
//         .end(function(res, err) {
//             if (req.body.token) {
//                 xappToken = res.body.token;
//             } else {
//                 console.log(err)
//             };

//         });
// }



app.listen(process.env.PORT || 8080);
console.log('Connected Captain. Safe journey.');
exports.app = app;
