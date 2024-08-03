<template>
	<view>
		<view class="search-box">
			<uni-search-bar @confirm="" @input="searchVal" :radius="100" cancelButton="none"/>
		</view>
		
		<view class="sugg-list" v-if="searchList.length > 0">
			<view 
			  ws5e6 class="sugg-item" 
			  v-for="(item, index) in searchList" 
			  :key="index"
			  @click="goToDetailPage(item.goods_id)"
			>
				<view class="sugg-text">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<view class="history-container" v-else>
			<view class="history-title">
				<text>搜索历史</text> 
				<uni-icons type="trash" size="17" @click="delHistoryVal"></uni-icons>
			</view>
			<view class="history-con">
				<uni-tag 
				:text="item"  
				v-for="(item, index) in historyList" 
				:key="index"
				@click="gotoGoodsList(item)"
				></uni-tag>
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniSearchBar from '../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue';
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/icons.js';
	import uniTag from '@/uni_modules/uni-tag/components/uni-tag/uni-tag.vue'
	let timer = null
	let debounce = (fn, time) => {
		// return function() {
			clearTimeout(timer)
			timer = setTimeout(() => {
				fn.apply(this, arguments)
			},time)
		// }
	}
	export default {
		data() {
			return {
				// timer: null,
				keyword: '',
				searchList: [],
				historyList: []
			};
		},
		//老师教的
		// computed: {
		// 	historys() {
		// 		return this.historyList.reverse()
		// 	}
		// },
		onLoad() {
		   this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		methods: {
			searchVal(val){
				// clearTimeout(this.timer)
				// this.timer = setTimeout(() => {
				// 	 this.keyword = val
				// 	 console.log('wx',val)
				// },500)
				debounce(() => {
					 this.keyword = val
					 if(val) {
						 this.getSearchList()
					 }else {
						 this.searchList = []
					 }
				},500)
			},
			async getSearchList() {
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.keyword })
				if(res.meta.status !== 200) uni.$showMsg()
				this.searchList = res.message
				this.saveKeyword()
			},
			goToDetailPage(id) {
				uni.navigateTo({
					url: '/subpkg/detail_goods/detail_goods?goods_id='+ id
				})
			},
			
			saveKeyword() {
				this.historyList.unshift(this.keyword)
				this.historyList = [...new Set(this.historyList)]
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
				//老师教的
				// // 1. 将 Array 数组转化为 Set 对象 
				// const set = new Set(this.historyList) 
				// // 2. 调用 Set 对象的 delete 方法，移除对应的元素 
				// set.delete(this.kw) 
				// // 3. 调用 Set 对象的 add 方法，向 Set 中添加元素 
				// set.add(this.kw) 
				// // 4. 将 Set 对象转化为 Array 数组 
				// this.historyList = Array.from(set)
			},
			delHistoryVal() {
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+ item
				})
			}
		}
	}
</script>

<style lang="scss">
   .search-box{
	   position: sticky;
	   top:0;
	   z-index: 999;
   }
   .uni-searchbar { 
	   display: flex; 
       flex-direction: row; 
	   position: relative; 
	   padding: 16rpx; /* 将默认的 #FFFFFF 改为 #C00000 */ 
	   background-color: #c00000; 
	}
	
	.sugg-list {
		padding: 0 5px;
		.sugg-item {
			font-size: 12px; 
			padding: 13px 0; 
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.sugg-text {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 3px;
			}
			
		}
	}
	
	.history-container {
		padding: 0 5px;
		
		.history-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 40px;
			font-size: 13px; 
			border-bottom: 1px solid #efefef;
		}
		
		.history-con {
			display: flex;
			flex-wrap: wrap;
			.uni-tag {
				margin-right: 5px;
				margin-top: 5px;
			}
		}
		
	}
</style>
