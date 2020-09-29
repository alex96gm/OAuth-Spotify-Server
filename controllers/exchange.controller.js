const spotifyService = require('../services/spotify.service');
var encriptionHelper = require('../utils/encription.helper');

const CLIENT_CALLBACK_URL = process.env.CLIENT_CALLBACK_URL;

module.exports.exchangeToken = (req, res, next) => {
    console.log(req);
    const params = req.body;
    if (!params.code) {
        return res.json({
            "error": "Parameter missing"
        });
    }

    const setConfigRequets = {
        grant_type: "authorization_code",
        redirect_uri: CLIENT_CALLBACK_URL,
        code: params.code
    };

    spotifyService.spotifyRequest(setConfigRequets).then(session => {
        let result = {
            "access_token": session.access_token,
            "expires_in": session.expires_in,
            "refresh_token": encriptionHelper.encrypt(session.refresh_token)
        };
        return res.send(result);
    }).catch(response => {
        return res.json(response);
    });
}