var spi = require('spi'),
RPixel = require('raspberrypixels');
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
				"g": 180,
				"b": 90
			}
		},
		"end": {
			"color":{
				"r": 255,
				"g": 255,
				"b": 255
			}
		}
	}
}

var color = {
	r: 255,
	g: 255,
	b: 255
}

var pixel1 = new Pixel(color);
var pixel2 = new Pixel(color.r, color.g, color.b);

console.log(pixel1);
console.log(pixel2);

//do the active animation and then go to dormant
