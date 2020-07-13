import accessibleAutocomplete from 'accessible-autocomplete'
import { csv } from 'd3-fetch'
import { select } from 'd3-selection'

// async call for data
csv('./data/HScodes.csv').then( HScodes => {
	if( ! (
		HScodes.columns.includes('HS6') & 
		HScodes.columns.includes('description')
	) ){ return }
	// add options to the existing dropdown
	let selectEl = select('select#hs6')
	let options = selectEl.selectAll('option').data( HScodes )
	options.enter().append('option')
		.property('value', d => d.HS6.substring(1) )
		.text( d => `${d.HS6.substring(1)} - ${d.description}` )
	options.exit().remove()
	// enable easier, accessible selections
	accessibleAutocomplete.enhanceSelectElement({
		autoselect: true,
		confirmOnBlur: true,
		defaultValue: "",
		minLength: 1,
		selectElement: document.querySelector('select#hs6')
	})
})

// if previosuly submitted, show us some data
var params = new URLSearchParams( window.location.search );
if ( params ) {
	let HSval = params.get('hs6')
	console.log(`showing results for HS=${HSval}`)
	csv('./data/the-data.csv').then( tariffData => {
		let row = tariffData.find( record => record.HS6 == `'${HSval}` )
		let infoBox = select('#category-info')
		infoBox.append('h2').text(`${row.HS6.substring(1)} - ${row.Description}`)
		infoBox.append('p').append('pre').text( JSON.stringify(row,null,2) )
	})
}
