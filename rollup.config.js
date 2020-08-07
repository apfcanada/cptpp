import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
	input: 'main.js',
	output: {
		file: 'bundle.js',
		format: 'umd'
	},
	plugins: [ 
		resolve(), 
		commonjs() 
	],
	onwarn: function (warning, warn) {
		if (warning.code === 'CIRCULAR_DEPENDENCY') return;
		warn(warning);
	}
};
