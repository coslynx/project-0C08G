```javascript
const { Client, Intents } = require('discord.js');
const genius = require('genius-lyrics-api');
const lyricsFinder = require('lyrics-finder');

const Genius = new genius.Genius(process.env.GENIUS_API_KEY);

module.exports = class LyricDisplay {
  constructor() {
    this.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
  }

  async fetchLyrics(songTitle) {
    try {
      // Try fetching lyrics from Genius API
      const lyrics = await Genius.lyrics(songTitle, {
        optimize: true,
      });
      return lyrics;
    } catch (error) {
      // If Genius API fails, try fetching from lyrics-finder
      try {
        const lyrics = await lyricsFinder(songTitle);
        return lyrics;
      } catch (error) {
        // If both Genius and lyrics-finder fail, return an error message
        return 'Lyrics not found.';
      }
    }
  }

  async displayLyrics(message, songTitle) {
    try {
      // Fetch lyrics for the song
      const lyrics = await this.fetchLyrics(songTitle);
      
      // Send lyrics to the Discord channel
      if (lyrics.length > 2000) {
        // If lyrics are too long, split and send multiple messages
        const lyricsChunks = lyrics.match(/.{1,1999}/g);
        for (const chunk of lyricsChunks) {
          await message.channel.send(chunk);
        }
      } else {
        await message.channel.send(lyrics);
      }
    } catch (error) {
      // Log any errors that occur during lyric fetching
      console.error('Error displaying lyrics:', error);
      message.channel.send('An error occurred while fetching lyrics.');
    }
  }
};
```