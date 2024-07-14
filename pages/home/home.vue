<template>
	<view>
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true"> <!-- 循环渲染轮播图的 item 项 -->
         <swiper-item v-for="(item, i) in swiperList" :key="i"> 
		    <navigator class="swiper-item" :url="`/subpkg/detail_goods/detail_goods? goods_id=${item.goods_id}`"><!-- 动态绑定图片的 src 属性 -->
                <image :src="item.image_src"></image> 
			</navigator>
		 </swiper-item> 
	  </swiper>
	  
	  <view class="nav-list">
		  <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="switchUrlHandle(item)">
			  <image class="nav-image" :src="item.image_src"></image>
		  </view>
	  </view>
	  
	  <view class="floor-list">
	  		  <view class="floor-item" v-for="(item, i) in floorList" :key="i">
	  			  <image class="floor-title" :src="item.floor_title.image_src"></image>
				  <view class="floor-img-view">
					  <navigator class="floor-left-img" :url="item.product_list[0].url">
						  <image 
							:src="item.product_list[0].image_src" 
							:style="{width:item.product_list[0].image_width+'rpx'}"
							mode="widthFix"
						  ></image>
					  </navigator>
					  <view class="floor-right-img">
						  <navigator 
						    class="floor-right-item" 
							v-for="(ee, i2) in item.product_list" 
							:key="i2"
							:url="ee.url"
						  >
							  <image
								:src="ee.image_src" 
								:style="{width: ee.image_width+'rpx'}"
								mode="widthFix"
								v-if="i2 !== 0"
							  ></image>
						  </navigator>
					  
					  </view>
				  </view>
	  		  </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			}
		},
		onLoad() {
			this.getSwiperList();
			this.getNavList();
			this.getFloorList();
		},
		methods: {
			async getSwiperList() {
				const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200)uni.$showMsg();
				this.swiperList = res.message
			},
			async getNavList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200)uni.$showMsg();
				this.navList = res.message
			},
			switchUrlHandle(e) {
				if(e.name === '分类'){
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200)uni.$showMsg();
				res.message.map(e => {
					e.product_list.map(ee => {
						ee.url = ee.navigator_url.replace('/pages','/subpkg/goods_list')
					})
				})
				console.log('wx',res.message)
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
 swiper { 
	height: 330rpx; 
    .swiper-item, image { 
		width: 100%; 
		height: 100%; 
	}
}

.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-image {
		width: 128rpx;
		height: 140rpx;
	}
}

.floor-list {
	.floor-title { height: 60rpx; width: 100%; display: flex; }
	.floor-img-view {
		display: flex;
		padding: 10rpx;
		.floor-right-img {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
		}
		.floor-right-item {
			display: flex;
			justify-content: space-around;
			padding-left: 10rpx;
		}
	}
	
}
</style>

