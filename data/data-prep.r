library('tidyverse')

path = '/var/www/html/cptpp/data/'

results = read_csv(paste0(path,'sources/CPTPP_Results.csv')) %>%
	mutate( 
		HScode = str_replace(`HS6 Code`,"'",""),
		hasEstimatedGain = TRUE,
		BCgain = `BC Gain - no export promotion`  * 1000,
		ABgain = `AB Gain - no export promotion` * 1000,
		SKgain = `SK Gain - no export promotion` * 1000,
		MBgain = `MB Gain - no export promotion` * 1000,
		CAgain = `Total Canada Gain - no export promotion` * 1000,
		BCgainPercent = as.numeric(str_replace(`BC%`,'%',''))/100,
		ABgainPercent = as.numeric(str_replace(`AB%`,'%',''))/100,
		SKgainPercent = as.numeric(str_replace(`SK%`,'%',''))/100,
		MBgainPercent = as.numeric(str_replace(`MB%`,'%',''))/100,
		CAgainPercent = as.numeric(str_replace(`Total Canada Gain %`,'%',''))/100,
		tariffRate = `Japan Rate for Canada TPP` - 1,
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
		initialTariffRate = Starting / 100 
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
