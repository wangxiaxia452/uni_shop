<template>
	<view class="my-search-container">
		<view class="my-search-box" @click="goToSearch">
			<uni-icons type="search" size="30"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/uni_modules/uni-icons/components/uni-icons/icons.js';
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods: {
			goToSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
   .my-search-container {
	   background-color: #c00000; 
	   height: 50px; 
	   padding: 0 10px; 
	   display: flex; 
	   align-items: center;
	   
	   .my-search-box {
		   width: 100%;
		   height: 36px;
		   background-color: #fff;
		   border-radius: 16px;
		   display: flex;
		   justify-content: center;
		   align-items: center;
		   
		   .placeholder{
			   font-size: 15px;
			   margin-left: 5px;
		   }
	   }
   }
</style>