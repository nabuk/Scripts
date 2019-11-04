// Algorithms
// https://www.rapidtables.com/convert/color/hsv-to-rgb.html
// https://www.tutorialspoint.com/dip/grayscale_to_rgb_conversion.htm

// HTML below
<canvas id="viewport" width="300" height="300"></canvas>


// JS below
// https://www.rapidtables.com/convert/color/hsv-to-rgb.html
// https://www.tutorialspoint.com/dip/grayscale_to_rgb_conversion.htm


var canvas = document.getElementById("viewport"); 
var context = canvas.getContext("2d");

// Define the image dimensions
var width = canvas.width; var height = canvas.height;

// Create an ImageData object
var imagedata = context.createImageData(width, height);

function CxhToRGBp(C, X, H) {
	switch (Math.floor(H / 60)) {
		case 0: return [ C, X, 0 ];
		case 1: return [ X, C, 0 ];
		case 2: return [ 0, C, X ];
		case 3: return [ 0, X, C ];
		case 4: return [ X, 0, C ];
		case 5: return [ C, 0, X ];
	}
}

function RGBpToRGB(RGBp, m) {
	return [RGBp[0] + m, RGBp[1] + m, RGBp[2] + m];
}

function HsvToRgb(H, S, V) {
	var C = V * S;  
	var X = C * (1 - Math.abs(((H / 60) % 2) - 1));
	var m = V - C;
	
	var RGBp = CxhToRGBp(C, X, H);
	var RGB = RGBpToRGB(RGBp, m);
  RGB = [RGB[0] * 256, RGB[1] * 256, RGB[2] * 256];
	return RGB;
}

function RGBtoGray(RGB) {
	return (0.3 * RGB[0]) + (0.59 * RGB[1]) + (0.11 * RGB[2]);
}

function createImage(H, gray) {
  var prec = 256;
  
  for (var x = 0; x < prec; x++) {
    for (var y = 0; y < prec; y++) {

      var pixelindex = ((prec - y) * width + x) * 4;
      var S = x / prec;
      var V = y / prec;

      var rgb = HsvToRgb(H, S, V);
      var actualGray = RGBtoGray(rgb);
      if (Math.abs(gray - actualGray) > 1) {
      	rgb = [0, 0, 0];
      }

      imagedata.data[pixelindex] = rgb[0];     // Red
      imagedata.data[pixelindex+1] = rgb[1]; // Green
      imagedata.data[pixelindex+2] = rgb[2];  // Blue
      imagedata.data[pixelindex+3] = 255;   // Alpha
    }
  }
}

createImage(200, 0xc5);
context.putImageData(imagedata, 0, 0);
