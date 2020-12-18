<template>
	<view class="content">
		<div class="title">{{ pageData.contentTitle }}</div>
		<div class="times">{{ pageData.createTime | formatDate }}</div>
		<div class="con">
			<rich-text type="text" :nodes="html"></rich-text>
		</div>
	</view>
</template>

<script>
	let graceRichText = require("../../static/richText.js");
	import {
		formatDate
	} from "@/static/formatDate.js";
	export default {
		data() {
			return {
				html: '',
				pageData: {}
			}
		},
		onLoad(option) {
			console.log(option.id)
			// console.log(formatDate)
			this.init(option.id)
		},
		filters: {
			//方法一: yyyy-MM-dd hh:mm
			formatDate(time) {
				let date = new Date(time);
				console.log(new Date(time));
				return formatDate(date, "yyyy-MM-dd hh:mm:ss");
			},
		},
		methods: {
			async init(id) {
				let data = {
					id
				};
				let [err, res] = await this.$http.post("/app/provincialChannelController/getContent", data);
				// console.log(res.data.result.list[0].contentDetail);
				this.html = graceRichText.format(res.data.result.list[0].contentDetail);
				this.pageData = res.data.result.list[0];
			},
		}
	}
</script>

<style>
	.content {
		margin: 20upx;
	}

	.title {
		font-size: 34upx;
		margin-bottom: 10upx;
		color: #000;
		font-weight: 700;
	}

	.times {
		font-size: 24upx;
		margin-bottom: 20upx;
		color: #999999;
	}

	.con {}
</style>
