import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'

const USD = new Intl.NumberFormat('en-CA',{style:'currency',currency:'USD'});
const NUM = new Intl.NumberFormat();

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
if ( params.get('hs6') && /^\d{6}$/.test(params.get('hs6')) ) {
	const HSval = params.get('hs6')
	const infoBox = select('#category-info')
	const A = infoBox.append('div')
	const B = infoBox.append('div')
	addOurData(HSval,A)
	addComtradeData(HSval,B)
}

function addOurData(hscode,container){
	csv('./data/the-data.csv').then( tariffData => {
		let record = tariffData.find( r => r.HS6 == `'${hscode}` )
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
		container.append('h2').text( `${hscode} - ${description}` )
		container.append('h3').text('Tariff Rate')
		container.append('p').text(tariffRate)
		container.append('h3').text('Market Opportunity')
		container.append('p')
			.text(`${USD.format(canadaGain)} (+${canadaGainPercent}%)`)
		if( provincialGains.length > 0 ){
			container.append('h3').text('Provincial Gains')
			provincialGains.forEach( content => {
				container.append('p').text(content)
			})
		}
	})	
}

function addComtradeData(hscode,container){
	// get external top-5 data
	container.append('h3').text('Top Global Exporters to Japan')
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
