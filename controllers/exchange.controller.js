const qs = require('qs');

const spotifyService = require('../services/spotify.service');
const encriptionHelper = require('../utils/encription.helper');


module.exports.exchangeToken = (req, res, next) => {

    const params = req.body;
    if (!params.code) {
        return res.json({
            "error": "Parameter missing"
        });
    }
    
    const setConfigRequets = qs.stringify({
        code: params.code,
        grant_type: "authorization_code",
        redirect_uri: process.env.CLIENT_CALLBACK_URL,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    });

    spotifyService.spotifyRequest(setConfigRequets).then(session => {
        console.log(session);
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