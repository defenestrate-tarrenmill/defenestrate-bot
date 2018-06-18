const RaiderIO = require('./RaiderIOService');
const StatusService = require('./StatusService');
const MemeService = require('./MemeService');
const ImageService = require('./ImageService');
class ChatService {
    constructor(client){
        this._client=client;
        this.raiderIO = new RaiderIO();
        this.status = new StatusService(this._client);
        this.memeService = new MemeService();
        this.imageService = new ImageService();
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
            msg.channel.send('.affix - this weeks m+ affixes!');
            msg.channel.send(".image <smile, heisenberg, female, female_2, hipster, hitman> <url>: e.g. .img hipster http://static4.uk.businessinsider.com/image/5a09a2c1dba1f555008b4ea7-1190-625/all-the-times-boris-johnson-called-for-britain-to-stay-in-the-single-market.jpg");
            msg.channel.send('.gdpr - see my gdpr compliance statement!');
        } else if(msg.content.startsWith('.img')) {
            this.imageService.processMessage(msg);
        }
        else {
          this.memeService.determineMessage(msg);
        }
    }
}
module.exports = ChatService;