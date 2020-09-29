
const spotifyService = require('../services/spotify.service');
const encriptionHelper = require('../utils/encription.helper');

module.exports.refreshToken = (req, res, next) => {
    const params = req.body;
    if (!params.refresh_token) {
        return res.json({
            "error": "Parameter missing"
        });
    }
    const setConfigRequets = {grant_type: "refresh_token", refresh_token: encriptionHelper.decrypt(params.refresh_token)}
    spotifyService.spotifyRequest(setConfigRequets).then(session => {
        return res.json({
            "access_token": session.access_token,
            "expires_in": session.expires_in
        });
    }).catch(response => {
        return res.json(response);
    });
}

