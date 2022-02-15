const fs = require('fs');
const path = require('path');

module.exports = {
    getDelaySaved(){
        let rawData = fs.readFileSync(path.resolve(`__dirname/../config/`, 'delay.json'));
        let delay = JSON.parse(rawData);
        return delay.value;
    },
    alteraDelay(novoDelay){
        let delay = { 
            "value": novoDelay
        };
         
        fs.writeFileSync(path.resolve(`__dirname/../config/`, 'delay.json'), JSON.stringify(delay));
    }
}