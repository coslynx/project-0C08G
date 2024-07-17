```javascript
const { Client, Intents } = require('discord.js');
const { parseCommand } = require('./commandParser');
const { playMusic } = require('./musicPlayer');
const { addToQueue } = require('./queueManager');
const { joinVoiceChannel } = require('./voiceChannelIntegration');
const { fetchLyrics } = require('./lyricDisplay');
const { checkPermissions } = require('./permissionsHandler');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Ignore messages from bots

  const command = parseCommand(message.content);
  if (!command) return; // No command found

  // Check permissions if needed
  const hasPermissions = checkPermissions(message.member, command.name);
  if (!hasPermissions) {
    message.reply('You do not have permission to use this command.');
    return;
  }

  // Handle different commands
  switch (command.name) {
    case 'play':
      if (!message.member.voice.channel) {
        message.reply('You must be in a voice channel to use this command.');
        return;
      }
      try {
        const songInfo = await playMusic(command.args.join(' '), message.member.voice.channel);
        if (songInfo) {
          message.reply(`Now playing: ${songInfo.title}`);
          // Optionally fetch and display lyrics:
          const lyrics = await fetchLyrics(songInfo.title);
          if (lyrics) {
            message.channel.send(`Lyrics: ${lyrics}`);
          }
        } else {
          message.reply('Could not find the requested song.');
        }
      } catch (error) {
        console.error('Error playing music:', error);
        message.reply('An error occurred while playing the song.');
      }
      break;

    case 'queue':
      if (!message.member.voice.channel) {
        message.reply('You must be in a voice channel to use this command.');
        return;
      }
      try {
        const songInfo = await addToQueue(command.args.join(' '), message.member.voice.channel);
        if (songInfo) {
          message.reply(`Added to queue: ${songInfo.title}`);
        } else {
          message.reply('Could not find the requested song.');
        }
      } catch (error) {
        console.error('Error adding to queue:', error);
        message.reply('An error occurred while adding to the queue.');
      }
      break;

    case 'join':
      if (!message.member.voice.channel) {
        message.reply('You must be in a voice channel to use this command.');
        return;
      }
      try {
        await joinVoiceChannel(message.member.voice.channel);
        message.reply(`Joined voice channel: ${message.member.voice.channel.name}`);
      } catch (error) {
        console.error('Error joining voice channel:', error);
        message.reply('An error occurred while joining the voice channel.');
      }
      break;

    // Add more command cases here (e.g., skip, stop, pause, resume, volume, etc.)
    // ...

    default:
      message.reply('Invalid command. Please use one of the following commands: play, queue, join, skip, stop, pause, resume, volume, lyrics.');
      break;
  }
});

// Handle voice channel join/leave events if needed
client.on('voiceStateUpdate', (oldState, newState) => {
  // Logic for handling voice channel join/leave events (e.g., auto-play, auto-stop)
  // ...
});

// Bot token should be stored in a .env file for security
require('dotenv').config();
client.login(process.env.DISCORD_TOKEN);
```