const discord = require('discord.js');
const client = new discord.Client();
const ChatService = require('./services/ChatService');
const chatService = new ChatService(client);


client.on('ready',()=>{
    console.log('defenestrate bot js is online');
});

client.on('message', (message)=>{
    if(message.content.startsWith('.') && message.author.id != client.user.id) {
        try {
        chatService.determineMessage(message);
        } catch(err) {
            console.log(err);
            message.reply('something went wrong!');
        }
    }
});

client.login(process.env.discord_api);