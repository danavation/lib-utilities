const to_string = (val, filters = []) => {
	if(!val || val == null || val === '')
		return ''
	try{
		let str = val.toString().trim()
		for(let i = 0, m = filters.length; i < m; i++){
			str = str.split(filters[i]).join('')
		}
		return str.trim()
	} catch (e) {
		return ''
	}
}

const to_float = (val) => {
	if(!val || val == null || val === '')
		return 0.00
	try{
		return parseFloat(val.toString().replace(/,/g,'').replace(/[^0-9\.]+/g, '').trim())
	} catch (e) {
		return 0.00
	}
}

const to_int = (val) => {
	if(!val || val == null || val === '')
		return 0
	try{
		return parseInt(val.toString().replace(/,/g,'').replace(/^[^-0-9]*/,'').trim())
	} catch (e) {
		return 0
	}
}

const to_timestamp = (val) => {
	if(!val || val == null || val === '')
		return 0
	try{
		return new Date(val).getTime()
	} catch (e) {
		return 0
	}
}

const to_boolean = (val) => {
	if(!val || val == null || val === '')
		return false
	try{
		return val === true ? true: false
	} catch (e) {
		return false
	}
}

module.exports = {
	to_string,
	to_float,
	to_int,
	to_timestamp,
	to_boolean
}