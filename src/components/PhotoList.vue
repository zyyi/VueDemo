<template>
    <div class="temp">
        <!-- 分类列表 -->
        <ul class="menu">
            <li v-if="isTrue"><a @click="getImageData(0)">全部</a></li>
            <li v-for="(item, index) in newsListData" :key="index">
                <a @click="getImageData(item.id)">{{item.title}}</a>
            </li>
        </ul>
        <!-- 图片信息列表 -->
        <div class="image" v-for="(item, index) in imageData" :key="index">
            <router-link :to='"/photodetail/"+item.id'>
                <img :src="item.img_url" alt="">
                <div class="zhaiyao">
                    <p>{{item.zhaiyao}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>


<style scoped>
    .menu {
        margin: 0;
        padding: 0 5px;
        list-style: none;
        display: flex;
        overflow-x: auto;
    }
    .menu li {
        /* flex-shrink: 0; */
        white-space: nowrap;
        margin: 5px 10px 5px 0px;
        font-size: 14px;
    }
    .image {
        position: relative;
    }
    .image img {
        width: 100%;
        height: auto;
    }
    .zhaiyao p {
        position: absolute;
        bottom: 0px;
        left: 0px;
        color: #fff;
        padding: 5px 10px;
    }
</style>


<script>
import tool from "../tool/tool";
import { Indicator } from 'mint-ui';
export default {
    data () {
        return {
            newsListData: [],
            isTrue: false,
            imageData: []
        }
    },
    created () {
        this.getPhotoListData();
        this.getImageData(0);
    },
    methods: {
        getPhotoListData () {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getimgcategory`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.newsListData = res.body.message;
                    this.isTrue = true;
                },
                res => {
                    console.warn("photolist页面请求分类错误！");
                }
            );
        },
        getImageData (id) {
            Indicator.open('Loading...');
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getimages/${id}`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.imageData = res.body.message;
                    Indicator.close();
                },
                res => {
                    console.warn("photolist页面请求图片数据错误！");
                    Indicator.close();
                }
            );
        }

    }
}
</script>

