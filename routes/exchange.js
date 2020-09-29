const express = require('express');
const router = express.Router();

const exchangeControler = require('../controllers/exchange.controller');
const spotifyMiddleware = require('../middlewares/spotify.middleware');

router.post('/',spotifyMiddleware.isAuthenticated, exchangeControler.exchangeToken);


module.exports = router;