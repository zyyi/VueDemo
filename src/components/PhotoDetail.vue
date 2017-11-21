<template>
    <div class="temp">
        <!-- 标题头部信息 -->
        <div class="title">
            <h4>{{photoDetail.title}}</h4>
            {{photoDetail.click}}浏览&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;分类：经济民生
        </div>
        <!-- 多张图片展示 -->
        <div class="mui-content" >
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item, index) in photos" :key="index"  v-preview="item.src" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img :src="item.src"  alt="">
                </li>
            </ul> 
        </div>
        <!-- 图片预览 -->
        <lg-preview class="preview"></lg-preview>
        <!-- 内容部分 -->
        <div class="content" v-html="photoDetail.content"></div>
        <!-- 评论部分 -->
        <comment :recCommentId="commentId"></comment>
    </div>
</template>

<style scoped>
    .temp {
        background-color: #f2f2f2;
        padding-left: 10px;
        padding-right: 10px;
    }
    .title {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.7);
    }
    .title h4 {
        color: skyblue;
        font-size: 16px;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        padding: 5px;
    }
    .mui-content a {
        display: block;
    }
    .mui-content img {
        vertical-align: top;
        width: 100%;
    }
    .preview {
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .content {
        font-size: 13px;
        color: #666;
    }
</style>


<script>
import tool from "../tool/tool";
import Comment from "./sub/Comment.vue";
import { Indicator } from 'mint-ui';

export default {
    components: {
        Comment,
    },
    data () {
        return {
            photoDetail: {},
            photos: [],
            commentId: 0
        }
    },
    created () {
        var id = this.$route.params.id;
        this.commentId = id;
        this.getPhotoDetail(id);
        this.getPhotosList(id);
    },
    methods: {
        getPhotoDetail (id) {
            var url =  `${tool.HTTP}${tool.SERVER_PATH}/api/getimageInfo/${id}`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.photoDetail = res.body.message[0];
                },
                res => {
                    console.log("photodetail页面请求图片详细信息错误！");
                }
            );
        },
        getPhotosList (id) {
            Indicator.open('Loading...');
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getthumimages/${id}`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.photos = res.body.message;
                    Indicator.close();
                },
                res => {
                    console.log("getPhotoslist请求多张图片信息错误！");
                    Indicator.close();
                }
            );
        }
    }
  
}
</script>




