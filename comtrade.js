// use UN comtrade data to construct an SVG chart showing each major trading 
// partner's share of total annual trade in a commodity with Japan 

import { json } from 'd3-fetch'
import { select } from 'd3-selection'
import { stack, area, curveBasis } from 'd3-shape'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { timeParse, timeFormat } from 'd3-time-format'
import { timeYear, timeMonth } from 'd3-time'
import { areaLabel } from 'd3-area-label'
import { dollar } from './format'
import { brand as brandColors, canadaRed, otherGrey } from './APFC-palette'

const period2date = timeParse('%Y')
const date2period = timeFormat('%Y')

const width = 600
const height = 250
const margin = {top: 0, right: 0, bottom: 20, left: 40}

// Partner IDs for likely major trade partners
// https://comtrade.un.org/Data/cache/partnerAreas.json
const world = 0
const canada = 124

var colors 
const otherPrimaries = Object.values(brandColors).slice(1)

// check that data for this (or another) HS code isn't already loading
// abort if another HS code has been called more recently
var currentlyLoading = null

export async function addComtradeData( HScode ){
	if( currentlyLoading && currentlyLoading == HScode ){ return }
	currentlyLoading = HScode
	
	const svg = select('div#comtradeData svg')
	
	colors = scaleOrdinal().range(otherPrimaries)
	
	// add loading text
	let loading = select('div#comtradeData p.status')
		.style('display',null)
		.text('Loading trade data...')
	// remove any preexisting data
	svg.select('g.dataSpace').selectAll('path').remove()
	svg.select('g.labels').selectAll('text').remove()
	
	// get data for all available times, for world + Canada
	var sourceData = await getAllDataFor( HScode, [world,canada], 'all' )
	if( currentlyLoading != HScode ){ return loading.style('display','none') }
	if(sourceData.length == 0){
		loading.text('Problem loading trade data. Please try again.')
	}
	sourceData = uniqueData(sourceData)
	
	// find a list of available dates 
	let periods = getPeriods(sourceData)
	// create the scales and axis functions
	const dateRange = [
		new Date( Math.min(...periods) ),
		new Date( Math.max(...periods) ) ]
	const X = scaleLinear() // time axis
		.domain( dateRange )
		.range( [ 0 + margin.left, width - margin.right ] )
	const xAxis = axisBottom(X)
		.tickFormat( timeFormat('%Y') )
	let maxTradeValue = Math.max( ... 
		sourceData
			.filter( d => d.ptCode == world )
			.map( d => d.TradeValue )
	)
	const Y = scaleLinear() //  trade value axis
		.domain( [ 0, maxTradeValue ] )
		.range( [ height - margin.bottom, 0 + margin.top ] )
	const yAxis = axisLeft(Y).ticks(5).tickFormat(dollar)
	
	// apply the axes
	svg.select('g.xAxis')
		.attr('transform',`translate(0,${height-margin.bottom})`)
		.call( xAxis )
	svg.select('g.yAxis')
		.attr('transform',`translate(${margin.left},0)`)
		.call( yAxis )

	updateChart(svg,sourceData,X,Y)
	loading.text('Loading data for additional countries...')
	
	// get trade with ALL partners in the last period
	let newData = await getAllDataFor(
		HScode, 'all', periods.map( p => date2period(p) ).slice(-1)
	)
	if( currentlyLoading != HScode ){ return loading.style('display','none') }
//	sourceData = uniqueData( sourceData.concat(newData) );
//	updateChart(svg,sourceData,X,Y);
	// of these, find those with >= 5% market share
	let worldTrade = newData.find( d => d.ptCode == world ).TradeValue
	let unqueriedPartners = newData.map( d => {
		if( d.TradeValue >= worldTrade/20 && d.ptCode != world ){
			return d.ptCode
		}
	} ).filter( d => d )
	while(unqueriedPartners.length > 0){
		// pop 5
		let queryPartners = unqueriedPartners.slice(-5)
		unqueriedPartners = unqueriedPartners.slice(0,-5)
		let newData = await getAllDataFor( HScode, queryPartners, 'all' )
		if( currentlyLoading != HScode ){ return loading.style('display','none') }
		sourceData = uniqueData( sourceData.concat(newData) );
		updateChart(svg,sourceData,X,Y);
	}
	// remove "loading..." now that we're done
	loading.style('display','none')
	currentlyLoading = null
}

function updateChart(svg,data,X,Y){
	// the data needs to be formatted and organized for the stack generator
	let partners = new Set( data.map( d => d.ptTitle ) )
	let periods = getPeriods(data)
	//	remove 
	partners.delete('World')
	
	const allTrade = periods.map( period => {
		let periodData = data
			.filter( d => `${d.period}` == date2period(period) )
		let worldTrade = periodData.find( d => d.ptCode == world ).TradeValue
		let partnerTrade = periodData
			.filter( d => d.ptCode != world )
			.reduce( (a,b) => a + b.TradeValue, 0 )
		if( partnerTrade > worldTrade ){
			console.warn('world trade too small?',period, partnerTrade)
		}
		let trade = { 'period': period, 'Other': worldTrade - partnerTrade }
		for ( let partner of partners ){
			let record = periodData.find( d => d.ptTitle == partner )
			trade[partner] = record ? record.TradeValue : 0
		}
		return trade
	} )

	partners.add('Other')
		
	const areaGen = area()
		.x( d => X(d.data.period) )
		.y0( d => Y(d[0]) )
		.y1( d => Y(d[1]) )
		.curve(curveBasis)
	// apply the stack generator
	let series = stack().keys([...partners])(allTrade)
		
	svg.select('g.dataSpace')
		.selectAll('path')
		.data( series, d => d.key )
		.join(
			enter => {
				enter.append('path')
					.attr('fill', d => {
						switch(d.key){
							case 'Canada': return canadaRed;
							case 'Other': return otherGrey;
							default: return colors(d.key); 
						}
					} )
					.attr('d',areaGen)
					.append('title').text(d=>d.key) // country name	
			},
			update => update.attr('d',areaGen),
			undefined
		)
	let labels = svg.select('g.labels')
		.selectAll('text')
		.data(series,d=>d.key)
		.join('text')
		.text( d=> d.key )
		.attr('transform',areaLabel(areaGen))
		.attr('opacity',0.5)
}

async function getAllDataFor( HScode, partners, periods ){
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r': 392,       // reporter = japan 
		'rg': 1,        // imports (to Japan)
		'p': typeof(partners) == 'string' ? partners : partners.join(','),
		'freq': 'A',    // monthly 
		'ps': typeof(periods) == 'string' ? periods : periods.join(','),
		'px': 'HS', 'cc': HScode  // search by HS code
	})
	let url = `https://comtrade.un.org/api/get?${params}`
	let response = await json( url )
	return response.dataset
}

function getPeriods(data){
	return [ ... new Set( data.map( d => d.period ) ) ]
		.map( period => period2date( `${period}` ) )
		.sort( (a,b) => a - b )	
}

function uniqueData(data){
	// filter out duplicate data
	const dataPoints = new Set()
	return data.map( d => {
		let uid = `${d.ptCode} - ${d.period}`
		if( ! dataPoints.has(uid) ){
			dataPoints.add(uid)
			return d
		}
	} ).filter( d => d )
}
