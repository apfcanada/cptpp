import accessibleAutocomplete from 'accessible-autocomplete'
import { csv } from 'd3-fetch'

csv('./data/tariffs.csv').then( function(data){
	//console.log(data)
	accessibleAutocomplete({
		element: document.querySelector('#hs2-container'),
		id: 'hs2-select',
		source: data.map( d=> d.HS2 )
	})
})
