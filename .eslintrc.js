module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/essential',
		// "@vue/prettier",
		'digitalcomet/vue',
	],
	rules: {
		'no-console': 0,
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: [1, 'tab'],
		'no-mixed-spaces-and-tabs': 0,
		'vue/html-closing-bracket-newline': 0,
		'vue/singleline-html-element-content-newline': 0,
		'vue/no-v-html': 0,
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
