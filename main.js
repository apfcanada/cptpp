import accessibleAutocomplete from 'accessible-autocomplete'
import { csv } from 'd3-fetch'
import { select } from 'd3-selection'
import { addComtradeData } from './comtrade'

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
//	var code = /^\d{6}$/.test( params.get('hs6') ) ? params.get('hs6') : null
	addComtradeData(data.HScode,'svg#annualTrade')
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
	regions.map( region => {
		region['gain']   = Number(data[`${region.abbr}gain`])
		region['change'] = Number(data[`${region.abbr}gainPercent`])
	})
	console.log(regions)
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
}

