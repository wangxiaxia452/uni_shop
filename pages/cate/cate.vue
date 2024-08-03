<template>
	<view>
		<my-search @search="goToSearch"></my-search>
		<view class='scroll-view-container'>
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height:windowHeight+'px'}">
				<!-- <block 	> -->
					<view
					  v-for="(item, index) in cateList" 
					  :key="index"
					  :class="['left-scroll-view-item',index === active ? 'active': '']" 
					  @click="activeCateChange(index)"
					>
						{{item.cat_name}}
					</view>
				<!-- </block> -->
			</scroll-view>
			<scroll-view  class="right-scroll-view" scroll-y="true" :style="{height:windowHeight+'px'}" :scroll-top="scrollTop">
				<view class="right-scroll-view-item" v-for="(e,i) in subCateList" :key="i">
					<view class="cate-lv2-title">/ {{e.cat_name}} /</view>
					<view class="cate-lv3-list">
						<view 
						  class="cate-lv3-item" 
						  v-for="(ee,ii) in e.children" 
						  :key="ii"
						  @click="navGoodsList(ee.cat_id)"
						>
							<image :src="ee.cat_icon"></image>
							<text>{{ee.cat_name}}</text>
						</view>
					</view>
				</view>			
			</scroll-view>
		</view>
	</view>
</template>

<script>
	// import mySearch from '@/components/my-search/my-search.vue'
	export default {
		data() {
			return {
				windowHeight: 0,
				cateList: [],
				active: 0,
				subCateList: [],
				scrollTop: 0
			}
		},
		onLoad() {
			uni.getSystemInfo().then(res => {
				const { windowHeight } = res
				this.windowHeight = windowHeight - 50
			})
			this.getCateList()
			
		},
		methods: {
			 async getCateList() {
				 const { data: res } = await uni.$http.get('/api/public/v1/categories')
				 if(res.meta.status !== 200) uni.$showMsg()
				 this.cateList = res.message
				 this.subCateList = res.message[0].children
			 },
			 activeCateChange(index) {
				 this.active = index
				 this.subCateList = this.cateList[index].children
				 this.scrollTop = this.scrollTop === 0? 1: 0
			 },
			 navGoodsList(id) {
				 uni.navigateTo({
				 	url: '/subpkg/goods_list/goods_list?cid='+id
				 })
			 },
			 goToSearch() {
				 uni.navigateTo({
				 	url: '/subpkg/search/search'
				 })
			 }
			 
		
		}
	}
</script>

<style lang="scss"> 
    .scroll-view-container {
		display: flex;
		
		.left-scroll-view {
			width: 120px;
			
			.left-scroll-view-item { 
				line-height: 60px; 
				background-color: #f7f7f7; 
				text-align: center;
			    font-size: 12px;
				
				&.active {
					background-color: #fff;
					position: relative;
					
					&::before{
						content: '';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
			
		}
	
		.right-scroll-view-item {
			.cate-lv2-title {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}
			
			.cate-lv3-list {
				display: flex;
				flex-wrap: wrap;
				
				.cate-lv3-item {
					width: 33.3%;
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 10px;
					image {
						width: 60px;
						height: 60px;
					}
					text {
						font-size: 12px;
					}
				}
			}
		}
	
	}
</style>
