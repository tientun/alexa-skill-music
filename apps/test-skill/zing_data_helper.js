'use strict';
// var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://api.mp3.zing.vn/api/mobile/source/song/';

function ZingDataHelper() {}

ZingDataHelper.prototype.requestAirportStatus = function(songId) {
    var request = this.getAirportStatus(songId);
    return request.then(
        function(response) {
            console.log('success - received for ' + songId);
            // console.log('success: %f', response.headers);
            // console.log('success: ' + request.uri.href);
            return request.uri.href.replace("http:","https:");
        }
    );
};

ZingDataHelper.prototype.getAirportStatus = function(airportCode) {
    var options = {
        method: 'GET',
        uri: ENDPOINT + airportCode,
        resolveWithFullResponse: true,
        followAllRedirects: true,
        json: true
    };
    return rp(options);
};
module.exports = ZingDataHelper;
