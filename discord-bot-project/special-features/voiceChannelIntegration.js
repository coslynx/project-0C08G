```javascript
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const { Client, Intents } = require('discord.js');
const ytdl = require('ytdl-core');
const { getSongInfo } = require('../modules/musicPlayer');
const { queueManager } = require('../modules/queueManager');

module.exports = {
  joinVoiceChannel: async (client, channelID) => {
    try {
      const channel = client.channels.cache.get(channelID);
      if (!channel) {
        console.error(`Voice channel with ID ${channelID} not found.`);
        return;
      }
      const connection = joinVoiceChannel({
        channelId: channelID,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      const player = createAudioPlayer();
      const subscription = connection.subscribe(player);
      return { connection, player, subscription };
    } catch (error) {
      console.error('Error joining voice channel:', error);
    }
  },

  leaveVoiceChannel: (connection) => {
    if (connection) {
      connection.destroy();
    }
  },

  playMusic: async (client, message, songInfo) => {
    const { connection, player, subscription } = await this.joinVoiceChannel(client, message.member.voice.channelId);
    if (songInfo) {
      try {
        const song = await getSongInfo(songInfo);
        const stream = ytdl(song.url, { filter: 'audioonly' });
        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });
        player.play(resource);
        player.on('finish', () => {
          queueManager.skipToNextTrack(client, message);
        });
      } catch (error) {
        console.error('Error playing music:', error);
        message.channel.send(`Error playing music: ${error.message}`);
      }
    } else {
      queueManager.skipToNextTrack(client, message);
    }
  },
};

```