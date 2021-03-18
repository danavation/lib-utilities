const str = (uint_len) => {
	return Math.random().toString(36).substring(uint_len - 1)
}

const int = (int_max, int_min) => {
	return Math.round(Math.random() * (int_max - int_min) + int_min)
}

module.exports = {
	str,
	int
}