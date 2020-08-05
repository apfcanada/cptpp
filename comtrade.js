import { json } from 'd3-fetch'
import { select } from 'd3-selection'
import { stack, area, stackOrderInsideOut, curveNatural } from 'd3-shape'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { axisRight, axisBottom } from 'd3-axis'
import { schemeAccent } from 'd3-scale-chromatic'
import { format } from 'd3-format'

export function addComtradeData(HScode){
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
		const minShare = 0.05
		years.map( year => { 
			let world = data.find(p => p.yr==year && p.ptTitle=='World')
			data.filter(p => p.yr==year && p.ptTitle!='World').map( p => {
				if( p.TradeValue >= minShare * world.TradeValue ){
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
			let trade = { 'year': year, 'Other': otherTrade }			
			for ( let partner of topPartners ){
				let record = yearData.find( d => d.ptTitle==partner )
				trade[partner] = record ? record.TradeValue : 0
			}
			return trade
		} )
		console.log(annualTrade)
		topPartners.add('Other')
		// construct the chart
		const svg = select('svg#annualTrade')
		const margin = {top: 5, right: 60, bottom: 40, left: 10}
		const width = svg.attr('width')
		const height = svg.attr('height')
		const Y = scaleLinear() // time axis
			.domain( [ Math.min(...years), Math.max(...years) ] )
			.range( [ height - margin.bottom, 0 + margin.top ] )
		const X = scaleLinear() //  trade value axis
			.domain( [ 0, maxAnnualTrade ] )
			.range( [ 0 + margin.left, width - margin.right ] )
		const colors = scaleOrdinal()
			.domain([...topPartners])
			.range(schemeAccent)
		const areaGen = area()
			.y( d => Y(d.data.year) )
			.x0( d => X(d[0]) )
			.x1( d => X(d[1]) )
			.curve(curveNatural)
		// apply the stack generator
		let series = stack()
			.keys([...topPartners])
			.order(stackOrderInsideOut)
			(annualTrade)
		svg.selectAll('path')
			.data(series)
			.join('path')
			.attr('fill', (d,i) => colors(i) )
			.attr('d',areaGen)
			.append('title').text(d=>d.key) // country name	
		// add the axes
		svg.append('g')
			.attr('transform',`translate(${width-margin.right},0)`)
			.call(
				axisRight(Y)
					.tickValues( years )
					.tickFormat( format('.4') )
			)
		svg.append('g')
			.attr('transform',`translate(0,${height-margin.bottom})`)
			.call( axisBottom(X).ticks(8,'$.2~s') )
	})
}
