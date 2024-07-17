```javascript
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

// Function to retrieve all roles for a server
function getRoles(serverID) {
  try {
    const server = client.guilds.cache.get(serverID);
    if (server) {
      return server.roles.cache.array();
    } else {
      throw new Error(`Server with ID ${serverID} not found.`);
    }
  } catch (error) {
    console.error(`Error retrieving roles for server ${serverID}: ${error.message}`);
    return null;
  }
}

// Function to retrieve permissions for a member
function getPermissions(member) {
  try {
    if (member) {
      return member.permissions.toArray();
    } else {
      throw new Error(`Member not found.`);
    }
  } catch (error) {
    console.error(`Error retrieving permissions for member: ${error.message}`);
    return null;
  }
}

// Function to create a new channel on a server
function createChannel(serverID, channelName, channelType) {
  try {
    const server = client.guilds.cache.get(serverID);
    if (server) {
      return server.channels.create(channelName, { type: channelType });
    } else {
      throw new Error(`Server with ID ${serverID} not found.`);
    }
  } catch (error) {
    console.error(`Error creating channel on server ${serverID}: ${error.message}`);
    return null;
  }
}

// Function to delete a channel
function deleteChannel(channelID) {
  try {
    const channel = client.channels.cache.get(channelID);
    if (channel) {
      return channel.delete();
    } else {
      throw new Error(`Channel with ID ${channelID} not found.`);
    }
  } catch (error) {
    console.error(`Error deleting channel with ID ${channelID}: ${error.message}`);
    return null;
  }
}

module.exports = {
  getRoles,
  getPermissions,
  createChannel,
  deleteChannel,
};
```