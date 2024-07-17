```javascript
const { Client, Intents } = require('discord.js');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const ytsr = require('ytsr');
const SpotifyWebApi = require('spotify-web-api-node');
const SoundCloud = require('soundcloud-api');
const { promisify } = require('util');
const retry = require('promise-retry');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES] });

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

const soundcloud = new SoundCloud({
  clientId: process.env.SOUNDCLOUD_CLIENT_ID,
  clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET,
});

const joinVoiceChannel = promisify(client.channels.cache.get('CHANNEL_ID').join);

const getSongInfo = async (query) => {
  try {
    // YouTube Search
    const youtubeResults = await ytsr(query);
    if (youtubeResults.items.length > 0) {
      return {
        source: 'youtube',
        title: youtubeResults.items[0].title,
        url: youtubeResults.items[0].url,
        thumbnail: youtubeResults.items[0].bestThumbnail.url,
      };
    }

    // Spotify Search
    const spotifyResults = await spotifyApi.searchTracks(query);
    if (spotifyResults.body.tracks.items.length > 0) {
      return {
        source: 'spotify',
        title: spotifyResults.body.tracks.items[0].name,
        url: spotifyResults.body.tracks.items[0].external_urls.spotify,
        thumbnail: spotifyResults.body.tracks.items[0].album.images[0].url,
      };
    }

    // SoundCloud Search
    const soundcloudResults = await soundcloud.get('/tracks', { q: query });
    if (soundcloudResults.length > 0) {
      return {
        source: 'soundcloud',
        title: soundcloudResults[0].title,
        url: soundcloudResults[0].permalink_url,
        thumbnail: soundcloudResults[0].artwork_url,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching song information:', error);
    return null;
  }
};

const playMusic = async (songInfo) => {
  try {
    const voiceConnection = await joinVoiceChannel();
    const stream = ytdl(songInfo.url, { filter: 'audioonly' });
    const dispatcher = voiceConnection.play(stream);

    dispatcher.on('finish', () => {
      // Handle queue logic here
    });

    dispatcher.on('error', (error) => {
      console.error('Error playing song:', error);
    });
  } catch (error) {
    console.error('Error playing music:', error);
  }
};

const addToQueue = (songInfo) => {
  // Handle adding song to queue logic here
};

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!play')) {
    const query = message.content.slice(6).trim();
    const songInfo = await getSongInfo(query);

    if (songInfo) {
      await playMusic(songInfo);
      message.reply(`Playing: ${songInfo.title}`);
    } else {
      message.reply('Song not found.');
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
```