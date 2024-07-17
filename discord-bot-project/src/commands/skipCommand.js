```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.'),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'There is no song playing in this server.', ephemeral: true });
    }
    queue.skip();
    await interaction.reply({ content: 'Skipped the current song.' });
  },
};

```