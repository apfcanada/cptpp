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
	{abbr:'JP', name:'Japan',           color:'grey'},
	{abbr:'ML', name:'Malaysia',        color:'grey'},
	{abbr:'MX', name:'Mexico',          color:'grey'},
	{abbr:'NZ', name:'New Zealand',     color:'grey'},
	{abbr:'CN', name:'China',           color:'grey'},
	{abbr:'EU', name:'European Union',  color:'grey'},
	{abbr:'US', name:'United States',   color:'grey'}
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

	// populate / update the chart of projected gains

	select('#expectedGains')
		.style('display', data.CAgain == '' ? 'none' : null )

	let affectedRegions = regions.filter( r => r.gain != 0 )

	const svg = select('#expectedGains svg')
	const width = svg.attr('width')
	const margin = {top: 5, right: 5, bottom: 40, left: 5}
	const barHeight = 12
	const barSpace = 4
	let height = ( affectedRegions.length * ( barHeight + barSpace) + 
		margin.top + margin.bottom )
	svg.attr('height',height)


	const X = scaleLinear() // $ value axis
		.domain( [
			Math.min( ... affectedRegions.map( r => r.gain ) ),
			Math.max( ... affectedRegions.map( r => r.gain ) )
		] )
		.range( [ 0 + margin.left, width - margin.right ] )
	// apply the axis
	svg.select('g#xAxis')
		.attr('transform',`translate(0,${height-margin.bottom})`)
		.call( axisBottom(X).ticks(6,'$.2~s') )
	// add a vertical line at $0
	svg.select('path#zero')
		.attr('d',`M ${X(0)} ${margin.top} L ${X(0)} ${height-margin.bottom}`)
		.attr('stroke','grey')
	
	const Y = scaleLinear()
		.domain( [ 0, affectedRegions.length - 1 ] )
		.range( [ margin.top, height - margin.bottom - barHeight - 5 ] )
	
	svg.selectAll('g.bar')
		.remove()
		.data(affectedRegions,r=>r.name)
		.join('g').classed('bar',true)
		.call( g => {
			g.append('title').text(d=>`${d.name}: ${USD.format(d.gain)}`)
			g.append('text').text(d=>d.name)
				.attr('y', (d,i) => Y(i) + barHeight - 2 )
				.attr('x', d => d.gain > 0 ? X(0)-5 : X(0)+5 )
				.attr('text-anchor',d => d.gain > 0 ? 'end' : 'start' )
				.attr('font-size',`${barHeight}px`)
			g.append('rect')
				.attr('y', (d,i) => Y(i) )
				.attr('x', d => X( Math.min( 0, d.gain ) ) )
				.attr('height',barHeight)
				.attr('width', d => {
					if(d.gain > 0){ return X(d.gain) - X(0) }
					else{ return X(0) - X(d.gain) }
				} )
				.attr('fill', d => d.color )
				.attr('title', d => d.name )
		} )
}




