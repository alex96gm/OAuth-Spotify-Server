
const spotifyService = require('../services/spotify.service');
const encriptionHelper = require('../utils/encription.helper');
const qs = require('qs');

module.exports.refreshToken = (req, res, next) => {
    const params = req.body;
    if (!params.refresh_token) {
        return res.json({
            "error": "Parameter missing"
        });
    }
    const setConfigRequets = qs.stringify({
        grant_type: "refresh_token", 
        refresh_token: params.refresh_token,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    });
    
    spotifyService.spotifyRequest(setConfigRequets).then(session => {
        return res.send({
            "access_token": session.access_token,
            "expires_in": session.expires_in
        });
    }).catch(response => {
        return res.json(response);
    });
}

