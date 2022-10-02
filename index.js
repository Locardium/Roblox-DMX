const express = require('express');
const app = express();
const { ArtNetController } = require('artnet-protocol/dist')
//const Config = require("./Config.json");
const { json } = require('body-parser');
const fs = require('fs')

function Sleep(milliseconds) 
{
    const date = Date.now();
    let currentDate = null;
    
    do 
    {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function setTerminalTitle(title)
{
    process.stdout.write(
        String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7)
    );
}

setTerminalTitle("Roblox DMX by Locos")

//Config
var Config
const path = "./Config.json"

if (fs.existsSync(path))
{
    var Data = fs.readFileSync(path, 'utf8')
    Config = JSON.parse(Data)
}
else
{
    console.log("Config File not exits.")
    Sleep(5000);
    process.exit(1);;
}

// settings
app.set('port', Config.ServerPort);

// listening the Server
app.listen(app.get('port'), () => {
    console.log('Server started on port', app.get('port'));
});

//DMX
const controller = new ArtNetController();
controller.bind(Config['Art-Net_IP']);
var DMX = []

controller.on('dmx', (dmx) => {
    DMX[dmx.universe] = dmx.data
});

app.get('/', (req, res) => {
    res.send(DMX)
});