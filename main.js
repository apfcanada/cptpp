import accessibleAutocomplete from 'accessible-autocomplete'
import { csv } from 'd3-fetch'
import { select } from 'd3-selection'

// async call for data
csv('./data/tariffs.csv').then( tariffData => {
	if( ! (
		tariffData.columns.includes('HS6') & 
		tariffData.columns.includes('description')
	) ){ return }
	// add options to the existing dropdown
	let selectEl = select('select#hs6')
	let options = selectEl.selectAll('option').data( tariffData )
	options.enter().append('option')
		.property('value', d => d.HS6 )
		.text( d => `${d.HS6} - ${d.description}` )
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
