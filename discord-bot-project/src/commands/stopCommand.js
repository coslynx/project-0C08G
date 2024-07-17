```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current song and clears the queue.'),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guild.id);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing!', ephemeral: true });
    }

    try {
      queue.stop();
      await interaction.reply({ content: 'Music stopped and the queue cleared!' });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while stopping the music.', ephemeral: true });
    }
  },
};
```