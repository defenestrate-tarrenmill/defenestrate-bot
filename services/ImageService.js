let faceapp = require('faceapp')
let superagent = require('superagent')
let imgurUploader = require('imgur-uploader');

class ImageService {
    constructor(){
        this.allowed = ['smile', 'heisenberg', 'female', 'female_2', 'hipster', 'hitman'];
    }
    processMessage(msg){
        let content = msg.content;
        content = content.split(' ');
        if(content.length != 3) {
            msg.reply('Could not process image command');
            return;
        } else {
            if(!content[2] || !content[2].startsWith('http')) {
                msg.channel.send('.img <smile, female, female_2, hipster, heisenberg> <url>');
                return;
            } else {
                if(this.allowed.includes(content[1])) {
                    this.processImage(content[2], content[1], msg);
                } else {
                    msg.channel.send('.img <smile, female, female_2, hipster, heisenberg> <url>');
                    return;
                }
            }
        }
        
    }
    async processImage(link,filter, msg){
        msg.channel.send('processing...');
        let { body } = await superagent.get(link);
        if(!Buffer.isBuffer(body)) {
            msg.channel.send('a problem occurred retrieving your image, please make sure not to use shortened URLs');
            return;
        }
        let image = await faceapp.process(body, filter).catch((error)=>{
            msg.channel.send('An error occurred talking to AI Agent');
            msg.channel.send(error.message);
        });
        console.log('recieved our image back!');
        if (image != 'undefined') {
            let ramdomTitle = Math.random().toString(36).substring(7);
            imgurUploader(image, {title: ramdomTitle}).then(data => {
                msg.channel.send(data.link)
            });
        }
        else{
            msg.reply('a problem occurred whilst trying to process the image!');
        }
    }
}
// 
// }
module.exports = ImageService;