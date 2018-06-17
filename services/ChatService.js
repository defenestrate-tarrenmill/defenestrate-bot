const RaiderIO = require('./RaiderIOService');
const StatusService = require('./StatusService');
const MemeService = require('./MemeService');
class ChatService {
    constructor(client){
        this._client=client;
        this.raiderIO = new RaiderIO();
        this.status = new StatusService(this._client);
        this.memeService = new MemeService();
    }
    returnResponse(msg){
        return 'response';
    }
    determineMessage(msg){
        if(msg.content.startsWith('.raider')) {
          this.raiderIO.findAppropriateFunction(msg);
        } else if(msg.content.startsWith('.status')) {

        } else if(msg.content.startsWith('.affix')){
          this.raiderIO.getAffixes(msg);
        } else if(msg.content.startsWith('.help')){
            this.raiderIO.sendHelpToChat(msg);
            msg.channel.send('.affix - this weeks m+ affixes!')
        } else {
          this.memeService.determineMessage(msg);
        }
    }
}
module.exports = ChatService;