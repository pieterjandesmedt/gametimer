<template>
	<div class="player tile"
		:class="player.isActive ? 'active': 'inactive'"
		:style="{ 'background-color': player.color, color: textColor(player.color) }">
		<div class="tile columns is-mobile">
			<div class="column is-size-3-desktop is-size-4-tablet is-size-5-mobile">
				{{ player.name }}
			</div>
			<div
				class="column has-text-centered is-size-3-desktop is-size-4-tablet is-size-5-mobile">
				{{ player.totalTimeMs | formatDuration }}
			</div>
			<div class="column has-text-right is-size-3-desktop is-size-4-tablet is-size-5-mobile">
				{{ (player.totalTimeMs / allPlayerTime || 0) | formatPercentage }}
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { textColor } from '@/utils';
import { formatDuration, formatPercentage } from '@/filters';

export default {
	filters: { formatDuration, formatPercentage },
	props: {
		player: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			spBarStyles4: {
				fill: '#fff'
			},
		};
	},
	computed: {
		...mapState(['players']),
		...mapGetters(['allPlayerTime']),
	},
	methods: {
		durations(times) {
			return times.map(t => (t.end ? t.end - t.start : Date.now() - t.start));
		},
		textColor
	},
};
</script>

<style>
</style>
