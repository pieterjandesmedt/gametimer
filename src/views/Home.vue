<template>
	<div class="is-relative">
		<div class="timers" v-touch:tap="next" v-touch:longtap="toggleState"
			v-shortkey.once="keys" @shortkey="handleKeys">
			<draggable tag="div" class="player-list tile is-ancestor is-marginless"
				v-model="playerList" @start="isDragging = true" @end="isDragging = false"
				v-bind="dragOptions">
				<transition-group type="transition"
					:name="!isDragging ? 'flip-list' : null">
					<player v-for="player in playerList" :key="player.id"
						:player="player"></player>
				</transition-group>
			</draggable>
		</div>
		<add-player :class="{ 'is-active': isShowingModal }" @start="start"></add-player>
		<pause-notification v-if="isPaused"></pause-notification>
		<button class="button pause-button is-rounded is-large" @click="toggleState">
			<span class="icon">||</span>
		</button>
	</div>
</template>

<style>
</style>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import draggable from 'vuedraggable';
import AddPlayer from '@/components/AddPlayer';
import Player from '@/components/Player';
import PauseNotification from '@/components/PauseNotification';
import { textColor } from '@/utils';

export default {
	components: {
		draggable, AddPlayer, Player, PauseNotification
	},
	data() {
		return {
			isDragging: false,
			isPaused: true,
			isShowingModal: true,
			isShowingColorPicker: false,
			interval: null,
			turn: 0,
			keys: {
				pause: ['esc'],
				next: ['space'],
			},
		};
	},
	computed: {
		...mapState(['players']),
		...mapGetters(['activePlayer']),
		playerList: {
			get() {
				return this.players;
			},
			set(value) {
				this.updatePlayers(value);
			}
		},
		dragOptions() {
			return {
				animation: 200,
				disabled: !this.isPaused,
				ghostClass: 'ghost'
			};
		}
	},
	mounted() {
		this.interval = setInterval(this.updateCurrentTimes, 1000);
	},
	destroyed() {
		clearInterval(this.interval);
	},
	methods: {
		textColor,
		...mapActions(['updatePlayers', 'setActivePlayerStart', 'setActivePlayerEnd', 'setNextPlayerActive', 'updateActivePlayerTotalTimeMs']),
		updateCurrentTimes() {
			if (this.isPaused) return;
			this.updateActivePlayerTotalTimeMs();
		},
		handleKeys(ev) {
			console.log('key pressed:', ev.srcKey);
			if (ev.srcKey === 'pause') this.toggleState();
			if (ev.srcKey === 'next') {
				if (this.isPaused) {
					this.toggleState();
				 } else {
					this.next();
				 }
			}
		},
		toggleState() {
			if (!this.activePlayer) {
				this.next();
			} else {
				const unfinishedInterval = this.activePlayer.times.find(t => !t.end);
				if (unfinishedInterval) {
					this.isPaused = true;
					this.setActivePlayerEnd();
				} else {
					this.isPaused = false;
					this.setActivePlayerStart();
				}
			}
		},
		next() {
			this.isPaused = false;
			this.setActivePlayerEnd();
			this.setNextPlayerActive();
			this.setActivePlayerStart();
		},
		start() {
			this.isShowingModal = false;
			this.isPaused = true;
		},
	}
};
</script>

<style lang="scss" scoped>
	.pause-button {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		.icon {
			font-weight: bold;
		}
	}
	.player-list {
		display: flex;
		height: 100vh;
		flex-direction: column;
		position: relative;
		> span {
			display: flex;
			height: 100vh;
			flex-direction: column;
			position: relative;
		}
		.player {
			padding: 0.75em;
			&.inactive {
				opacity: 0.25;
			}
		}
	}
	.no-margin-bottom {
		margin-bottom: 0;
	}
	.flip-list-move {
		transition: transform 0.5s;
	}
	.no-move {
		transition: transform 0s;
	}
	.ghost {
		background: white !important;
		color: white !important;
	}
	.list-group {
		min-height: 20px;
	}
	.list-group-item {
		cursor: move;
	}
	.list-group-item i {
		cursor: pointer;
	}
</style>
