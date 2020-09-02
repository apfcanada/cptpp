library('tidyverse')

path = '/var/www/html/cptpp/data/'

results = read_csv(paste0(path,'sources/CPTPP_Results.csv')) %>%
	mutate( 
		HScode = str_replace(`HS6 Code`,"'",""),
		hasEstimatedGain = TRUE,
		tariffRate = round( `Japan Rate for Canada TPP`-1, 2),
		
		BCgain = round(`BC Gain - no export promotion`)  * 1000,
		ABgain = round(`AB Gain - no export promotion`) * 1000,
		SKgain = round(`SK Gain - no export promotion`) * 1000,
		MBgain = round(`MB Gain - no export promotion`) * 1000,
		ROCgain = round(`ROC Gain - No Export Promotion`) * 1000,
		CAgain = round(`Total Canada Gain - no export promotion`) * 1000,
		JPgain = round(`Japan's export to Japan Change (internal trade change)`) * 1000,
		MLgain = round(`Malaysia's export to Japan Change`) * 1000,
		MXgain = round(`Mexico's export to Japan Change`) * 1000,
		NZgain = round(`New Zealand's export to Japan Change`) * 1000,
		CNgain = round(`China's export to Japan Change`) * 1000,
		EUgain = round(`EU's export to Japan Change`) * 1000,
		USgain = round(`USA's export to Japan Change`) * 1000,
		
		BCgainPercent = round(as.numeric(str_replace(`BC%`,'%',''))/100,2),
		ABgainPercent = round(as.numeric(str_replace(`AB%`,'%',''))/100,2),
		SKgainPercent = round(as.numeric(str_replace(`SK%`,'%',''))/100,2),
		MBgainPercent = round(as.numeric(str_replace(`MB%`,'%',''))/100,2),
		CAgainPercent = round(as.numeric(str_replace(`Total Canada Gain %`,'%',''))/100,2),
		ROCgainPercent = round(as.numeric(str_replace(`ROC Gain %`,'%',''))/100,2)
	) %>%
	select(
		HScode,
		hasEstimatedGain,
		altDescription = Description,
		tariffRate,
		ends_with('gain'),
		ends_with('Percent')
	)

allTrade = read_csv(paste0(path,'sources/comtrade.csv')) %>% 
	select( 
		HScode = `Commodity Code`,
		tradeValue = `Trade Value (US$)`,
		description = Commodity
	)

initialRates = read_csv(paste0(path,'sources/Tariff Start and End.csv')) %>%
	mutate( 
		initialTariffRate = round(Starting/100,2) 
	) %>%
	select( 
		HScode = `Product code Txt`,
		initialTariffRate
	) 

newData = results %>%
	full_join( initialRates, by='HScode') %>%
	full_join( allTrade, by='HScode' ) %>% 
	mutate(
		description = ifelse( is.na(description), altDescription, description )
	) %>%
	select( - altDescription ) %>%
	arrange(
		!hasEstimatedGain, # negation for true first order
		-tradeValue # largest first
	)

write_csv(newData,paste0(path,'unified-data.csv'),na='')

