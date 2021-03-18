const int_2x = (num) => {
	return num = (num > 9 ? '' : '0') + num
}

const yyyy_mm_dd_hh_mm_ss = (val) => {
	let now = val ? new Date(val) : new Date()
	return now.getFullYear() + '-' + 
		int_2x(now.getMonth() + 1) + '-' + 
		int_2x(now.getDate()) + ' ' + 
		int_2x(now.getHours()) + ':' + 
		int_2x(now.getMinutes()) + ':' + 
		int_2x(now.getSeconds())
}

module.exports = {
	yyyy_mm_dd_hh_mm_ss
}