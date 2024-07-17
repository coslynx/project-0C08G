```javascript
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const fetch = require('node-fetch');
const ytsr = require('ytsr');
const SpotifyWebApi = require('spotify-web-api-node');
const SoundCloud = require('soundcloud-api');
const { promisify } = require('util');

const getVideoInfo = promisify(ytsr.getVideos);
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});
const soundcloud = new SoundCloud({
  clientId: process.env.SOUNDCLOUD_CLIENT_ID,
  clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET,
});

let currentSong = null;
let audioPlayer = null;
let connection = null;

const playMusic = async (songInfo) => {
  try {
    if (!connection) {
      return; // No voice connection available
    }

    currentSong = songInfo;
    audioPlayer = createAudioPlayer();

    // Handle different audio sources
    let audioResource;
    if (currentSong.source === 'youtube') {
      const stream = ytdl(currentSong.url, { filter: 'audioonly' });
      audioResource = createAudioResource(stream, { inputType: StreamType.Opus });
    } else if (currentSong.source === 'spotify') {
      const response = await spotifyApi.getAudioFeaturesForTrack(currentSong.spotifyId);
      const audioUrl = response.body.external_urls.spotify;
      audioResource = createAudioResource(audioUrl, { inputType: StreamType.Opus });
    } else if (currentSong.source === 'soundcloud') {
      const response = await soundcloud.get('/tracks/' + currentSong.soundcloudId);
      const audioUrl = response.body.stream_url;
      audioResource = createAudioResource(audioUrl, { inputType: StreamType.Opus });
    }

    audioPlayer.play(audioResource);

    // Handle playback events
    audioPlayer.on(AudioPlayerStatus.Playing, () => {
      console.log(`Now playing: ${currentSong.title}`);
    });

    audioPlayer.on(AudioPlayerStatus.AutoPaused, () => {
      console.log('Audio player auto-paused');
    });

    audioPlayer.on(AudioPlayerStatus.Idle, () => {
      console.log('Audio player idle');
      // Handle queue management here
    });

    audioPlayer.on('error', (error) => {
      console.error(`Audio player error: ${error}`);
    });

    // Connect the audio player to the voice connection
    connection.subscribe(audioPlayer);

  } catch (error) {
    console.error(`Error playing music: ${error}`);
  }
};

const stopMusic = () => {
  try {
    if (audioPlayer) {
      audioPlayer.stop();
    }
  } catch (error) {
    console.error(`Error stopping music: ${error}`);
  }
};

const pauseMusic = () => {
  try {
    if (audioPlayer) {
      audioPlayer.pause();
    }
  } catch (error) {
    console.error(`Error pausing music: ${error}`);
  }
};

const resumeMusic = () => {
  try {
    if (audioPlayer) {
      audioPlayer.unpause();
    }
  } catch (error) {
    console.error(`Error resuming music: ${error}`);
  }
};

const setVolume = (volumeLevel) => {
  try {
    if (audioPlayer) {
      audioPlayer.volume = volumeLevel;
    }
  } catch (error) {
    console.error(`Error setting volume: ${error}`);
  }
};

const joinVoiceChannel = async (channelID) => {
  try {
    connection = joinVoiceChannel({
      channelId: channelID,
      guildId: channelID.guild.id,
      adapterCreator: channelID.guild.voiceAdapterCreator,
    });
  } catch (error) {
    console.error(`Error joining voice channel: ${error}`);
  }
};

module.exports = {
  playMusic,
  stopMusic,
  pauseMusic,
  resumeMusic,
  setVolume,
  joinVoiceChannel,
};

```