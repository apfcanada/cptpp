import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'

// get query parameter of any previous search
var params = new URLSearchParams( window.location.search );
const HScode = /^\d{6}$/.test( params.get('hs6') ) ? params.get('hs6') : null

const NUM = new Intl.NumberFormat('en-CA');
const USD = new Intl.NumberFormat(
	'en-CA',
	{
		style:'currency',
		currency:'USD',
		currencyDisplay:'symbol',
		minimumFractionDigits:0
	}
);
const PCT = new Intl.NumberFormat(
	'en-CA',{style:'percent',signDisplay:'exceptZero'}
);

const provinces = [
	{abbr:'BC',full:'British Columbia'},
	{abbr:'AB',full:'Alberta'},
	{abbr:'SK',full:'Saskatchewan'},
	{abbr:'MB',full:'Manitoba'}
]

// if previously submitted, render data
if (HScode) {
	const infoBox = select('#category-info')
	const title = infoBox.append('h2').text(HScode)
	const desc = infoBox.append('p').attr('id','HSdescription')
	const Adiv = infoBox.append('div')
	const Bdiv = infoBox.append('div')
	addOurData(HScode,Adiv)
	addComtradeData(HScode,Bdiv)
}

// create the search box, populated with data
json('./data/canada-to-japan-trade-2019.json').then( response => {
	const HScodes = response.dataset
		.filter( d=> d.TradeValue >= 5000 )
		.sort( (A,B) => B.TradeValue - A.TradeValue )
	//console.log(HScodes)
	if (HScode) {
		let code = HScodes.find(d=>d.cmdCode==HScode)
		if ( code ) { select('p#HSdescription').text( code.cmdDescE ) }
	}
	// enable easier, accessible selections
	accessibleAutocomplete({
		element: document.querySelector('#hs6select'),
		id: '#hs6select',
		source: suggest,
		minLength: 2,
		name: 'hs6',
		templates: { 
			inputValue: d => d ? d.cmdCode : ' ',
			suggestion: d => d ? `${d.cmdCode} - ${d.cmdDescE}` : ' '
		}
	})
	function suggest (query, syncResults) {
		if ( /^\d+$/.test(query) ) {
			// if fully numeric, search by HS code only
			syncResults( HScodes.filter(  d => d.cmdCode.indexOf(query) == 0  ) )
		}else{
			// else search by descriptive text (incl. HS code)
			syncResults( HScodes.filter( 
				d => d.cmdDescE.toLowerCase().indexOf(query) != -1 
			) )
		}
	}
})

function addOurData(hscode,container){
	csv('./data/the-data.csv').then( response => {
		const record = response.find( r => r.HS6 == `'${hscode}` )
		if ( ! record ) { 
			container.append('p')
				.text('Not affected by the CPTPP. Find a tariff at ')
				.append('a').attr('href','https://www.tariffinder.ca')
				.text('tariffinder.ca')
			return 
		}
		// get provincial data
		const gains = provinces.map( prov => {
			return {
				'name': prov.full,
				'gain': 1000 * record[`${prov.abbr} Gain - no export promotion`],
				'change': 0.01 * record[`${prov.abbr}%`]
			}
		}).sort((a,b)=>b.gain-a.gain)
		// add Canada data to the front
		gains.unshift({
			'name': 'Canada',
			'gain': record['Total Canada Gain - no export promotion'] * 1000,
			'change': record['Total Canada Gain %'] / 100
		})
		// append data to DOM
		container.append('h3').text('Tariff Rate')
		let tariffRate = record['Japan Rate for Canada TPP'] - 1
		container.append('p').text(PCT.format(tariffRate))
		container
			.append('h3')
			.text('Expected Gain for Canada and the Western Provinces')
		const table = container.append('table')
		table
			.append('thead')
			.append('tr')
			.selectAll('th')
			.data(['','Gain (USD)','Change from baseline'])
			.join('th')
			.text(d=>d)
		const rows = table
			.append('tbody')
			.selectAll('tr')
			.data(gains)
			.join('tr')
		rows.append('td')
			.text( p => p.name )
			.style('font-weight', p => p.name == 'Canada' ? 'bold' : null )
		rows.append('td')
			.text( p => p.gain > 0 ? NUM.format(p.gain) : 'NA')
		rows.append('td')
			.text( p => p.gain > 0 ? PCT.format(p.change): 'NA' )
			.style('text-align','center')
	})	
}

function addComtradeData(hscode,container){
	// get external top-5 data
	container.append('h3').text('Top Global Exporters to Japan (2019)')
	container.append('p').attr('id','loading').text('loading...')
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r':392,    // data reported by/for Japan
		'p':'all',  // for all partner regions
		'freq':'A', // annual data
		'ps':'now', // latest time period
		'px':'HS',  // search by HS code
		'cc':hscode, // selected HS code
		'rg':1,     // imports only
		'max':500   // max records returned
	})		
	let url = `https://comtrade.un.org/api/get?${params}`
	const columns = [
		{ apiKey:'ptTitle', label:'Country', format: text=>text },
		{ apiKey:'TradeValue', label:'Value of Exports (USD)', format: NUM.format }
	]
	json(url).then( response => {
		let data = response.dataset.sort((a,b)=>b.TradeValue-a.TradeValue)
		let world = data.shift() // world should always be the largest
		// get Canada's position
		let canIndex = data.findIndex( d => d.ptTitle == 'Canada' )
		let topN = data.slice(0, canIndex+1 > 5 ? canIndex+1 : 5 )
		container.select('p#loading').remove()
		if ( topN.length < 1 ) { 
			return container.append('p').text('No data')
		}
		// create a table for results
		let table = container.append('table')
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
}
