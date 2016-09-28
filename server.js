// Create timeStamp for user

var express = require('express'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http'),
    unirest = require('unirest')

app.use(bodyParser.json());
// This bad boi lets us parse req.body stuff!!
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/server.js', express.static(__dirname + '/server.js'));

mongoose.connect('mongodb://localhost/momentum_artWork');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect. Error', err)
});

var userProfile = mongoose.Schema({
    user: { type: String },
    artWorksOnRotation: [],
    artWorksLiked: [{ type: String }],
    dateRotationWasUpdate: { type: String }
});
// relationship?
var paintingAttributes = mongoose.Schema({
    image_id: { type: String },
    title: { type: String },
    date: { type: String },
    collecting_institution: { type: String },
    url: { type: String },
    image_version_to_use: { type: String },
    // Added this. May need to "reset" starter kit
    special_notes: { type: String }
});

var UserProfile = mongoose.model('UserProfile', userProfile);
var PaintingAttributes = mongoose.model('PaintingAttributes', paintingAttributes)

// Why doesn't this work?
app.get('/', function(req, response) {
    response.json({ text: "Hello world" });
});

// Creates New User Profile, adding start-kit artworks
app.post('/newUser', function(req, response) {
    UserProfile.create({
        user: req.body.user,
        dateRotationWasUpdate: getDate()
    }, function(err, newUser) {
        if (err) {
            return response.status(500).json(err)
        }

        PaintingAttributes.find({ special_notes: "starter_kit" }, function(err, starter_kit) {
            if (err) {
                return response.status(500).json(err)
            }
            urls = starter_kit.map(function(obj) {
                //TODO - homework: map functions in javscript - functional programming
                return obj.url;
            })
            UserProfile.update({ _id: newUser._id }, { artWorksOnRotation: urls }, function(err, updatedUser) {
                if (err) {
                    console.log(err, 'error');
                }
            });
        })
        response.json(newUser)
        console.log('new user created--------', newUser)
    })
});
// Adds new pieces of artwork to mongoose
app.post('/addingArt', function(req, response) {
    var newItem = new PaintingAttributes({
        image_id: req.body.image_id,
        title: req.body.title,
        date: req.body.date,
        collecting_institution: req.body.institution,
        url: req.body.url,
        image_version_to_use: req.body.version

    });
    newItem.save(function(err, newPaintingAdded) {
        if (err) {
            response.json(err)
        }

        response.json(newPaintingAdded)
    })
});

// Gets artwork from artsy
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
});
// Almost there! Produces the background image for client
app.get('/:user/paintingsToDisplay', function(req, response) {
    var user = req.params.user
    UserProfile.findOne({ user: user }, function(err, user) {
        if (err) {
            return response.status(500).json(err)
        }
        if (!user.dateRotationWasUpdate == getDate()) {
            unirest.post('https://api.artsy.net/api/tokens/xapp_token')
                .headers({ 'Accept': 'application/json' })
                .send({ "client_id": "cd7051715d376f899232", "client_secret": "de9378d3d12c2cbfb24221e8b96d212c" })
                .end(function(res) {
                    // What additional artworks will I provide?
                    unirest.get('https://api.artsy.net/api/artworks/' + id)
                        .headers({ 'Accept': 'application/json', 'X-XAPP-Token': res.body.token })
                        .end(function(res_) {
                            console.log(res_.body)
                            response.json(res_.body)
                        })
                });
        } else {
            response.status(201).json(user.artWorksOnRotation);

        }
    })
});

var getDate = function() {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    return newdate = year + "/" + month + "/" + day;
}

app.listen(process.env.PORT || 8080);
console.log('Connected Captain. Safe journey.');
exports.app = app;
