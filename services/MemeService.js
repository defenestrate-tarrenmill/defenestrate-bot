class MemeService {

    constructor(){}

    determineMessage(msg){
        switch(msg.content) {
            case ".ree":this.postRee(msg);
        }
    }

    postRee(msg){
        msg.channel.send("@Everyone http://i0.kym-cdn.com/entries/icons/original/000/017/830/b49.gif");
    }
}

module.exports = MemeService;