const blake2b = require('blake2b')
const crypto = require('crypto')

const from_buffer = (buffer_content, uint_len = 32) => {
	return blake2b(uint_len).update(buffer_content).digest('hex').toString()
}

const from_str = (str_content, uint_len = 32) => {
	return from_buffer(Buffer.from(str_content), uint_len)
}

const md5 = (str_content) => {
	return crypto.createHash('md5').update(str_content).digest('hex').toString()
}

module.exports = {
	from_str,
	from_buffer,
	md5
}