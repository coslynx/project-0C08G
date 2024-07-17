```javascript
const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  songs: [{ type: String, required: true }],
});

const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = {
  getPlaylist: async (playlistName) => {
    try {
      const playlist = await Playlist.findOne({ name: playlistName });
      return playlist;
    } catch (error) {
      console.error('Error getting playlist:', error);
      return null;
    }
  },

  createPlaylist: async (playlistName, data) => {
    try {
      const newPlaylist = new Playlist({ name: playlistName, songs: data });
      await newPlaylist.save();
      return newPlaylist;
    } catch (error) {
      console.error('Error creating playlist:', error);
      return null;
    }
  },

  updatePlaylist: async (playlistName, data) => {
    try {
      const updatedPlaylist = await Playlist.findOneAndUpdate({ name: playlistName }, data, { new: true });
      return updatedPlaylist;
    } catch (error) {
      console.error('Error updating playlist:', error);
      return null;
    }
  },

  deletePlaylist: async (playlistName) => {
    try {
      const deletedPlaylist = await Playlist.findOneAndDelete({ name: playlistName });
      return deletedPlaylist;
    } catch (error) {
      console.error('Error deleting playlist:', error);
      return null;
    }
  },
};
```