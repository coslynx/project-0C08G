# Discord Music Bot

This is a Discord bot designed to enhance your server experience with music playback, queue management, and more. 

## Features

- **Music Playback:**  Play music from YouTube, Spotify, and SoundCloud.
- **Queue Management:**  Add, remove, skip, and display songs in the queue.
- **Playlist Management:**  Create, save, load, edit, and delete playlists.
- **Lyrics Display:**  Real-time display of lyrics.
- **Customization Options:**  Adjust bot responses, commands, and audio settings.
- **Server Integration:**  Manage roles, permissions, and channels. 

## Installation

1. **Install Node.js and npm:** Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
2. **Clone the Repository:**  Use Git to clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/discord-bot-project.git
   ```
3. **Navigate to the Project Directory:**
   ```bash
   cd discord-bot-project
   ```
4. **Install Dependencies:**
   ```bash
   npm install
   ```
5. **Create a `.env` file:**  Create a file named `.env` in the root directory and add the following environment variables (replace with your actual values):
   ```
   DISCORD_TOKEN=your_discord_bot_token
   YOUTUBE_API_KEY=your_youtube_api_key
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   SOUNDCLOUD_CLIENT_ID=your_soundcloud_client_id
   SOUNDCLOUD_CLIENT_SECRET=your_soundcloud_client_secret
   GENIUS_API_KEY=your_genius_api_key
   MONGODB_URI=your_mongodb_connection_string 
   ```
   **Note:** Replace placeholders with your actual API keys and connection strings. You can obtain these from the respective API documentation pages.
6. **Start the Bot:**
   ```bash
   npm start
   ```

## Usage

**Commands:**

- **`!play [song name/URL]`:** Plays a song from YouTube, Spotify, or SoundCloud.
- **`!queue [song name/URL]`:**  Adds a song to the queue.
- **`!skip`:** Skips to the next song in the queue.
- **`!stop`:**  Stops music playback and clears the queue.
- **`!pause`:** Pauses the current song.
- **`!resume`:** Resumes playback of a paused song.
- **`!volume [level (0-100)]`:** Sets the volume level.
- **`!lyrics`:**  Displays the lyrics for the currently playing song.
- **`!playlist [command]`:**  
    - `!playlist create [playlist name]` : Creates a new playlist.
    - `!playlist add [playlist name] [song name/URL]` : Adds a song to a playlist.
    - `!playlist save [playlist name]` : Saves a playlist.
    - `!playlist load [playlist name]` : Loads a playlist.
    - `!playlist delete [playlist name]` : Deletes a playlist.
    - `!playlist edit [playlist name]` : Edits a playlist.

**Configuration:**

You can customize bot responses, commands, and audio settings by modifying the configuration files:
- `.env`:  For global bot configuration.
- `.env.local`: For local development settings.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any suggestions or bug reports.

## License

This project is licensed under the MIT License.
