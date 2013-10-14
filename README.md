##WS2801 LED Strip API

This API is used to programmatically control individually addressable [LED strips using WS2801 chips](http://www.adafruit.com/products/306). It uses a modified version of the [node-spi](https://github.com/RussTheAerialist/node-spi) and [RaspberryPixel](https://github.com/andrewmunsell/RaspberryPixels) node modules. For stability and continuity these modified node modules have been pre-packaged in this repo inside of the `node-modules` directory. No need to `npm install`.

##Using the API

Before we can use the API we must include the modules and instantiate the PixelBuffer object (name Pixels in the below example). As long as this repo's node_modules folder is included in your node project directory you can setup the API like this:

```javascript
var spi = require('spi'),
RPixel = require('raspberrypixels');
var Pixel = RPixel.Pixel; //defines the Pixel class

var numPixels = 11;
var deviceName = '/dev/spidev0.0';

var device	= new spi.Spi(deviceName, function(){});
var pixels 	= new RPixel.PixelBuffer(device, numPixels); //instantiates the PixelBuffer class
```

Once you include that stuff in your file you are now ready to use the manipulate the LED strip using the `pixels` methods:

```javascript
var frameRate = 500;

setInterval(randomLights, frameRate);

function randomLights(){

	//pick a random color for each light
	for(var i = 0; i < pixels.length; i++){
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		pixels.setRGB(i, r, g, b);
	}

	//don't forget to send the pixels to the light
	pixels.update();
}
```

##API Reference

There are two basic objects used in this API: The `PixelBuffer` and the `Pixel` objects. 

The `PixelBuffer` object can be thought of as the light itself, as it holds the methods to write rgb values to the LEDs on the strip. Throughout our examples this class will be instantiated under the name `pixels`. 

The `Pixel` class is incredibly straightforward as it holds methods for getting and setting the r, g, b colors as well as HSL of individual LEDs on the LED strip.

###Pixel
####Important Properties
- `Pixel.color` : The pixel's color object. It contains `r`, `g`, `b` properties that hold values 1-255.

####Important Methods

-`Pixel(r, g, b)` is the constructor.
- `Pixel.getRGB()` returns the pixel's color object.
- `Pixel.getHSL()` returns the pixel's color object transformed to hsl.

###Pixel Buffer
####Important Properties

- `PixelBuffer.length`: The number of LEDs on the LED strip.

####Important Methods

- `PixelBuffer(device, numbPixels)` is the constructor. It takes an `SPI.spi` object as its device and the number of LEDs on the LED strip as its `numbPixels`.
- `PixelBuffer.update()` writes the buffer to the LED strip. Don't forget to make call this method because it is the one that actually changes the lights.
- `PixelBuffer.setRGB(i, r, g, b)` sets the `i` pixel in the LED strip to the `r`, `g`, `b` values.
- `PixelBuffer.setHSL(i, h, s, l)` sets the `i` pixel in the LED strip to the `h`, `s`, `l` values.
- `PixelBuffer.setPixel(i, pixel)` sets the `i` pixel in the LED strip to the `pixel`.
- `PixelBuffer.getPixel(i)` returns the `i` pixel in the LED strip as a `Pixel` object.
- `PixelBuffer.fillRGB(r, g, b)` fills the entire pixel strand with a specific RGB color.
- `PixelBuffer.fillRangeRGB(start, end, r, g, b)` fills a specific range of pixels with a specific color. The other pixels are not modified.
- `PixelBuffer.multiplyRGB(r, g, b)` multiplies the RGB values provided onto the pixel buffer.
- `PixelBuffer.blank()` turn the entire pixel strand off.
- `PixelBuffer.get` returns the current buffer.

Remember, after any changes are made using the above PixelBuffer methods you must use `PixelBuffer.update()` to send those changes to the LED strip.

##Examples

Example files can be found in this repo's [example directory](example).

Below is a simple example that randomly changes each LED's color on an 11 LED strip every .5 seconds. 

```javascript

var spi = require('spi'),
RPixel = require('raspberrypixels');
var Pixel = RPixel.Pixel;

var numPixels = 11;

var device	= new spi.Spi('/dev/spidev0.0', function(){});
var pixels 	= new RPixel.PixelBuffer(device, 11);

//---------------------------------------------------------
//Do stuff in here

var frameRate = 500;

setInterval(randomLights, frameRate);

function randomLights(){

	//pick a random color for each light
	for(var i = 0; i < pixels.length; i++){
		var r = Math.floor(Math.random()*255);
		var g = Math.floor(Math.random()*255);
		var b = Math.floor(Math.random()*255);
		pixels.setRGB(i, r, g, b);
	}

	//don't forget to send the pixels to the light
	pixels.update();
}
```

