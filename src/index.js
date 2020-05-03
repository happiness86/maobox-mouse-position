import './index.css'
export class MousePosition {
	// 默认配置
	options = {
		accuracy: 5, // 经纬度精度
		duration: 1500 // tooltip显示时间
	}
	_lngLat = {
		lng: 0,
		lat: 0
	}
	constructor (options = {}) {
		if (Object.keys(options).length > 0) {
			if (options.accuracy && typeof options.accuracy !== 'number') {
				throw new TypeError('The expected value of accuracy is a numeric type')
			}
			if (options.duration && typeof options.duration !== 'number') {
				throw new TypeError('The expected value of duration is a numeric type')
			}
			this.options = Object.assign({}, this.options, options)
		}
	}
	onAdd (map) {
		this._map = map
		this._container = document.createElement('div')
		this._container.classList.add('mapboxgl-ctrl') // 添加mapbox类名
		this._container.classList.add('__mouse__position')
		this._getLngLat()
		return this._container
	}

	// 获取经纬度坐标
	_getLngLat () {
		const _this = this
		_this._map.on('click', function (e) {
			debugger
			if (_this.options.accuracy && typeof _this.options.accuracy === 'number') {
				_this._lngLat.lng = e.lngLat.lng.toFixed(5) // 经度
				_this._lngLat.lat = e.lngLat.lat.toFixed(5) // 纬度
				_this._container.innerText = `经度：${e.lngLat.lng.toFixed(5)}    纬度：${e.lngLat.lat.toFixed(5)}`
				_this._copyLngLat()
			} else {
				throw new TypeError('The expected value of accuracy is a numeric type')
			}
		})
	}

	// 点击copy经纬度
	_copyLngLat () {
		const _this = this
		this._container.addEventListener('click', function (e) {
			_this.simpleCopy(_this._lngLat)
		}, true)
	}

	// 简单copy
	simpleCopy (lngLat, cb) {
		const input = document.createElement('input')
		input.setAttribute('id', '__mouse__position_input')
		input.value = `${lngLat.lng}  ${lngLat.lat}`
		document.querySelector('body').appendChild(input)
		input.select()
		document.execCommand('copy')
		document.body.removeChild(input)
		this.copyTip() // copy成功回调函数
	}

	// copy成功提示
	copyTip () {
		const _this = this
		if (!this._tip) {
			const tip = document.createElement('div')
			this._tip = tip
			tip.classList.add('__mouse__status')
			const svg = `<div><svg t="1588512684752" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2024" width="16" height="16">
<path d="M435.2 768L908.8 294.4 864 249.6 412.8 700.8l-230.4-230.4-44.8 44.8 252.8 252.8z" fill="#67C23A" p-id="2025"></path></svg></div>
<span>已复制</span>`
			tip.innerHTML = svg
			this._container.appendChild(tip)
			_this.timer = setTimeout(function () {
				_this._tip.parentNode.removeChild(_this._tip)
				_this._tip = null
			}, _this.options.duration)
		}
	}

	getDefaultPosition () {
		return 'bottom-right'
	}

	onRemove () {
		this._container.parentNode.removeChild(this._container)
		this._map = undefined
		this.timer = null
	}
}
mapboxgl.MousePosition = MousePosition
