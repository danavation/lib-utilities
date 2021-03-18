// lib
const nacl = require('tweetnacl')
const util = require('tweetnacl-util')

const nonce = () => nacl.randomBytes(24)
const symmetric_key = () => nacl.randomBytes(32)

const symmetric_encrypt = (
	message,  // Uint8Array,
	nonce,    // Uint8Array
	key,      // Uint8Array
) => {

	if(
 		!(message instanceof Uint8Array) ||
	 	!(nonce instanceof Uint8Array) ||
	 	!(key instanceof Uint8Array) 
	)
		throw 'invalid input type'
	return nacl.secretbox(message, nonce, key)
}

const symmetric_decrypt = (
	message,   // Uint8Array
	nonce,     // Uint8Array
	key        // Uint8Array
) => {
	if(
	 	!(message instanceof Uint8Array) ||
	 	!(nonce instanceof Uint8Array) ||
	 	!(key instanceof Uint8Array) 
	)
		throw 'invalid input type'
	return nacl.secretbox.open(message, nonce, key)
}	

module.exports = {
	nonce,
	symmetric_key,
	symmetric_encrypt,
	symmetric_decrypt
}