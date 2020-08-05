import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'
import { 
	stack, area, 
	stackOffsetWiggle,
	stackOrderInsideOut 
} from 'd3-shape'
import { scaleLinear, scaleOrdinal } from 'd3-scale'

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
	regions.map( (reg,i,a) => {
		reg['gain'] = Number(data[`${reg.abbr}gain`])
		reg['change'] = Number(data[`${reg.abbr}gainPercent`]),
		// add attributes used for the share mapping
		reg['prevCumGain'] = i > 0 ? a[i-1].cumGain : 0,
		reg['cumGain'] = reg.gain + reg.prevCumGain
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
	/*
	// make a chart of regional gains
	const svg = select('svg#bars')
	const width = svg.attr('width')
	const height = svg.attr('height')
	const barHeight = 15;
	const totalGain = regions.reduce((a,b)=>a+b.gain,0)
	const xPos = scaleLinear()
		.domain( [ 0, totalGain ] )
		.range([0,width])
	const bars = svg
		.selectAll('g')
		.data(regions)
		.join('g')
		.attr('transform',d=>{
			return `translate(${xPos(d.prevCumGain)},0)`
		})
	bars.append('rect')
		.attr('fill',d=>d.color)
		.attr('width', d => xPos(d.gain) )
		.attr('height','10')
		.attr('title',d=>d.name)
	*/
}

function addComtradeData(HScode){
	const years = [2019,2018,2017,2016,2015]
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r':392,    // data reported by/for Japan
		'p':'all',  // for all partner regions
		'freq':'A', // annual data
		'ps':years.join(','), // time period
		'px':'HS',  // search by HS code
		'cc':HScode, // selected HS code
		'rg':1,     // imports only
		'max':1000   // max records returned
	})		
	let url = `https://comtrade.un.org/api/get?${params}`
	json(url).then( response => {
		const data = response.dataset.sort((a,b)=>b.TradeValue-a.TradeValue)
		if ( data.length < 2 ) { 
			return select('#comtradeData').append('p').text('No data') 
		}
		const maxAnnualTrade = Math.max( ...data.map(r=>r.TradeValue) ) 
		// the data needs to be formatted and organized for the stack generator
		const allCountries = new Set( data.map(r=>r.ptTitle) )
		allCountries.delete('World')
		const annualTrade = years.map( year => {
			let shares = {'year':year}
			for ( let country of allCountries ){
				let record = data.find( d => d.yr==year && d.ptTitle==country )
				shares[country] = record ? record.TradeValue : 0
			}
			return shares
		})
		// apply the stack generator
		let series = stack()
			.keys([...allCountries])
			.order(stackOrderInsideOut)
			.offset(stackOffsetWiggle)
			(annualTrade)
		// make a chart of annual trade per country
		const svg = select('svg#annualTrade')
		const width = svg.attr('width')
		const height = svg.attr('height')
		const yPos = scaleLinear() // time axis
			.domain([Math.min(...years),Math.max(...years)])
			.range([height,0])
		const xPos = scaleLinear() //  trade value axis
			.domain([0,maxAnnualTrade])
			.range([0,width])
		const colors = scaleOrdinal()
			.domain([...allCountries])
			.range(['yellow','orange','red','purple','blue','green'])
		const areaGen = area()
			.y( d => yPos(d.data.year) )
			.x0( d => xPos(d[0]) )
			.x1( d => xPos(d[1]) )
		svg.selectAll('path')
			.data(series)
			.join('path')
			.attr('fill', (d,i) => colors(i) )
			.attr('d',areaGen)
			.append('title').text(d=>d.key) // country name	
	})
}
