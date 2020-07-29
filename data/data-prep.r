library('tidyverse')

HSall = read_csv('/var/www/html/cptpp/data/canada-to-japan-trade-2019.csv')

d = read_csv('/var/www/html/cptpp/data/the-data.csv')

newData = HSall %>%
	full_join(d,by=c('HScode'='HS6')) %>%
	mutate( hasGain = !is.na(`Tariff before CPTPP`) ) %>% 
	select(
		HScode,
		TradeValue,
		Description,
		hasGain,
		`Tariff before CPTPP`,
		`Japan Rate for Canada TPP`,
		ends_with('Gain - no export promotion'),
		ends_with('%')
	) %>%
	arrange(
		!hasGain, # negation for true first order
		TradeValue
	)

write_csv(newData,'out.csv',na='')
