const hex = require('./hex.js')

const from_str = (str) => {
	let unicode = ''
	for(let i = 0, m = str.length; i < m; i++){
		let v = str.charCodeAt(i)
		
		let hex_char = hex.from_int(v, 2)
		unicode += hex_char.substring(0, 2) + hex_char.substring(2, 4)
		// unicode += (v <= 255 ? '00' : '') + v.toString(16)
	}
	return unicode
}

const to_str = (unicode) => {
	let str = ''
	for(let i = 0, m = unicode.length / 4; i < m; i ++){		
		let unicode_c = unicode.substring(i * 4, i * 4 + 4)
		let uint_c = parseInt(unicode_c, 16)
		let c = String.fromCharCode(uint_c)
		str += c
	}
	return str
}

module.exports = {
	from_str,
	to_str
}