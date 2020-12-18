<template>
	<view class="content">
		<rich-text type="text" :nodes="html"></rich-text>
	</view>
</template>

<script>
	let graceRichText = require("../../static/richText.js");
	export default {
		data() {
			return {
				html: ''
			}
		},
		onLoad(option) {
			console.log(option.id)
			this.init(option.id)
		},
		methods: {
			async init(id) {
				let data = {
					id
				};
				let [err, res] = await this.$http.post("/app/provincialChannelController/getContent", data);
				// console.log(res.data.result.list[0].contentDetail);
				this.html = graceRichText.format(res.data.result.list[0].contentDetail)

			},
		}
	}
</script>

<style>

</style>
