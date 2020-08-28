import accessibleAutocomplete from 'accessible-autocomplete'
import { csv } from 'd3-fetch'
import { select } from 'd3-selection'
import { addComtradeData } from './comtrade'

import { scaleLinear } from 'd3-scale'
import { axisBottom } from 'd3-axis'

// formatting
const USD = new Intl.NumberFormat( 'en-CA',
	{ style: 'currency', currency: 'USD', currencyDisplay: 'symbol',
	minimumFractionDigits: 0, maximumFractionDigits: 0 } );
const PCT = new Intl.NumberFormat( 'en-CA',
	{ style: 'percent', signDisplay: 'exceptZero' } );
const TRF = new Intl.NumberFormat('en-CA',
	{ style: 'percent', maximumFractionDigits: 2 } );
	
const regions = [
	{abbr:'CA', name:'Canada',          color:'red'},
	{abbr:'BC', name:'British Columbia',color:'#f58220'},
	{abbr:'AB', name:'Alberta',         color:'#da1f46'},
	{abbr:'SK', name:'Saskatchewan',    color:'#485865'},
	{abbr:'MB', name:'Manitoba',        color:'#a7a9ac'},
	{abbr:'ROC',name:'Rest of Canada',  color:'#111111'},
	//
	{abbr:'JP', name:'Japan',           color:'#111111'},
	{abbr:'ML', name:'Malaysia',        color:'#111111'},
	{abbr:'MX', name:'Mexico',          color:'#111111'},
	{abbr:'NZ', name:'New Zealand',     color:'#111111'},
	{abbr:'CN', name:'China',           color:'#111111'},
	{abbr:'EU', name:'European Union',  color:'#111111'},
	{abbr:'US', name:'United States',   color:'#111111'}
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
	addComtradeData(data.HScode)
	select('#infoBox').style('display','block')
	select('#HScode').text(`${data.HScode}`)
	select('#HSdescription').text(data.description)
	// don't show tariffs if not available
	select('#tariffs').style('display',data.tariffRate==''?'none':'block')
	select('#oldTariffRate').text( TRF.format(data.initialTariffRate))
	select('#newTariffRate').text( TRF.format(data.tariffRate) )
	// display link if no estimated gains
	select('#noEffect').style('display', data.CAgain==''?'block':'none')
	// set additional region data specific to product category
	regions.map( region => {
		region.gain   = Number(data[`${region.abbr}gain`])
		region.change = Number(data[`${region.abbr}gainPercent`])
	})
	// modify the table of expected gains, updating it if there is relevant data, 
	// hiding it if not
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
			d.gain != 0 ? USD.format(d.gain) : 'None',
			(d.change==0||isNaN(d.change)) ? '' : PCT.format(d.change)
		] )
		.join('td').text(t=>t)

	// TODO insert a chart displaying the contents of the table graphically

	let svg = select('#expectedGains svg')
	let width = svg.attr('width')
	let height = svg.attr('height')
	const margin = {top: 5, right: 5, bottom: 40, left: 5}
	
	let affectedRegions = regions.filter( r => r.gain != 0 )
	console.log( affectedRegions )
	const X = scaleLinear() // $ value axis
		.domain( [
			Math.min( ... affectedRegions.map( r => r.gain ) ),
			Math.max( ... affectedRegions.map( r => r.gain ) )
		] )
		.range( [ 0 + margin.left, width - margin.right ] )
	// apply the axis
	svg.append('g')
		.attr('transform',`translate(0,${height-margin.bottom})`)
		.call( axisBottom(X).ticks(6,'$.2~s') )
	// add a vertical line at $0
	svg.append('path')
		.attr('d',`M ${X(0)} ${margin.top} L ${X(0)} ${height-margin.bottom}`)
		.attr('stroke','grey')
	
	const Y = scaleLinear()
		.domain( [ 0, affectedRegions.length - 1 ] )
		.range( [ margin.top, height - margin.bottom ] )
	
	svg.selectAll('rect')
		.data(affectedRegions)
		.join('rect')
		.attr('y', (d,i) => Y(i) )
		.attr('x', d => X( Math.min( 0, d.gain ) ) )
		.attr('height',10)
		.attr('width', d => {
			if(d.gain > 0){
				return X(d.gain) - X(0)
			}else{
				return X(0) - X(d.gain)
			}
		} )
		.attr('fill', d => d.color )
		.attr('title', d => d.name )
}






















