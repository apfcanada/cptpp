// use UN comtrade data to construct an SVG chart showing each major trading 
// partner's share of total annual trade in a commodity with Japan 

import { json } from 'd3-fetch'
import { select } from 'd3-selection'
import { stack, area, stackOrderInsideOut, curveBasis } from 'd3-shape'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { axisLeft, axisBottom } from 'd3-axis'
import { schemeAccent } from 'd3-scale-chromatic'
import { timeParse, timeFormat } from 'd3-time-format'

const YMparse = timeParse('%Y%m')
const YMformat = timeFormat('%Y%m')

export async function addComtradeData( HScode, SVGselector ){

	// access the chart
	const svg = select(SVGselector)
	const margin = {top: 5, right: 5, bottom: 40, left: 40}
	const width = svg.attr('width')
	const height = svg.attr('height')

	// get data for ALL PERIODS for up to five major partners
	// [ World, Canada, USA, China, Thailand ]
	const majorPlayers = [0,124,842,156,764]
	const allTimeCall = formatAPIcall2(HScode,majorPlayers)
	const allTimeData = await json(allTimeCall)
	
	// find all available date and value ranges 
	// ( to set up the scales and axes )
	let periods = [ ... new Set( allTimeData.dataset.map( d => d.period ) ) ]
	periods = periods
		.map( period => YMparse( `${period}` ) )
		.sort( (a,b) => a - b )
	let maxTradeValue = Math.max( ... 
		allTimeData.dataset
			.filter( d => d.ptTitle == 'World' )
			.map( d => d.TradeValue )
	)
	
	// create the scales and axes
	const X = scaleLinear() // time axis
		.domain( [ Math.min(...periods), Math.max(...periods) ] )
		.range( [ 0 + margin.left, width - margin.right ] )
	const Y = scaleLinear() //  trade value axis
		.domain( [ 0, maxTradeValue ] )
		.range( [ height - margin.bottom, 0 + margin.top ] )
	svg.append('g')
		.attr('transform',`translate(0,${height-margin.bottom})`)
		.call( axisBottom(X).tickFormat( timeFormat('%Y %b') ) )
	svg.append('g')
		.attr('transform',`translate(${margin.left},0)`)
		.call( axisLeft(Y).ticks(8,'$.2~s') )
	
	// now format the data and add the areas
	let [ trade, partners ] = formatData( allTimeData.dataset, periods )

	const colors = scaleOrdinal()
		.domain([...partners])
		.range(schemeAccent)
	const areaGen = area()
		.x( d => X(d.data.period) )
		.y0( d => Y(d[0]) )
		.y1( d => Y(d[1]) )
		.curve(curveBasis)
	// apply the stack generator
	let series = stack().keys([...partners])(trade)
	svg.append('g')
		.attr('id','dataSpace')
		.selectAll('path')
		.data(series)
		.join('path')
		.attr('fill', (d,i) => colors(i) )
		.attr('d',areaGen)
		.append('title').text(d=>d.key) // country name	
	
	return
	
}
	
	// 2. data for ALL PARTNER COUNTRIES for recent time periods
	//const call2 = formatAPIcall2(HScode,['all'],['recent'])
	// 3. data for MAJOR RECENT PARTNERS at ALL TIMES



//		// find any trade partners constituting >=5% of total trade in a year
//		const topPartners = new Set(['Canada'])
//		const minShare = 0.05
//		years.map( year => { 
//			let world = data.find(p => p.yr==year && p.ptTitle=='World')
//			data.filter(p => p.yr==year && p.ptTitle!='World').map( p => {
//				if( p.TradeValue >= minShare * world.TradeValue ){
//					topPartners.add(p.ptTitle)
//				}
//			})
//		} )


function formatAPIcall(HScode,years){
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r':392,'rg':1,'p':'all', // imports reported by Japan from all regions
		'freq':'A', 'ps':years.join(','), // annual data for the selected years
		'px':'HS', 'cc':HScode  // search by HS code
	})
	return `https://comtrade.un.org/api/get?${params}`
}

function formatAPIcall2( HScode, partners=['all'], periods=['all'] ){
	// https://comtrade.un.org/Data/Doc/API
	let params = new URLSearchParams({
		'r': 392,    // reporter = japan 
		'rg': 1,     // imports (to Japan)
		'p': partners.join(','), // partner regions
		'freq': 'M', // monthly 
		'ps': periods.join(','), // data for all periods
		'px': 'HS', 'cc':HScode  // search by HS code
	})
	return `https://comtrade.un.org/api/get?${params}`
}

function formatData( dataset, periods ){
	// the data needs to be formatted and organized for the stack generator
	let partners = new Set( dataset.map(d=>d.ptTitle) )
	partners.delete('World')
	
	const allTrade = periods.map( period => {
		let periodData = dataset
			.filter( d => `${d.period}` == YMformat(period) )
		let worldTrade = periodData.find( d => d.ptTitle == 'World' ).TradeValue
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


