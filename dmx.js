var fs = require("fs")
var { ArtNetController } = require('artnet-protocol/dist')
var { ArtDmx } = require('artnet-protocol/dist/protocol')

const controller = new ArtNetController();
controller.bind('2.0.0.30');
// The controller is now listening and responding to discovery traffic

// Send DMX data (Sequence 0, Physical port 0, Universe 0.
//controller.sendBroadcastPacket(new ArtDmx(0, 0, 0, [255, 0, 0]));

// Or if you want to receive DMX data
controller.on('dmx', (dmx) => {
    // dmx contains an ArtDmx object
    
    if (dmx.universe == 0)
    {
        console.log(dmx.universe, dmx.data);

        fs.writeFileSync("./views/index.ejs", JSON.stringify({[dmx.universe]: dmx.data}) );
    }
});