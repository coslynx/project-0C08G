```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the currently playing music.'),
  async execute(interaction) {
    const musicPlayer = interaction.client.musicPlayer;
    const queue = musicPlayer.queue;
    const guild = interaction.guild;

    if (!queue) {
      await interaction.reply({ content: 'There is no music currently playing.', ephemeral: true });
      return;
    }

    const voiceChannel = guild.members.cache.get(interaction.user.id).voice.channel;

    if (!voiceChannel) {
      await interaction.reply({ content: 'You need to be in a voice channel to use this command.', ephemeral: true });
      return;
    }

    if (musicPlayer.isPlaying) {
      musicPlayer.pauseMusic();
      await interaction.reply({ content: 'Music paused!' });
    } else {
      await interaction.reply({ content: 'Music is already paused.', ephemeral: true });
    }
  },
};

```