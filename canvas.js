const jsbarcode = require('jsbarcode')
const canvas_dither = require('canvas-dither')
const datetime = require('./datetime.js')

const prefix = () => {
	return datetime.yyyy_mm_dd_hh_mm_ss() + ' [utilities] canvas.js'
}

const draw_text = (obj_main_ctx, obj_text) => {
	obj_main_ctx.textAlign = 'left'
    obj_main_ctx.textBaseline = 'top'
	obj_main_ctx.font = obj_text.font_size + 'px ' + obj_text.font_type
	obj_main_ctx.fillStyle = obj_text.fill_style
	let text_size = obj_main_ctx.measureText(obj_text.value)
	let translate_x = obj_text.x + text_size.width / 2
		translate_y = obj_text.y + (text_size.actualBoundingBoxAscent + text_size.actualBoundingBoxDescent) / 2
	
	obj_main_ctx.save()
	obj_main_ctx.translate(translate_x, translate_y)
	obj_main_ctx.rotate(obj_text.rotate * Math.PI / 180)
	obj_main_ctx.translate(-translate_x, -translate_y)
	obj_main_ctx.fillText(obj_text.value, obj_text.x, obj_text.y)
	obj_main_ctx.restore()
}

const draw_rect = (obj_main_ctx, obj_rect) => {
	obj_main_ctx.fillStyle = obj_rect.fill_style
	let translate_x = obj_rect.x + obj_rect.width / 2,
	    translate_y = obj_rect.y + obj_rect.height / 2

	obj_main_ctx.save()
	obj_main_ctx.translate(translate_x, translate_y)
	obj_main_ctx.rotate(obj_rect.rotate * Math.PI / 180)
	obj_main_ctx.translate(-translate_x, -translate_y)
	obj_main_ctx.fillRect(obj_rect.x, obj_rect.y, obj_rect.width, obj_rect.height)
	obj_main_ctx.restore()
}

const draw_barcode = (obj_main_ctx, obj_temp_canvas, obj_barcode) => {
	jsbarcode(obj_temp_canvas, obj_barcode.value, {
		format: "UPC",
		lineColor: obj_barcode.fill_style,
		width: obj_barcode.width,
		height: obj_barcode.height,
		margin: obj_barcode.margin,
		displayValue: obj_barcode.display_value
	})
	let translate_x = obj_barcode.x + obj_temp_canvas.width / 2,
	    translate_y = obj_barcode.y + obj_temp_canvas.height / 2

	obj_main_ctx.save()
	obj_main_ctx.translate(translate_x, translate_y)
	obj_main_ctx.rotate(obj_barcode.rotate * Math.PI / 180)
	obj_main_ctx.translate(-translate_x, -translate_y)
	obj_main_ctx.drawImage(obj_temp_canvas, obj_barcode.x, obj_barcode.y)
	obj_main_ctx.restore()
}

// drawStar(100, 100, 5, 30, 15)
// cx = 100, cy = 100, spikes = 5, outerRadius = 30, innerRadius = 15
const draw_review_star = (obj_main_ctx, cx,cy,spikes,outerRadius,innerRadius) => {
	var rot = Math.PI / 2 * 3
	var x = cx
	var y = cy
	var step = Math.PI / spikes

	obj_main_ctx.beginPath()
	obj_main_ctx.moveTo(cx, cy-outerRadius)
	for(let i=0;i<spikes;i++){
		x=cx+Math.cos(rot)*outerRadius
		y=cy+Math.sin(rot)*outerRadius
		obj_main_ctx.lineTo(x,y)
		rot+=step

		x=cx+Math.cos(rot)*innerRadius
		y=cy+Math.sin(rot)*innerRadius
		obj_main_ctx.lineTo(x,y)
		rot+=step
	}
	obj_main_ctx.lineTo(cx,cy-outerRadius)
	obj_main_ctx.closePath()
	obj_main_ctx.lineWidth=5
	obj_main_ctx.strokeStyle = '#000'
	obj_main_ctx.stroke()
	obj_main_ctx.fillStyle='#f00'
	obj_main_ctx.fill()
}

const draw_image = (obj_main_ctx, obj_temp_image, obj_image) => {
	obj_temp_image.onload = () => {
		let translate_x = obj_image.x + obj_image.width / 2,
	    	translate_y = obj_image.y + obj_image.height / 2
    	obj_main_ctx.save()
    	obj_main_ctx.translate(translate_x, translate_y)
    	obj_main_ctx.rotate(obj_image.rotate * Math.PI / 180)
    	obj_main_ctx.translate(-translate_x, -translate_y)
		obj_main_ctx.drawImage(obj_temp_image, obj_image.x, obj_image.y, obj_image.width, obj_image.height)
		obj_main_ctx.restore()
	}
	obj_temp_image.src = obj_image.base64
}

const dither = (obj_ctx, uint_width, uint_height, str_algo) => {
	let image
	switch(str_algo){
		case 'atkinson':
			image = obj_ctx.getImageData(0, 0, uint_width, uint_height)
			canvas_dither.atkinson(image)
			obj_ctx.putImageData(image, 0, 0)
		break
		case 'floydsteinberg':
			image = obj_ctx.getImageData(0, 0, uint_width, uint_height)
			canvas_dither.floydsteinberg(image)
			obj_ctx.putImageData(image, 0, 0)
		break
		default:
		break
	}
}

const bitmap_1d_to_2d = (uint_width, uint_height, array_bitmap) => {
	let array_2d = []

	if(array_bitmap.length !== uint_width * uint_height * 4)
		return array_2d

	let offset = 0
	for(let i = 0; i < uint_height; i++){
		let row = []
		offset = i * uint_width * 4
		for(let j = offset, m = offset + uint_width * 4; j < m; j++){
			row.push(array_bitmap[j])
		}
		array_2d.push(row)
	}
	return array_2d
}

module.exports = {
	draw_rect,
	draw_text,
	draw_barcode,
	draw_review_star,
	draw_image,
	dither,
	bitmap_1d_to_2d,
}