import Vue from 'vue';
import Vuex from 'vuex';
import cuid from 'cuid';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		players: []
	},
	getters: {
		activePlayer: state => state.players.find(p => p.isActive),
		allPlayerTime: state => state.players.map(p => p.totalTimeMs).reduce((p, c) => p + c, 0),
	},
	mutations: {
		addPlayer(state, payload) {
			state.players.push({
				name: payload.name,
				times: [],
				isActive: false,
				totalTimeMs: 0,
				id: cuid(),
				color: payload.color,
			});
		},
		updatePlayers(state, payload) {
			state.players = payload;
		},
		setActivePlayerStart(state) {
			const activePlayerIndex = state.players.findIndex(p => p.isActive);
			if (activePlayerIndex !== -1) {
				const activePlayer = Object.assign({}, state.players[activePlayerIndex]);
				activePlayer.times.push({
					start: Date.now(),
				});
				state.players.splice(activePlayerIndex, 1, activePlayer);
			}
		},
		setActivePlayerEnd(state) {
			const activePlayerIndex = state.players.findIndex(p => p.isActive);
			if (activePlayerIndex !== -1) {
				const activePlayer = Object.assign({}, state.players[activePlayerIndex]);
				const time = activePlayer.times.find(t => !t.end);
				if (time) {
					time.end = Date.now();
				}
				const finishedIntervalsMs = activePlayer.times
					.filter(t => t.end)
					.reduce((prev, curr) => prev + curr.end - curr.start, 0);
				activePlayer.totalTimeMs = finishedIntervalsMs;
				state.players.splice(activePlayerIndex, 1, activePlayer);
			}
		},
		setNextPlayerActive(state) {
			const activePlayerIndex = state.players.findIndex(p => p.isActive);
			if (activePlayerIndex !== -1) {
				const activePlayer = Object.assign({}, state.players[activePlayerIndex]);
				activePlayer.isActive = false;
				state.players.splice(activePlayerIndex, 1, activePlayer);
			}

			const nextPlayerIndex = (activePlayerIndex + 1) % state.players.length;
			const nextPlayer = Object.assign({}, state.players[nextPlayerIndex]);
			nextPlayer.isActive = true;
			state.players.splice(nextPlayerIndex, 1, nextPlayer);
		},
		updateActivePlayerTotalTimeMs(state) {
			const activePlayerIndex = state.players.findIndex(p => p.isActive);
			if (activePlayerIndex !== -1) {
				const activePlayer = Object.assign({}, state.players[activePlayerIndex]);

				const finishedIntervalsMs = activePlayer.times
					.filter(t => t.end)
					.reduce((prev, curr) => prev + curr.end - curr.start, 0);
				let currentIntervalMs = 0;
				const unfinishedInterval = activePlayer.times.find(t => !t.end);
				if (unfinishedInterval) {
					currentIntervalMs = Date.now() - unfinishedInterval.start;
				}
				activePlayer.totalTimeMs = finishedIntervalsMs + currentIntervalMs;
				state.players.splice(activePlayerIndex, 1, activePlayer);
			}
		}
	},
	actions: {
		addPlayer({ commit }, payload) {
			console.log('addPlayer:', payload);
			commit('addPlayer', payload);
		},
		updatePlayers({ commit }, payload) {
			console.log('updatePlayers:', payload);
			commit('updatePlayers', payload);
		},
		setActivePlayerStart({ commit }) {
			console.log('setActivePlayerStart');
			commit('setActivePlayerStart');
		},
		setActivePlayerEnd({ commit }) {
			console.log('setActivePlayerEnd');
			commit('setActivePlayerEnd');
		},
		setNextPlayerActive({ commit }) {
			console.log('setNextPlayerActive');
			commit('setNextPlayerActive');
		},
		updateActivePlayerTotalTimeMs({ commit }) {
			console.log('updateActivePlayerTotalTimeMs');
			commit('updateActivePlayerTotalTimeMs');
		},
	}
});
