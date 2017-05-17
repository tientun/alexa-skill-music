module.change_code = 1;
'use strict';

var ZingDataHelper = require('./zing_data_helper');
var alexa = require('alexa-app');
var app = new alexa.app('test-skill');


app.launch(function(request, response) {
    response.say('Welcome to your test skill').reprompt('Way to go. You got it to run. Bad ass.').shouldEndSession(false);
});


app.error = function(exception, request, response) {
    console.log(exception)
    console.log(request);
    console.log(response);
    response.say('Sorry an error occured ' + error.message);
};

app.intent('sayNumber', {
        "slots": {
            "number": "NUMBER"
        },
        "utterances": [
            "say the number {1-100|number}",
            "give me the number {1-100|number}",
            "tell me the number {1-100|number}",
            "I want to hear you say the number {1-100|number}"
        ]
    },
    function(request, response) {
        var number = request.slot('number');
        response.say("You asked for the number " + number);
    }
);

app.intent('playMusic', {
        "utterances": [
            "play music",
            "play some music",
            "give me some song"
        ]
    },
    function(r, response) {
        var zingHelper = new ZingDataHelper();
        return zingHelper.requestAirportStatus('LGJGTLGNQJGXEVGTLDJTDGLG').then(function(directLink) {
            console.log("link: " + directLink);
            var stream = {
                "url": directLink,
                "token": "this_is_token",
                "offsetInMilliseconds": 0
            };
            response.audioPlayerPlayStream("REPLACE_ALL", stream);
        }).catch(function(err) {
            console.log(err.statusCode);
            var prompt = 'I didn\'t have data for this song';
            response.say(prompt).shouldEndSession(false).send();
        });
    }
);

app.intent('stopMusic', {
        "utterances": [
            "stop music",
            "stop",
            "shut up"
        ]
    },
    function(request, response) {
        response.audioPlayerStop();
    }
);
module.exports = app;
