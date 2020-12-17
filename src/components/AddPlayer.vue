<template>
	<div class="modal" v-shortkey.avoid>
		<div class="modal-background"></div>
		<div class="modal-card">
			<header class="modal-card-head">
				<p class="modal-card-title" v-if="isShowingColorPicker">
					Pick a color for
					{{ newPlayerName ? newPlayerName : `player ${players.length + 1}` }}
				</p>
				<p class="modal-card-title" v-else>Add players</p>
			</header>
			<section class="modal-card-body" v-if="isShowingColorPicker">
				<color-picker @colorPicked="changePlayerColor"></color-picker>
			</section>
			<section class="modal-card-body" v-else>
				<div class="added">
					<span v-for="(player, index) in players" :key="index" class="tag"
						:style=" { 'background-color': player.color, color: textColor(player.color) }">
						{{ player.name }}
					</span>
				</div>
				<div class="container" v-if="players.length < 20"
					style="margin-top: 1em;">
					<form @submit.prevent="addNewPlayer" class="form">
						<div class="field has-addons">
							<div class="control">
								<a class="button" @click="toggleColorPicker"
									:style="{ 'background-color': currentColor, color: textColor(currentColor) }">
									Color
								</a>
							</div>
							<div class="control is-expanded">
								<input v-model="newPlayerName" class="input" type="text"
									placeholder="Enter a new player here"
									v-shortkey.avoid />
							</div>
							<div class="control">
								<a class="button" @click="addNewPlayer"
									:disabled="!newPlayerName">
									Add +
								</a>
							</div>
						</div>
					</form>
				</div>
			</section>
			<footer class="modal-card-foot">
				<div class="level">
					<div class="level-right">
						<button class="level-item button is-link" @click="start"
							:disabled="players.length < 1">
							Let's go
						</button>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { textColor } from '@/utils';
import ColorPicker from './ColorPicker';

const colors = [
	'#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#911eb4', '#f58231', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe',
	'#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080',
	'#ffffff', '#000000'
];

export default {
	components: { ColorPicker },
	data() {
		return {
			colors,
			currentColor: '#ffffff',
			isShowingColorPicker: false,
			newPlayerName: '',
		};
	},
	computed: {
		...mapState(['players']),
	},
	created() {
		this.changePlayerColor();
	},
	methods: {
		textColor,
		...mapActions(['addPlayer']),
		addNewPlayer() {
			if (this.newPlayerName) {
				this.addPlayer({
					name: this.newPlayerName,
					color: this.currentColor,
				});
				this.newPlayerName = '';
				this.currentColor = colors[this.players.length];
			}
		},
		toggleColorPicker() {
			this.isShowingColorPicker = !this.isShowingColorPicker;
		},
		start() {
			if (this.newPlayerName) this.addNewPlayer();
			this.$emit('start');
		},
		changePlayerColor(color) {
			this.isShowingColorPicker = false;
			this.currentColor = colors[this.players.length];
			if (color) this.currentColor = color;
		}
	},
};
</script>
