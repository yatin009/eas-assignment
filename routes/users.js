var express = require('express');
var router = express.Router();
var request = require('request');
var encodeUrl = require('encodeurl')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/authenticate', function (req, res, next) {
    var callbackURL = encodeUrl('https://eas-assignment.herokuapp.com/users/callback');
    var url = encodeUrl('https://github.com/login/oauth/authorize?client_id=6cf3a99020e9f40384d9&state=easassignment&' +
        'redirect_uri=' + callbackURL +'&scope=repo');
    res.redirect(url);
});

router.get('/callback', function (req, res, next) {
    console.log(req.query);
    var code = req.query.code;
    var state = req.query.state;
    var callbackURL = encodeUrl('http://localhost:3000/users/callback');

    var options = {
        'url': 'https://github.com/login/oauth/access_token',
        'headers': {
            'Accept': 'application/json'
        },
        'formData':{
            'client_id': '6cf3a99020e9f40384d9',
            'client_secret': '4cb7f4e8446c057728cd625bdffd2a90fa9556b8',
            'code': code,
            'redirect_uri': callbackURL,
            'state': state
        }
    };
    request.post(options, function (err, httpResponse, body) {
        if(!err) {
            console.log(body);
            var accessToken = JSON.parse(body).access_token;
            req.session.accessToken = accessToken;
            console.log(accessToken);
            callProfileAPI(accessToken, res)
        }else{
            res.status(500);
            res.send(err);
        }
    });
});

function callProfileAPI(accessToken, res) {
     res.redirect('/home')
}

module.exports = router;
