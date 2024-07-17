```javascript
const { Queue } = require('discord-player');

class QueueManager {
  constructor() {
    this.queues = new Map();
  }

  createQueue(guildId) {
    const queue = new Queue(guildId);
    this.queues.set(guildId, queue);
    return queue;
  }

  getQueue(guildId) {
    return this.queues.get(guildId);
  }

  deleteQueue(guildId) {
    this.queues.delete(guildId);
  }

  addToQueue(guildId, song) {
    const queue = this.getQueue(guildId);
    if (queue) {
      queue.addTrack(song);
    } else {
      // Handle case where queue doesn't exist (maybe create a new one)
    }
  }

  removeFromQueue(guildId, index) {
    const queue = this.getQueue(guildId);
    if (queue) {
      queue.remove(index);
    } else {
      // Handle case where queue doesn't exist
    }
  }

  skipToNextTrack(guildId) {
    const queue = this.getQueue(guildId);
    if (queue) {
      queue.next();
    } else {
      // Handle case where queue doesn't exist
    }
  }

  displayQueue(guildId) {
    const queue = this.getQueue(guildId);
    if (queue) {
      // Implement logic to display the queue
      // You can use queue.tracks to access the song information
    } else {
      // Handle case where queue doesn't exist
    }
  }
}

module.exports = QueueManager;
```