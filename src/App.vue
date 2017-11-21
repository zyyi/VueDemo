<template>
  
    <div>
        <!-- 1.导航部分 -->
		<!-- <mt-header fixed title="Vue项目"></mt-header> -->
        <mt-header fixed title="Vue项目">
			<router-link to="/" slot="left">
    			<mt-button v-if="isShow" @click="goBack" icon="back">返回</mt-button>
  			</router-link>
		</mt-header>


        <!-- 2.中间各个组件之间的切换部分 -->
        <router-view></router-view>


        <!-- 3.底部tabbar部分 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-person"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span id="badge" class="mui-badge">0</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>

    </div>

</template>

<script>
import {bus} from "./tool/bus";
bus.$on("badgeCount", function (data) {
	var badge = document.getElementById("badge");
	// 减0 是为了让其转换成number类型
	var badgeNum = badge.innerHTML - 0;
	badgeNum += data;
	badge.innerHTML = badgeNum;
});
export default {
	data () {
		return {
			isShow: false		
		}
	},
	watch: {
		"$route": function (newValue, oldValue) {
			// console.log(newValue);
			// console.log(oldValue);
			if (newValue.path == "/home") {
				// 如果是home页面，则干掉消失按钮
				this.isShow = false;
			} else {
				this.isShow = true;
			}
		}
	},
	methods: {
		goBack () {
			// 返回上一页
			this.$router.go(-1);
		}
	}
}
</script>

<style>

</style>

