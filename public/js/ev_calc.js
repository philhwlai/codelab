
function exposureValue() {
var aperture = prompt("What's the denominator of the aperture? [i.e. 2.8 rather than 1/2.8]");
var shutter = prompt("What's the denominator of the shutter speed? [i.e. 100 rather than 1/100]");
var iso = prompt("What's the ISO?");
var apertureShift = Math.log(aperture)/Math.log(2);
var shutterShift = Math.log(shutter)/Math.log(2);
var isoShift = Math.log(iso/100)/Math.log(2);
var ev = 0 + apertureShift + shutterShift - isoShift;
return ev;
}
