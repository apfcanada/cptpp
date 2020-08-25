// use UN comtrade data to construct an SVG chart showing each major trading 
// partner's share of total annual trade in a commodity with Japan 

import { json } from 'd3-fetch'
import { select } from 'd3-selection'
import { 
	stack, area,
	stackOrderNone, stackOffsetNone,
	curveBasis
} from 'd3-shape'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { schemeAccent } from 'd3-scale-chromatic'
import { timeParse, timeFormat } from 'd3-time-format'
import { timeYear, timeMonth } from 'd3-time'

const period2date = timeParse('%Y')
const date2period = timeFormat('%Y')

const width = 600
const height = 250
const margin = {top: 5, right: 5, bottom: 20, left: 40}

// Partner IDs for likely major trade partners
// https://comtrade.un.org/Data/cache/partnerAreas.json
const world = 0
const canada = 124
const china = 156
const usa = 842
// stores the partners for which we have already pulled a complete trade history
const haveDataFor = new Set()

export async function addComtradeData( HScode ){

	// add loading text and remove any existing SVG
	let container = select('div#comtradeData')
	container.select('svg').remove()
	let loading = container.append('p').text('Loading...')
	
	// get data for all available times, for world + 4 top trade partners
	let tradePartners = [ world, canada, china, usa ]
	const data = await getAllDataFor( HScode, tradePartners )
	
	// find a list of available dates 
	let periods = [ ... new Set( data.map( d => d.period ) ) ]
		.map( period => period2date( `${period}` ) )
		.sort( (a,b) => a - b )	
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
		data
			.filter( d => d.ptCode == world )
			.map( d => d.TradeValue )
	)
	const Y = scaleLinear() //  trade value axis
		.domain( [ 0, maxTradeValue ] )
		.range( [ height - margin.bottom, 0 + margin.top ] )
	const yAxis = axisLeft(Y).ticks(5,'$.2~s')
	
	// now format the data and add the areas
	let [ trade, partners ] = formatData( data, periods )

	const colors = scaleOrdinal()
		.domain([...partners])
		.range(schemeAccent)
	const areaGen = area()
		.x( d => X(d.data.period) )
		.y0( d => Y(d[0]) )
		.y1( d => Y(d[1]) )
		.curve(curveBasis)
	// apply the stack generator
	let series = stack()
		.keys([...partners])
		.offset( stackOffsetNone )
		.order( stackOrderNone )
		(trade)
	// remove "loading..." just before drawing
	loading.remove()
	const svg = setupSVG()
	svg.select('g#dataSpace')
		.selectAll('path')
		.data(series)
		.join('path')
		.attr('fill', (d,i) => colors(i) )
		.attr('stroke-width',0.5)
		.attr('stroke','white')
		.attr('d',areaGen)
		.append('title').text(d=>d.key) // country name	

	// apply the axes
	svg.select('g#xAxis')
		.attr('transform',`translate(0,${height-margin.bottom})`)
		.call( xAxis )
	svg.select('g#yAxis')
		.attr('transform',`translate(${margin.left},0)`)
		.call( yAxis )

	return
	
}

function setupSVG(){
	let svg = select('div#comtradeData')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
	svg.append('g').attr('id','dataSpace')
	svg.append('g').attr('id','xAxis')
	svg.append('g').attr('id','yAxis')
	return svg
}

async function getAllDataFor( HScode, partners ){
	let response = await json(
		formatAPIcall( HScode, partners, undefined )
	)
	partners.map( partnerCode => haveDataFor.add( partnerCode ) )
	return response.dataset
}

function formatAPIcall( HScode, partners=['all'], periods='all' ){
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r': 392,       // reporter = japan 
		'rg': 1,        // imports (to Japan)
		'p': partners.join(','), // partner regions
		'freq': 'A',    // monthly 
		'ps': periods,  // data for all periods
		'px': 'HS', 'cc': HScode  // search by HS code
	})
	return `https://comtrade.un.org/api/get?${params}`
}

function formatData( dataset, periods ){
	// the data needs to be formatted and organized for the stack generator
	let partners = new Set( dataset.map(d=>d.ptTitle) )
	partners.delete('World')
	
	const allTrade = periods.map( period => {
		let periodData = dataset
			.filter( d => `${d.period}` == date2period(period) )
		let worldTrade = periodData.find( d => d.ptCode == world ).TradeValue
		let partnerTrade = periodData
			.filter( d => d.ptTitle != 'World' )
			.reduce( (a,b) => a + b.TradeValue, 0 )
		let trade = { 'period': period, 'Other': worldTrade - partnerTrade }
		for ( let partner of partners ){
			let record = periodData.find( d => d.ptTitle == partner )
			trade[partner] = record ? record.TradeValue : 0
		}
		return trade
	} )
	partners.add('Other')
	return [ allTrade, partners ]
}


