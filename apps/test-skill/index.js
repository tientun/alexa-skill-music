module.change_code = 1;
'use strict';

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
    function(request, response) {
        var stream = {
            "url": "https://feeds.soundcloud.com/stream/275202399-amazon-web-services-306355661-amazon-web-services.mp3",
            "token": null,
            "expectedPreviousToken": null,
            "offsetInMilliseconds": 0
        };
        response.audioPlayerPlayStream("REPLACE_ALL", stream);
    }
);

module.exports = app;
