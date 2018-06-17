class StatusService {

    constructor(discordClient) {
        this._client = discordClient;
    }

    buildCurrentStatus(msg)
    {
        console.log(msg);
    }

}
module.exports = StatusService;