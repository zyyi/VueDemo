<template>
    <div class="temp">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in newsListData" :key="index">
                <!-- <router-link v-bind='{to:"/newsdetail/"+item.id}'> -->
                <router-link :to='"/newsdetail/"+item.id'>
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class='mui-ellipsis'>发布时间：{{item.add_time | timeFilter("YY-MM-DD hh:mm:ss")}} <span>点击量：{{item.click}}</span></p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
// 引入数据地址链接
import tool from "../tool/tool";
export default {
    data () {
        return {
            newsListData: []
        }
    },
    created () {
        this.getNewsListData();
    },
    methods: {
        getNewsListData () {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getnewslist`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.newsListData = res.body.message;
                },
                res => {
                    console.log("请求数据列表失败！");
                }
            );
        }
    }
}
</script>

<style scoped>
    .mui-media-body span {
        float: right;
        font-weight: bold;
        font-size: 12px;
        color: #000;
    }
</style>

