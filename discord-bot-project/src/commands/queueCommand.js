```javascript
const { SlashCommandBuilder } = require('discord.js');
const { getSongInfo, addToQueue } = require('../modules/musicPlayer');
const { displayQueue } = require('../modules/queueManager');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Adds a song to the queue')
    .addStringOption(option =>
      option.setName('song')
        .setDescription('The song to add to the queue')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const songQuery = interaction.options.getString('song');
      const songInfo = await getSongInfo(songQuery);
      addToQueue(songInfo);
      await interaction.reply(`Added **${songInfo.title}** to the queue.`);
      displayQueue(interaction); // Display the updated queue
    } catch (error) {
      console.error('Error executing queue command:', error);
      await interaction.reply('Failed to add song to the queue.');
    }
  },
};
```