import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'
//import { stack } from 'd3-shape'
import { scaleLinear } from 'd3-scale'

// formatting
const USD = new Intl.NumberFormat( 'en-CA',
	{ style: 'currency', currency: 'USD', currencyDisplay: 'symbol',
	minimumFractionDigits: 0, maximumFractionDigits: 0 } );
const PCT = new Intl.NumberFormat( 'en-CA',
	{ style: 'percent', signDisplay: 'exceptZero' } );
const TRF = new Intl.NumberFormat('en-CA',
	{ style: 'percent', maximumFractionDigits: 2 } );
	
const regions = [
	{abbr:'BC', name:'British Columbia',color:'#f58220'},
	{abbr:'AB', name:'Alberta',         color:'#da1f46'},
	{abbr:'SK', name:'Saskatchewan',    color:'#485865'},
	{abbr:'MB', name:'Manitoba',        color:'#a7a9ac'},
	{abbr:'ROC',name:'Rest of Canada',  color:'#111111'}
]

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
	// once set up (with data loaded) check for existing search
	checkURL(HScodes)
})

function checkURL(data){
	const params = new URLSearchParams( location.search )
	var HScode = /^\d{6}$/.test( params.get('hs6') ) ? params.get('hs6') : null
	if(HScode) updatePage( data.find(d=>d.HScode == HScode) )
}

function updatePage(data){
	if(!data) return
	console.log(data)
	// update the URL with the select HScode
	const params = new URLSearchParams(location.search)
	params.set('hs6',data.HScode)
	window.history.replaceState({},'',`${location.pathname}?${params}`)
//	var code = /^\d{6}$/.test( params.get('hs6') ) ? params.get('hs6') : null
	addComtradeData(data.HScode)
	select('#infoBox').style('display','block')
	select('h2#HS').text(data.HScode)
	select('p#HSdescription').text(data.description)
	// don't show tariffs if not available
	select('#tariffs').style('display',data.tariffRate==''?'none':'block')
	select('#oldTariffRate').text( TRF.format(data.initialTariffRate))
	select('#newTariffRate').text( TRF.format(data.tariffRate) )
	// display link if no estimated gains
	select('#noEffect').style('display', data.CAgain==''?'block':'none')
	// set additional region data specific to product category
	regions.map( reg => {
		reg['gain'] = Number(data[`${reg.abbr}gain`])
		reg['change'] = Number(data[`${reg.abbr}gainPercent`])
	})
	select('#expectedGains')
		.style('display', data.CAgain == '' ? 'none' : null )
		.select('table#regionalGains tbody')
		.selectAll('tr')
		.data( regions, r => r.abbr )
		.join('tr')
		.style('font-weight', d => d.name == 'Canada' ? 'bold' : null )
		.selectAll('td')
		.data(d => [ 
			d.name,  
			d.gain > 0 ? USD.format(d.gain) : 'None',
			d.gain > 0 ? PCT.format(d.change): 'NA'
		] )
		.join('td').text(t=>t)
		
	// make a chart of regional gains
	const svg = select('svg#bars')
	const width = svg.attr('width')
	const height = svg.attr('height')
	const barHeight = 15;
	const totalGain = regions.reduce((a,b)=>a+b.gain,0)
	console.log(totalGain)
	const xPos = scaleLinear()
		.domain( [ 0, totalGain ] )
		.range([0,width])
	const yPos = scaleLinear()
		.domain([0,regions.length-1])
		.range([0,height-barHeight])
	const col = scaleLinear()
		.domain([0,regions.length])
		.range(['red','yellow'])
	const bars = svg.selectAll('g').data(regions).join('g')
		.attr('transform',(d,i)=>`translate(0,${yPos(i)})`)
	bars.append('rect')
		.attr('fill',d=>d.color)
		.attr('width', d => xPos(d.gain) )
		.attr('height','10')
		.attr('title',d=>d.name)

}

function addComtradeData(HScode){
	updateTable([])
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r':392,    // data reported by/for Japan
		'p':'all',  // for all partner regions
		'freq':'A', // annual data
		'ps':'now', // latest time period
		'px':'HS',  // search by HS code
		'cc':HScode, // selected HS code
		'rg':1,     // imports only
		'max':300   // max records returned
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
