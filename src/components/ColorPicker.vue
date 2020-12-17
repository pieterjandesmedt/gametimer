<template>
	<div class="grid-container">
		<button v-for="(color, index) in colors" :key="index" class="grid-item color is-button"
			@click="pickColor(color)" :style="{ 'background-color': color }"></button>
	</div>
</template>

<script>
const colors = [
	'#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#911eb4', '#f58231', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
	'#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'
];

export default {
	data() {
		return {
			colors,
		};
	},
	methods: {
		pickColor(color) {
			this.$emit('colorPicked', color);
		}
	}
};
</script>

<style lang="scss">
	.grid-container {
		display: grid;
		grid-gap: 10px;
		grid-template-columns: auto auto auto auto;
	}

	.grid-item.color {
		min-height: 50px;
		border-radius: 5px;
		border: 0;
	}
</style>
