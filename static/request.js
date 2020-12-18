/*
封装请求拦截
*/
export default {
	//设置默认配置
	config: {
		baseUrl: 'http://test.zhizhaowang.cn:8883', //api请求前缀
		header: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Content-Type': 'application/x-www-form-urlencoded',
			"Content-Type": "application/json"
		},
		data: {},
		method: "GET",
		dataType: "json",
	},
	request(options = {}) {
		//options不传为默认配置
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		options.dataType = options.dataType || this.config.dataType;
		options.url = this.config.baseUrl + options.url;

		let promise = new Promise(function (resolve, reject) {
			uni.request(options).then(
				(res) => {
					resolve(res)
				}
			).catch(
				(response) => {
					reject(response)
				}
			)
		})
		return promise
	},
	get(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'GET';
		return this.request(options);
	},
	post(url, data, options = {}) {
		options.url = url;
		options.data = data;
		options.method = 'POST';
		return this.request(options);
	},
	// 上传图片
	upload(url, options = {}) {
		options.url = this.config.baseUrl + url;
		options.header = options.header || this.config.header;
		options.fileType = options.fileType || "image";
		options.formData = options.formData || {};
		options.filePath = options.filePath;
		options.name = options.name;
		return uni.uploadFile(options);
	},
}