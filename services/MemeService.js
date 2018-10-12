class MemeService {

    constructor(){}

    determineMessage(msg){
        switch(msg.content) {
            case ".ree":this.postRee(msg,0);
            break;
            case ".reee":this.postRee(msg,1);
            break;
            case ".reeee":this.postRee(msg,2);
            break;
            case '.blyat':this.blat(msg);
            break;
            case '.fuckyou': this.fuckyou(msg);
            break;
            case '.rulebritannia': this.rulebritannia(msg);
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

    rulebritannia(msg) {
        msg.channel.send('http://defenestrate.000webhostapp.com/imgs/britain.webm');
    }

    fuckyou(msg){
        let items = ['http://defenestrate.000webhostapp.com/imgs/fuckyou.webm','http://defenestrate.000webhostapp.com/imgs/fuckyou_two.jpg'];
        let item = items[Math.floor(Math.random()*items.length)];
        msg.channel.send(item);
    }

    blat(msg) {
        let items = ['http://defenestrate.000webhostapp.com/imgs/blyaaat.webm','http://defenestrate.000webhostapp.com/imgs/blyat.png'];
        let item = items[Math.floor(Math.random()*items.length)];
        msg.channel.send(item);
    }

    postRee(msg,idx){
        let ree_list = ['http://defenestrate.000webhostapp.com/imgs/a.gif','http://defenestrate.000webhostapp.com/imgs/b.gif','http://defenestrate.000webhostapp.com/imgs/c.gif'];
        msg.channel.send(ree_list[idx], {'disableEveryone':false});
    }
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

module.exports = MemeService;