function textColor(hexColor) {
	const rgbArray = hexToRgb(hexColor);
	// http://www.w3.org/TR/AERT#color-contrast
	const o = Math.round(((parseInt(rgbArray[0], 10) * 299) +
		(parseInt(rgbArray[1], 10) * 587) +
		(parseInt(rgbArray[2], 10) * 114)) / 1000);
	const foreground = (o > 125) ? 'black' : 'white';
	return foreground;
}

function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : [0, 0, 0];
}

export { textColor };
