const http = require('request');
const ServiceBase = require('./ServiceBase')
class RaiderIOService extends ServiceBase {
    constructor(){
        super();
    }

    findAppropriateFunction(full_msg)
    {
        const fields = full_msg.content.split(' ');
        if(!fields || fields.length != 5) {
            this.sendHelpToChat(full_msg);
            return;
        }
        let method = null;
        let renderMethod = null; 
        /**
         * Try and determine what the hell we actually have here
         */
        switch(fields[1]) 
        {
            case 'summary':{
                method = this.getMythicPlus;
                renderMethod = this.renderSummary;
            }
            break;
            case 'help': {
                this.sendHelpToChat(full_msg);
                return;
            }
            case 'progression' : {
                method = this.getRaidProgress;
                renderMethod = this.renderProgression;
            }
            break;
            case 'scores' : {
                method = this.getMythicPlusScores;
                renderMethod = this.renderScores;
            }
        }
        if(method === null || renderMethod === null) {
            full_msg.reply('unknown raider command');
            return;
        } else {
            method(this,fields[2], fields[3], fields[4], full_msg, renderMethod);
        }
    }

    getRaidProgress(scope, character, realm, region, msg, responseCallback) {
        const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character}&fields=raid_progression`;
        scope.doRaiderIoCall(url, (data)=>{
            responseCallback(msg,data);
        }, (error)=>{
            msg.channel.send(`Character ${character} not found on ${realm}-${region}`);
        });
    }

    getMythicPlusScores(scope, character, realm, region, msg, responseCallback) {
        const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character}&fields=mythic_plus_scores`;
        scope.doRaiderIoCall(url, (data)=>{
            responseCallback(msg, data);
        }, (error)=>{
            msg.channel.send(`Character ${character} not found on ${realm}-${region}`);
        })

    }

    getMythicPlus(scope,character, realm, region, msg, responseCallback){
        const url = `https://raider.io/api/v1/characters/profile?region=${region}&realm=${realm}&name=${character}&fields=mythic_plus_ranks`;
        scope.doRaiderIoCall(url, (data)=>{
            responseCallback(msg,data);
        }, (error)=>{
            msg.channel.send(`Character ${character} not found on ${realm}-${region}`);
        });
    }
    
    getAffixes(msg) {
        const url = 'https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=en';
        this.doRaiderIoCall(url, (data)=>{
            let field_data = [];
            data.affix_details.forEach((affix)=>{
                field_data.push({
                    "name":affix.name,
                    "value":affix.description
                });
            });
            let embed = 
            {
              "title": data.title,
              "description": `This weeks affixes`,
              "url": data.leaderboard_url,
              "color": 4200161,
              "image": {
                "url": "https://media.giphy.com/media/3o7btT1T9qpQZWhNlK/giphy.gif"
              },
              "fields":field_data
            };
            msg.channel.send({embed});
        }, (err)=>{
            msg.channel.send('Problem communicating with Raider IO');
        });
    }
    
    doRaiderIoCall(url, successCallback, errorCallback) {
        http(url, (error, response, body)=>{
            if(!error && response.statusCode === 200){
                successCallback(JSON.parse(body));
            } else {
                errorCallback(error);
            }
        });
    }

    renderScores(msg, data){
        let field_data = [];
        for(let key in data.mythic_plus_scores){
            field_data.push({
                "name": key,
                "value": ''+data.mythic_plus_scores[key],
                "inline":true
            });
        }

        let embed = 
        {
          "title": data.name,
          "description": `M+ scores of ${data.name}`,
          "url": data.profile_url,
          "color": 4200161,
          "thumbnail": {
            "url": data.thumbnail_url
          },
          "fields":field_data
        };
        msg.channel.send({embed});
    }

    renderProgression(msg, data) {
        let field_data = [];
        /**
         * Dynamically pick up what raids are being returned from the Raider
         * API, then build out out embed data fields.
         */
        for (var key in data.raid_progression) {
            field_data.push({
                "name":key,
                "value":data.raid_progression[key].summary,
                "inline":true
            });
        }
        let embed = 
        {
          "title": data.name,
          "description": `Raid progression of ${data.name}`,
          "url": data.profile_url,
          "color": 4200161,
          "thumbnail": {
            "url": data.thumbnail_url
          },
          "fields":field_data
        };
        msg.channel.send({embed});
    }

    renderSummary(msg, data) {
        let embed = 
              {
                "title": data.name,
                "description": `High level overview of ${data.name}`,
                "url": data.profile_url,
                "color": 4200161,
                "thumbnail": {
                  "url": data.thumbnail_url
                },
                "fields": [
                  {
                    "name": "Class",
                    "value": data.class,
                    "inline": true
                  },
                  {
                    "name": "Active spec",
                    "value": data.active_spec_name,
                    "inline": true
                  },
                  {
                    "name": "World Rank",
                    "value":data.mythic_plus_ranks.overall.world,
                    "inline": true
                  },
                  {
                    "name":"Region Rank",
                    "value":data.mythic_plus_ranks.overall.region,
                    "inline": true
                  },
                  {
                    "name": "Realm Rank",
                    "value":data.mythic_plus_ranks.overall.realm,
                    "inline": true
                  }
                ]
              };
          msg.channel.send({embed});
    }

    sendHelpToChat(msg) {
        let chat = "Available commands: \n\n"
        chat +=  "\n.raider summary <characeter> <realm> <region> - Summary Raider IO information e.g. .raider summary cereuw tarren-mill eu";
        chat +=  "\n.raider progression <characeter> <realm> <region> - Raid progression e.g. .raider progression cereuw tarren-mill eu";
        chat +=  "\n.raider scores <characeter> <realm> <region> - M+ scores e.g. .raider scores cereuw tarren-mill eu";
        chat += "\n"
        msg.channel.send(chat);
    }
}
module.exports=RaiderIOService;