import resolve from 'rollup-plugin-node-resolve';

module.exports = {
	input: 'src/index.js',
	output: {
		file: 'public/index.js',
		format: 'iife'
	},
	plugins: [
		resolve()
	]
}