const email = (str) => {
	return /\S+@\S+\.\S+/.test(str)
}

const item = (obj) => {
	return obj._id && obj._id !== '' && obj._keyword && obj._logic && obj._logic !== ''
}

const label = (obj) => {
	return obj._id && obj._id !== ''
}

module.exports = {
	email, item, label
}