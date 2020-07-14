import accessibleAutocomplete from 'accessible-autocomplete'
import { csv, json } from 'd3-fetch'
import { select } from 'd3-selection'

var USD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// create the search box, populated with data
csv('./data/HScodes.csv').then( HScodes => {
	if( ! (
		HScodes.columns.includes('HS6') & 
		HScodes.columns.includes('description')
	) ){ return }
	// add options to the existing dropdown
	let selectEl = select('select#hs6')
	let options = selectEl.selectAll('option').data( HScodes )
	options.enter().append('option')
		.property('value', d => d.HS6.substring(1) )
		.text( d => `${d.HS6.substring(1)} - ${d.description}` )
	options.exit().remove()
	// enable easier, accessible selections
	accessibleAutocomplete.enhanceSelectElement({
		autoselect: true,
		confirmOnBlur: true,
		defaultValue: "",
		minLength: 1,
		selectElement: document.querySelector('select#hs6')
	})
})

// if previosuly submitted, show us some data!
var params = new URLSearchParams( window.location.search );
if ( params ) {
	let HSval = params.get('hs6')
	console.log(`showing results for HS=${HSval}`)
	csv('./data/the-data.csv').then( tariffData => {
		let row = tariffData.find( record => record.HS6 == `'${HSval}` )
		let infoBox = select('#category-info')
		infoBox
			.append('h2')
			.text( `${row.HS6.substring(1)} - ${row.Description}` )

		infoBox.append('h3').text('Tariff Rate')
		infoBox.append('p').text(row['Japan Rate for Canada TPP'])
		
		infoBox.append('h3').text('Market Opportunity')
		let dollar_opp = USD.format(row['Total Canada Gain - no export promotion'])
		let percent_opp = row['Total Canada Gain %']
		infoBox.append('p').text(`${dollar_opp} USD (${percent_opp})`)
				
		infoBox.append('h3').text('Provincial Gains')
		const provinces = ['BC','AB','SK','MB']
		provinces.forEach( province => {
			let dollars = USD.format(row[`${province} Gain - no export promotion`])
			let percent = row[`${province}%`]
			infoBox
				.append('p')
				.text(`${province} - ${dollars} USD (${percent})`)
		})
		
		infoBox.append('h3').text('Top 5 Global Exporters to Japan')
		// https://comtrade.un.org/Data/Doc/API
		let API = `https://comtrade.un.org/api/get?max=500&freq=A&px=HS&r=all&p=392&rg=all&cc=${HSval}`
		json(API).then(data => {
			data.dataset.sort( (a,b) => b.TradeValue - a.TradeValue )
			let top5 = data.dataset.slice(0,5)
			let top5List = infoBox.append('ol').selectAll('li').data(top5)
			top5List.enter().append('li')
				.text( d => {
					let country = d.rtTitle
					let dollars = USD.format(d.TradeValue)
					return `${country}: ${dollars} USD` 
				})
		})
		
		// temporary
		//infoBox.append('p').append('pre').text( JSON.stringify(row,null,2) )
	})
}
