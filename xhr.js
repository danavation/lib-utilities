const send = (
	str_method,
	str_url,
	str_credential, // email:token
	obj_json,
) => new Promise((res, rej)=>{
	let xhr = new XMLHttpRequest()
	xhr.onload = () => {
		if (xhr.status >= 200 && xhr.status < 300) {
			try{
	        	res(JSON.parse(xhr.responseText))
        	} catch(e) {
        		rej(xhr)
        	}
		}
    	else rej(xhr)
	}
	xhr.open(str_method, str_url)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(str_credential))
	xhr.send(JSON.stringify(obj_json))
})

module.exports = {
	send
}