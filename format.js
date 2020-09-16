import { format } from 'd3-format'

export function dollar(number,digits=2){ 
	return format(`-$.${digits}~s`)(number).replace('G','B')
}

export function percent(number){
	return format('~p')(number)
}
