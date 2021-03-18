const from_int = (int, bytes_len) => {
	let hex = int.toString(16)
	for(let i = 0, m = bytes_len * 2 - hex.length; i < m; i++){
		hex = '0' + hex
	}
	return hex
}

const to_int = (hex) => {
	return parseInt(hex, 16)
}

const from_ip = (ip) => {
	let arr = ip.split('.')
	let p0 = parseInt(arr[0]).toString(16)
	let p1 = parseInt(arr[1]).toString(16)
	let p2 = parseInt(arr[2]).toString(16)
	let p3 = parseInt(arr[3]).toString(16)
	let hex = 
		(p0.length == 1 ? '0' + p0 : p0) +
		(p1.length == 1 ? '0' + p1 : p1) +
		(p2.length == 1 ? '0' + p2 : p2) +
		(p3.length == 1 ? '0' + p3 : p3)
	return hex
}

const to_ip = (hex) => {
	let ip = 
		parseInt(hex.substring(0, 2), 16) + '.' +
		parseInt(hex.substring(2, 4), 16) + '.' +
		parseInt(hex.substring(4, 6), 16) + '.' +
		parseInt(hex.substring(6, 8), 16) 
	return ip
}

module.exports = {
	from_int,
	to_int,
	from_ip,
	to_ip
}