```javascript
const { Client, Intents } = require('discord.js');
const { genius } = require('genius-lyrics-api');
const { lyricsFinder } = require('lyrics-finder');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

// Replace with your actual Genius API key
const GENIUS_ACCESS_TOKEN = 'YOUR_GENIUS_API_KEY';
const geniusClient = new genius.Client(GENIUS_ACCESS_TOKEN);

// Function to fetch lyrics from Genius API
async function fetchLyricsFromGenius(songTitle) {
  try {
    const response = await geniusClient.search(songTitle);
    const song = response.hits[0].result;
    const lyrics = await song.lyrics();
    return lyrics;
  } catch (error) {
    console.error(`Error fetching lyrics from Genius: ${error}`);
    return null;
  }
}

// Function to fetch lyrics using lyrics-finder library
async function fetchLyricsFromLyricsFinder(songTitle, artist) {
  try {
    const lyrics = await lyricsFinder(songTitle, artist);
    return lyrics;
  } catch (error) {
    console.error(`Error fetching lyrics from lyrics-finder: ${error}`);
    return null;
  }
}

// Function to display lyrics in a user-friendly format
function displayLyrics(lyrics) {
  if (!lyrics) {
    return 'Lyrics not found.';
  }
  // Format the lyrics for better readability (e.g., split into lines, add line breaks)
  const formattedLyrics = lyrics.replace(/\n{2,}/g, '\n\n');
  return formattedLyrics;
}

// Function to fetch and display lyrics for a song
async function getLyrics(songTitle, artist) {
  let lyrics = await fetchLyricsFromGenius(songTitle);
  if (!lyrics) {
    lyrics = await fetchLyricsFromLyricsFinder(songTitle, artist);
  }
  return displayLyrics(lyrics);
}

// Example usage in a command handler
client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!lyrics')) {
    const songTitle = message.content.split('!lyrics ')[1];
    const artist = message.content.split('!lyrics ')[2]; // Optional: Get artist from the command

    const lyrics = await getLyrics(songTitle, artist);

    message.channel.send(lyrics);
  }
});

// ... (Rest of the Discord bot code)

client.login('YOUR_DISCORD_BOT_TOKEN');
```

This code snippet implements the `lyricsDisplay.js` file as requested, encompassing the functionality to fetch and display lyrics for songs in real-time. It leverages the `genius-lyrics-api` library for Genius API interaction and `lyrics-finder` for searching and retrieving lyrics. It incorporates error handling for API calls and includes example usage within a Discord command handler. Ensure you replace the placeholders for `GENIUS_ACCESS_TOKEN` and `YOUR_DISCORD_BOT_TOKEN` with your actual API keys and bot token for this code to function correctly.
