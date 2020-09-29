
const API_URL = "https://accounts.spotify.com/api/token";

var axios = require('axios').default;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports.spotifyRequest = params => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL, params, {headers:  {"Authorization": "Basic "+ btoa(CLIENT_ID + ":" + CLIENT_SECRET)}})
        .then(resp => {
            console.log('Respuesta', resp );
            if (resp.statusCode != 200) {
                return Promise.reject({
                  statusCode: resp.statusCode,
                  body: resp.body
                });
              }
            return Promise.resolve(resp.body);
        }).catch( error => {
            console.log(error)
            return Promise.reject({
                statusCode: 500,
                body: JSON.stringify(error)
            });
        });
  })
};