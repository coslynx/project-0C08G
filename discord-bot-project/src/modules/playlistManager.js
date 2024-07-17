```javascript
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // Replace with your MongoDB connection string

class PlaylistManager {
  constructor() {
    this.client = new MongoClient(uri);
    this.db = null;
  }

  async connectToDatabase() {
    try {
      await this.client.connect();
      this.db = this.client.db('your-database-name'); // Replace with your database name
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }

  async createPlaylist(playlistName, ownerID) {
    try {
      await this.connectToDatabase();
      const playlistCollection = this.db.collection('playlists');
      const existingPlaylist = await playlistCollection.findOne({ name: playlistName });
      if (existingPlaylist) {
        return 'A playlist with that name already exists!';
      }
      const newPlaylist = {
        name: playlistName,
        owner: ownerID,
        songs: [],
      };
      const result = await playlistCollection.insertOne(newPlaylist);
      return `Playlist "${playlistName}" created successfully!`;
    } catch (error) {
      console.error('Error creating playlist:', error);
      return 'Failed to create playlist. Please try again later.';
    }
  }

  async addSongToPlaylist(playlistName, songInfo, ownerID) {
    try {
      await this.connectToDatabase();
      const playlistCollection = this.db.collection('playlists');
      const existingPlaylist = await playlistCollection.findOne({ name: playlistName });
      if (!existingPlaylist) {
        return 'Playlist not found!';
      }
      if (existingPlaylist.owner !== ownerID) {
        return 'You are not the owner of this playlist!';
      }
      const result = await playlistCollection.updateOne({ name: playlistName }, { $push: { songs: songInfo } });
      if (result.modifiedCount > 0) {
        return `Song "${songInfo.title}" added to playlist "${playlistName}"`;
      } else {
        return 'Failed to add song to playlist';
      }
    } catch (error) {
      console.error('Error adding song to playlist:', error);
      return 'Failed to add song to playlist. Please try again later.';
    }
  }

  async savePlaylist(playlistName, songs, ownerID) {
    try {
      await this.connectToDatabase();
      const playlistCollection = this.db.collection('playlists');
      const existingPlaylist = await playlistCollection.findOne({ name: playlistName });
      if (!existingPlaylist) {
        return 'Playlist not found!';
      }
      if (existingPlaylist.owner !== ownerID) {
        return 'You are not the owner of this playlist!';
      }
      const result = await playlistCollection.updateOne({ name: playlistName }, { $set: { songs } });
      if (result.modifiedCount > 0) {
        return `Playlist "${playlistName}" saved successfully!`;
      } else {
        return 'Failed to save playlist';
      }
    } catch (error) {
      console.error('Error saving playlist:', error);
      return 'Failed to save playlist. Please try again later.';
    }
  }

  async loadPlaylist(playlistName, ownerID) {
    try {
      await this.connectToDatabase();
      const playlistCollection = this.db.collection('playlists');
      const playlist = await playlistCollection.findOne({ name: playlistName, owner: ownerID });
      if (!playlist) {
        return 'Playlist not found!';
      }
      return playlist.songs;
    } catch (error) {
      console.error('Error loading playlist:', error);
      return 'Failed to load playlist. Please try again later.';
    }
  }

  async deletePlaylist(playlistName, ownerID) {
    try {
      await this.connectToDatabase();
      const playlistCollection = this.db.collection('playlists');
      const result = await playlistCollection.deleteOne({ name: playlistName, owner: ownerID });
      if (result.deletedCount > 0) {
        return `Playlist "${playlistName}" deleted successfully!`;
      } else {
        return 'Failed to delete playlist';
      }
    } catch (error) {
      console.error('Error deleting playlist:', error);
      return 'Failed to delete playlist. Please try again later.';
    }
  }

  async editPlaylist(playlistName, newPlaylistData, ownerID) {
    try {
      await this.connectToDatabase();
      const playlistCollection = this.db.collection('playlists');
      const result = await playlistCollection.updateOne(
        { name: playlistName, owner: ownerID },
        { $set: newPlaylistData },
      );
      if (result.modifiedCount > 0) {
        return `Playlist "${playlistName}" updated successfully!`;
      } else {
        return 'Failed to update playlist';
      }
    } catch (error) {
      console.error('Error editing playlist:', error);
      return 'Failed to edit playlist. Please try again later.';
    }
  }
}

module.exports = PlaylistManager;
```