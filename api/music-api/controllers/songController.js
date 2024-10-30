const Song = require('/models/Song');

// Create a new song
exports.createSong = async (req, res) => {
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all songs
exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a song by ID
exports.getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a song
exports.updateSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a song
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
