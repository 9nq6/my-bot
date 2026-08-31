const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// 1. إنشاء خادم سيرفر وهمي لإبقاء Render شغال 24/7 ومنع الـ Timeout
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.write('Bot is online 24/7!');
    res.end();
}).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// 2. إعدادات البوت والـ Intents المطلوبة
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// 3. عند تشغيل البوت ودخوله للروم الصوتي
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    const channelId = process.env.VOICE_CHANNEL_ID;
    const guild = client.guilds.cache.first();

    if (guild && channelId) {
        try {
            joinVoiceChannel({
                channelId: channelId,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false
            });
            console.log('Joined voice channel successfully!');
        } catch (error) {
            console.error('Error joining voice channel:', error);
        }
    } else {
        console.log('Voice channel ID or Guild not found.');
    }
});

// 4. تسجيل الدخول باستخدام التوكين
client.login(process.env.DISCORD_TOKEN);
