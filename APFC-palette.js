// primary brand colors
export const brand = {
	red:    '#e63539',
	blue:   '#00afe4',
	orange: '#eabd3b',
	peach:  '#ea7369',
	teal:   '#1de4bd',
	violet: '#af4bce'
}

// ordinal color scales
export const ordinal = {
	blackGrey: [ // black -> light grey
		'#000000', '#2b2b2b', '#919aa1',
		'#bbbbbb', '#d4d4d4', '#ececec'
	],
	redYellow: [
		'#2c0708', '#710003', '#c20000',
		brand.red, '#de542c', '#ef7e32', brand.orange,
		'#e7e34e', '#f7f4bf', '#2c0708' 
	],
	blueTeal: [ 
		'#000b2f', '#142459', '#176ba0',
		brand.blue, '#1ac9e6', '#1bd4d4', brand.teal,
		'#6ef0d2', '#c7f9ee', '#000b2f'
	],
	violetPeach: [
		'#191127', '#29066b', '#7d3ac1',
		brand.violet, '#db4cb2', '#eb548c', brand.peach,
		'#f0a58f', '#fceae6', '#fef4f2'
	]
}

// named colours

// use to represent Canada in categorical scales
export const canadaRed = brand.red
// use for "other" values in a categorical scales
export const otherGrey = ordinal.blackGrey[2]
