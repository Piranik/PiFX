var spi = require('spi'),
RPixel = require('raspberrypixels'),
Throb = require('./ThrobClass');
var Pixel = RPixel.Pixel;

var numPixels = 11;

var device	= new spi.Spi('/dev/spidev0.0', function(){});
var pixels 	= new RPixel.PixelBuffer(device, 11);
//---------------------------------------------------------
//Do stuff in here

var behavior = 
{ 	
	"dormant": {
		"animation": false,
		"color":{
			"r": 255,
			"g": 180,
			"b": 90
		}
	},
	"active": {
		"animation": true,
		"time": 1000,
		"fluid": true,
		"begin":{
			"color":{
				"r": 255,
				"g": 200,
				"b": 5
			}
		},
		"end": {
			"color":{
				"r": 0,
				"g": 0,
				"b": 0
			}
		}
	}
}

var throb = new Throb(behavior.active);
throb.start(pixels);

// throb.onFinished(function(){

// };

