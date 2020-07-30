import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'

// formatting
const USD = new Intl.NumberFormat( 'en-CA',
	{ style: 'currency', currency: 'USD', currencyDisplay: 'symbol',
	minimumFractionDigits: 0, maximumFractionDigits: 0 } );
const PCT = new Intl.NumberFormat( 'en-CA',
	{ style: 'percent', signDisplay: 'exceptZero' } );
const TRF = new Intl.NumberFormat('en-CA',
	{ style: 'percent', maximumFractionDigits: 2 } );

// create the search box, populated with data
csv('./data/unified-data.csv').then( HScodes => {
	accessibleAutocomplete({
		element: document.querySelector('#hs6select'),
		id: '#hs6select',
		source: suggest,
		minLength: 2,
		name: 'hs6',
		templates: { 
			inputValue: d => d ? d.HScode : ' ',
			suggestion: d => {
				let text = `${d.HScode} - ${d.description}`
				if(d.hasEstimatedGain){ return text }
				return `<span style="color:gray;">${text}</span>`
			}
		},
		onConfirm: updatePage
	})
	function suggest (query, syncResults) {
		if ( /^\d+$/.test(query) ) {
			// if fully numeric, search by HS code only, starting from front
			syncResults( HScodes.filter(  d => d.HScode.indexOf(query) == 0  ) )
		}else{ // else search by descriptive text
			syncResults( HScodes.filter( 
				d => d.description.toLowerCase().indexOf(query.toLowerCase()) != -1 
			) )
		}
	}
})

// get query parameter of any previous search
//var params = new URLSearchParams( window.location.search );
//var HScode = /^\d{6}$/.test( params.get('hs6') ) ? params.get('hs6') : null

function updatePage(data){
	if(!data) return
	console.log(data)
	addComtradeData(data)
	select('#infoBox').style('display','block')
	select('h2#HS').text(data.HScode)
	select('p#HSdescription').text(data.description)
	// don't show tariffs if not available
	select('#tariffs').style('display',data.tariffRate==''?'none':'block')
	select('#oldTariffRate').text( TRF.format(data.initialTariffRate))
	select('#newTariffRate').text( TRF.format(data.tariffRate) )
	// display link if no estimated gains
	select('#noEffect').style('display', data.CAgain==''?'block':'none')
	// get region data if available
	const gains = [
		{abbr:'CA',full:'Canada'},
		{abbr:'BC',full:'British Columbia'},
		{abbr:'AB',full:'Alberta'},
		{abbr:'SK',full:'Saskatchewan'},
		{abbr:'MB',full:'Manitoba'}
	].map( reg => {
		return {
			'name': reg.full,
			'gain': data[`${reg.abbr}gain`],
			'change': data[`${reg.abbr}gainPercent`]
		}
	}).sort((a,b)=>b.gain-a.gain)
	select('#expectedGains')
		.style('display', data.CAgain == '' ? 'none' : null )
		.select('table#regionalGains tbody')
		.selectAll('tr')
		.data( gains, d => d.abbr )
		.join('tr')
		.style('font-weight', d => d.name == 'Canada' ? 'bold' : null )
		.selectAll('td')
		.data(d => [ 
			d.name,  
			d.gain > 0 ? USD.format(d.gain) : 'None',
			d.gain > 0 ? PCT.format(d.change): 'NA'
		] )
		.join('td').text(t=>t)
}

function addComtradeData(data){
	updateTable([])
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r':392,    // data reported by/for Japan
		'p':'all',  // for all partner regions
		'freq':'A', // annual data
		'ps':'now', // latest time period
		'px':'HS',  // search by HS code
		'cc':data.HScode, // selected HS code
		'rg':1,     // imports only
		'max':500   // max records returned
	})		
	let url = `https://comtrade.un.org/api/get?${params}`
	json(url).then( response => {
		const data = response.dataset.sort((a,b)=>b.TradeValue-a.TradeValue)
		if ( data.length < 2 ) { 
			return select('#comtradeData').append('p').text('No data') 
		}
		// assign rankings based on the sort order
		data.map((country,index)=> country['rank'] = index )
		const world = data.shift() // 'world' should always be the largest (rank=0)
		select('span#latestYear').text(` (${world.period})`)
		// get Canada's position
		const canIndex = data.findIndex( d => d.ptTitle == 'Canada' )
		const topN = data.slice(0, canIndex+1 >= 5 ? canIndex+1 : 5 )
		select('#comtradeData p#loading').remove()
		updateTable(topN)
	})
	function updateTable(newData){
		// create a table for results
		select('#comtradeData table tbody')
			.selectAll('tr')
			.data(newData)
			.join('tr')
			.style('display',d=>d.rank<=4||d.ptTitle=='Canada'?null:'none')
			.style('font-weight',d=>d.ptTitle=='Canada'?'bold':null)
			.selectAll('td')
			.data( d=> [ d.ptTitle, d.rank, USD.format(d.TradeValue) ] )
			.join('td').text(t=>t)
	}
}

