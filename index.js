const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  const channelId = process.env.VOICE_CHANNEL_ID;
  const channel = client.channels.cache.get(channelId);
  
  if (channel) {
    joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: true
    });
    console.log('Joined voice channel successfully!');
  } else {
    console.log('Voice channel not found.');
  }
});

client.login(process.env.DISCORD_TOKEN);
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is Online!'));
app.listen(process.env.PORT || 3000);
