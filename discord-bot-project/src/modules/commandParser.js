```javascript
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const parseCommand = (messageContent) => {
  const argv = yargs(hideBin(process.argv))
    .command('play [query]', 'Plays a song')
    .command('queue [query]', 'Adds a song to the queue')
    .command('skip', 'Skips to the next song in the queue')
    .command('stop', 'Stops music playback and clears the queue')
    .command('pause', 'Pauses the current song')
    .command('resume', 'Resumes playback of the paused song')
    .command('volume [level]', 'Sets the volume level')
    .command('lyrics', 'Displays lyrics for the current song')
    .help()
    .argv;

  // Check if the message starts with the command prefix
  if (messageContent.startsWith('!')) {
    // Extract the command and arguments
    const command = messageContent.split(' ')[0].substring(1);
    const args = messageContent.split(' ').slice(1);

    // Return the parsed command and arguments
    return { command, args };
  }

  // Return null if the message does not start with the command prefix
  return null;
};

module.exports = { parseCommand };
```