import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'
import { 
	stack, area, 
	stackOffsetWiggle,
	stackOrderInsideOut 
} from 'd3-shape'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { axisRight } from 'd3-axis'

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
}

function addComtradeData(HScode){
	// use UN comtrade data to construct a chart showing each county's 
	// share of total annual trade with Japan 
	const years = [2019,2018,2017,2016,2015]
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r':392,'rg':1,'p':'all', // imports reported by Japan from all regions
		'freq':'A', 'ps':years.join(','), // annual data for the selected years
		'px':'HS', 'cc':HScode  // search by HS code
	})
	json(`https://comtrade.un.org/api/get?${params}`).then( response => {
		const data = response.dataset
		if ( data.length < 1 ) { 
			return console.log('no comtrade data supplied') 
		}
		// start slicing up the data	
		const maxAnnualTrade = Math.max( ...
			data
				.filter( p => p.ptTitle=='World')
				.map( p => p.TradeValue)
		)
		// find any trade partners constituting >=5% of total trade in a year
		const topPartners = new Set(['Canada'])
		years.map( year => { 
			let world = data.find(p => p.yr==year && p.ptTitle=='World')
			data.filter(p => p.yr==year && p.ptTitle!='World').map( p => {
				if( p.TradeValue >= 0.05 * world.TradeValue ){
					topPartners.add(p.ptTitle)
				}
			})
		} )
		// the data needs to be formatted and organized for the stack generator
		const annualTrade = years.map( year => {
			let yearData = data.filter( d => d.yr==year )
			let otherTrade = yearData
				.filter( d => ! topPartners.has(d.ptTitle) && d.ptTitle != 'World' )
				.reduce( (a,b) => a + b.TradeValue, 0 )
			let trade = { 
				'year': year, 
				'Other': otherTrade, 
				'Total': yearData.find(d=>d.ptTitle=='World').TradeValue
			}			
			for ( let partner of topPartners ){
				let record = yearData.find( d => d.ptTitle==partner )
				trade[partner] = record ? record.TradeValue : 0
			}
			return trade
		} )
		topPartners.add('Other')
		// construct the chart
		const svg = select('svg#annualTrade')
		const margin = {top: 0, right: 40, bottom: 0, left: 0}
		const width = svg.attr('width')
		const height = svg.attr('height')
		const Y = scaleLinear() // time axis
			.domain([Math.min(...years),Math.max(...years)])
			.range([height,0])
		const X = scaleLinear() //  trade value axis
			.domain([0,maxAnnualTrade])
			.range([0,width-margin.right])
		const colors = scaleOrdinal()
			.domain([...topPartners])
			.range(['yellow','orange','red','purple','blue','green'])
		const areaGen = area()
			.y( d => Y(d.data.year) )
			.x0( d => X(d[0]) )
			.x1( d => X(d[1]) )
			
		const yAxis = axisRight(Y)
			//.tickValues(years)
				// apply the stack generator
		let series = stack()
			.keys([...topPartners])
			.order(stackOrderInsideOut)
			.offset(stackOffsetWiggle)
			(annualTrade)
		svg.selectAll('path')
			.data(series)
			.join('path')
			.attr('fill', (d,i) => colors(i) )
			.attr('d',areaGen)
			.append('title').text(d=>d.key) // country name	
	})
}

