const Playlist = require('/models/Playlist');

// Create a new playlist
exports.createPlaylist = async (req, res) => {
  try {
    const playlist = new Playlist(req.body);
    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a song to a playlist
exports.addSongToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.playlistId);
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });

    playlist.songs.push(req.params.songId);
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
