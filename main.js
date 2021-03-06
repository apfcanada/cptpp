import accessibleAutocomplete from 'accessible-autocomplete'
import { csv } from 'd3-fetch'
import { select, selectAll } from 'd3-selection'
import { addComtradeData } from './comtrade'
import { scaleLinear } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { dollar, percent } from './format'
import { ordinal, canadaRed, otherGrey } from './APFC-palette'

const regions = [
	{abbr:'CA', name:'Canada',          color:canadaRed},
	{abbr:'BC', name:'British Columbia',color:ordinal.redYellow[4]},
	{abbr:'AB', name:'Alberta',         color:ordinal.redYellow[5]},
	{abbr:'SK', name:'Saskatchewan',    color:ordinal.redYellow[6]},
	{abbr:'MB', name:'Manitoba',        color:ordinal.redYellow[7]},
	{abbr:'ROC',name:'Rest of Canada',  color:ordinal.blackGrey[1]},
	//
	{abbr:'JP', name:'Japan'},
	{abbr:'ML', name:'Malaysia'},
	{abbr:'MX', name:'Mexico'},
	{abbr:'NZ', name:'New Zealand'},
	{abbr:'CN', name:'China',},
	{abbr:'EU', name:'European Union'},
	{abbr:'US', name:'United States'}
]

// create the search box, populated with data
csv('./data/unified-data.csv').then( HScodes => {
	accessibleAutocomplete({
		element: document.querySelector('#hs6select'),
		id: '#hs6select',
		source: suggest,
		autoselect: false,
		confirmOnBlur: false,
		displayMenu: 'overlay',
		minLength: 1,
		showAllValues: true,
		name: 'hs6',
		templates: { 
			inputValue: d => d ? d.HScode : '',
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
	selectAll('#infoBox, footer').style('display','block')
	select('#HScode').text(`${data.HScode}`)
	select('#HSdescription').text(data.description)
	// don't show data if not available
	selectAll('.model-results')
		.style('display',data.hasEstimatedGain ? 'block' : 'none' )
	select('#noEffect')
		.style('display', data.hasEstimatedGain ? 'none': 'block' )
	select('#oldTariffRate').text( percent(data.initialTariffRate))
	select('#newTariffRate').text( percent(data.tariffRate) )
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
	const margin = {top: 5, right: 5, bottom: 20, left: 5}
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
	let numTicksDesired = 6
	svg.select('g#xAxis')
		.attr('transform',`translate(0,${height-margin.bottom})`)
		.call( axisBottom(X).ticks(numTicksDesired).tickFormat(dollar) )
	// add vertical grid aligned with ticks
	svg.select('g.grid')
		.selectAll('path')
		.data(X.ticks(numTicksDesired))
		.join('path')
		.attr('d',d=>`M${X(d)} ${margin.top} L${X(d)} ${height-margin.bottom}`)
		.style('stroke',d=> d == 0 ? 'black' : null )
	
	const Y = scaleLinear()
		.domain( [ 0, affectedRegions.length - 1 ] )
		.range( [ margin.top, height - margin.bottom - barHeight - 5 ] )
	
	svg.selectAll('g.bar')
		.data( affectedRegions, r=>r.name )
		.join(
			enterBar, 
			updateBar, 
			exit => exit.remove()
		)

	function enterBar(enterSelection){
		let g = enterSelection.append('g').classed('bar',true)
		g.append('title')
			.text( titleText )
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
			.attr('fill', d => d.hasOwnProperty('color') ? d.color : otherGrey )
	}
	
	function updateBar(updateSelection){
		let g = updateSelection
		g.select('title').text( titleText )
		g.select('text')
			.attr('y', (d,i) => Y(i) + barHeight - 2 )
			.attr('x', d => d.gain > 0 ? X(0)-5 : X(0)+5 )
			.attr('text-anchor',d => d.gain > 0 ? 'end' : 'start' )
		g.select('rect')
			.attr('y', (d,i) => Y(i) )
			.attr('x', d => X( Math.min( 0, d.gain ) ) )
			.attr('width', d => {
				if(d.gain > 0){ return X(d.gain) - X(0) }
				else{ return X(0) - X(d.gain) }
			} )
	}
	
	function titleText(d){
		let text = `${d.name}: ${dollar(d.gain,4)}` 
		if(!isNaN(d.change)){
			text += ` (${percent(d.change)})`
		}
		return text
	}

}
