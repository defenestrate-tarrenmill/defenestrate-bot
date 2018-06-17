const discord = require('discord.js');
const client = new discord.Client();
const ChatService = require('./services/ChatService');
const chatService = new ChatService(client);


client.on('ready',()=>{
    console.log('defenestrate bot js is online');
});

client.on('message', (message)=>{
    if(message.content.startsWith('.') && message.author.id != client.user.id) {
        chatService.determineMessage(message);
    }
});

client.login(process.env.discord_api);