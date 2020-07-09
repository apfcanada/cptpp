import resolve from '@rollup/plugin-node-resolve';

export default {
	input: 'index.js',
	output: {
		file: 'main.js',
		format: 'cjs'
	},
	plugins: [ resolve() ],
	onwarn: function (warning, warn) {
		if (warning.code === 'CIRCULAR_DEPENDENCY') return;
		warn(warning);
	}
};
