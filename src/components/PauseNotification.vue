<template>
	<div class="notification snackbar">
		<div class="has-text-white">
			<div
				class="paused has-text-centered is-size-3-desktop is-size-4-tablet is-size-5-mobile">
				Paused.
				<span v-if="allPlayerTime > 1000">Play time is
					{{ (allPlayerTime || 0) | formatDuration }}</span>
			</div>
			<div class="has-text-centered">
				<small class="is-hidden-touch">
					<b>space</b>: time next player
					|
					<b>esc</b>: pause
				</small>
				<small class="is-hidden-desktop">
					<b>tap</b>: time next player
					|
					<b>long tap</b>: pause
				</small>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatDuration } from '@/filters';

export default {
	filters: { formatDuration },
	computed: {
		...mapGetters(['allPlayerTime'])
	}
};
</script>

<style>
	.snackbar {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: rgba(0, 0, 0, 0.7);
		width: 80%;
		max-width: 640px;
	}
	.paused {
		text-shadow: 0 0 10px white;
	}
</style>
