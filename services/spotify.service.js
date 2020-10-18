const axios = require('axios').default;
const configAxiosHelper = require('../utils/configs.axios.helper');

module.exports.spotifyRequest = params => {
    return new Promise((resolve, reject) => {
      axios.post(process.env.SPOTIFT_API + '/token', params, configAxiosHelper.configAxiosSpotify).then(response => {
            if (response.status != 200) {
                return reject({
                  statusCode: response.status,
                  error: response.data.error,
                  errorDescription: response.data.error_description
              });
            }
            return resolve(response.data);
        }).catch(responseError => {
            return reject({
                statusCode: responseError.response.status,
                error: responseError.response.data.error,
                errorDescription: responseError.response.data.error_description
            });
        });
  })
};