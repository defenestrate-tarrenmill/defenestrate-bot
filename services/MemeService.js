class MemeService {

    constructor(){}

    determineMessage(msg){
        switch(msg.content) {
            case ".ree":this.postRee(msg);
            break;
            case ".gdpr": this.postGdpr(msg);
        }
    }

    async postGdpr(msg){
        msg.channel.send('https://media.giphy.com/media/oOTTyHRHj0HYY/giphy.gif');
        await this.sleep(2000);
        msg.channel.send('ok...');
        await this.sleep(2000);
        msg.channel.send('I literally store nothing, when you send me something i action it there and then and do nothing else with it...');
    }

    postRee(msg){
        msg.channel.send("@Everyone http://i0.kym-cdn.com/entries/icons/original/000/017/830/b49.gif");
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = MemeService;