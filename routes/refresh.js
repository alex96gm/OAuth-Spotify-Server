const express = require('express');
const router = express.Router();

const refreshControler = require('../controllers/refresh.controller');
const spotifyMiddleware = require('../middlewares/spotify.middleware');

router.post('/', spotifyMiddleware.isAuthenticated ,refreshControler.refreshToken);


module.exports = router;