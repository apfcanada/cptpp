import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'

var USD = new Intl.NumberFormat('en-CA',{style:'currency',currency:'USD'});
var NUM = new Intl.NumberFormat();

const provinces = [
	{abbr:'BC',full:'British Columbia'},
	{abbr:'AB',full:'Alberta'},
	{abbr:'SK',full:'Saskatchewan'},
	{abbr:'MB',full:'Manitoba'}
]

// create the search box, populated with data
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

// if previosuly submitted, show us some data!
var params = new URLSearchParams( window.location.search );
if ( params.get('hs6') ) {
	let HSval = params.get('hs6')
	csv('./data/the-data.csv').then( tariffData => {
		let record = tariffData.find( r => r.HS6 == `'${HSval}` )
		let infoBox = select('#category-info')
		// variable name mapping, etc
		let description = record['Description']
		let tariffRate = record['Japan Rate for Canada TPP']
		let canadaGain = record['Total Canada Gain - no export promotion']
		let canadaGainPercent = record['Total Canada Gain %']
		// only show provincial gains > $1,000
		let provincialGains = provinces.map( province => {
			let dollars = record[`${province.abbr} Gain - no export promotion`]
			let percent = record[`${province.abbr}%`]
			let text = `${province.full} - ${USD.format(dollars)} (+${percent}%)`
			return dollars >= 500 ? text : null
		}).filter( val => val )
		// append data to DOM
		infoBox.append('h2').text( `${HSval} - ${description}` )
		infoBox.append('h3').text('Tariff Rate')
		infoBox.append('p').text(tariffRate)
		infoBox.append('h3').text('Market Opportunity')
		infoBox.append('p')
			.text(`${USD.format(canadaGain)} (+${canadaGainPercent}%)`)
		if( provincialGains.length > 0 ){
			infoBox.append('h3').text('Provincial Gains')
			provincialGains.forEach( content => {
				infoBox.append('p').text(content)
			})
		}
		// get external top-5 data
		infoBox.append('h3').text('Top Global Exporters to Japan')
		infoBox.append('p').attr('id','loading').text('loading...')
		// https://comtrade.un.org/Data/Doc/API
		let params = new URLSearchParams({
			'r':392,    // data reported by/for Japan
			'p':'all',  // for all partner regions
			'freq':'A', // annual data
			'ps':'now', // latest time period
			'px':'HS',  // search by HS code
			'cc':HSval, // selected HS code
			'rg':1,     // imports only
			'max':500   // max records returned
		})
		let url = `https://comtrade.un.org/api/get?${params}`
		json(url).then( response => {
			let data = response.dataset.sort((a,b)=>b.TradeValue-a.TradeValue)
			let world = data.shift()
			// get Canada's position
			let canIndex = data.findIndex( d => d.ptTitle == 'Canada' )
			let topN = data.slice(0, canIndex+1 > 5 ? canIndex+1 : 5 )
			infoBox.select('p#loading').remove()
			// create a table for results
			const columns = [
				{ 
					apiKey:'ptTitle', 
					label:'Country', 
					format: text=>text
				},
				{ 
					apiKey:'TradeValue',
					label:'Value of Trade (USD)',
					format: NUM.format
				}
			]
			let table = infoBox.append('table')
			table
				.append('thead')
				.append('tr')
				.selectAll('th')
				.data(columns)
				.join('th')
				.text(d=>d.label)
			table
				.append('tbody')
				.selectAll('tr')
				.data(topN)
				.join('tr')
				.selectAll('td')
				.data( d => columns.map( c => c.format( d[c.apiKey] ) ) ) 
				.join('td')
				.style('font-weight',text=>text=='Canada'?'bold':null)
				.text(text=>text)
		})
	})
}
