const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');

router.post('/playlists', playlistController.createPlaylist);
router.post('/playlists/:playlistId/songs/:songId', playlistController.addSongToPlaylist);

module.exports = router;
