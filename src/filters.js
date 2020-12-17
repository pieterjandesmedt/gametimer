export { formatDuration, formatPercentage };

function formatDuration(milliseconds) {
	if (milliseconds < 1000 * 60 * 60) return new Date(milliseconds).toISOString().substr(14, 5);
	return new Date(milliseconds).toISOString().substr(11, 8);
}

function formatPercentage(value) {
	return `${Math.round(value * 100)}%`;
}
