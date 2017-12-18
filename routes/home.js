/**
 * Created by yatin on 14/12/17.
 */
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    var accessToken = req.session.accessToken;
    console.log('accessToken');
    console.log(accessToken);
    var options = {
        'url': 'https://api.github.com/user?access_token='+accessToken,
        'headers': {
            'User-Agent': 'eas-application'
        }
    };
    request.get(options, function (err, httpResponse, body) {
        console.log(err);
        if(!err) {
            console.log(body);
            var accessToken = body.access_token;
            res.status(httpResponse.statusCode);
            res.send(body)
        }else{
            res.status(500);
            res.send(err);
        }
    })
});


module.exports = router;
