<template>
    <div class="temp">
        <div class="title">
            <h3>{{newsDetailData.title}}</h3>
            <div class="info">
                {{newsDetailData.add_time | timeFilter("YYYY-MM-DD hh:mm:ss")}}
                <div>
                    浏览量: {{newsDetailData.click}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    分类：经济民生
                </div> 
            </div>
            <div class="content">
                <p v-html="newsDetailData.content"></p>
            </div>
        </div>
        <!-- 添加评论组件 -->
        <Comment :recCommentId="commentId"></Comment>
    </div>
</template>

<script>
import tool from "../tool/tool";
import Comment from "./sub/Comment.vue";
import { Indicator } from 'mint-ui';
export default {
    data () {
        return {
            newsDetailData: {},
            commentId: 0
        }
    },
    components: {
        Comment
    },
    created () {
        // 获取传过来的id值
        var id = this.$route.params.id;
        // console.log(this.$route.params);
        this.getNewsDetailData(id);
        this.commentId = id;
    },
    methods: {
        getNewsDetailData (id) {
            Indicator.open('Loading...');
            // 请求当前页面的数据
            // var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getnew/`+id;
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getnew/${id}`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.newsDetailData = res.body.message[0];
                    Indicator.close();
                },
                res => {
                    console.log("newsdetail页面请求新闻详情错误！");
                }
            );
        }
    }
}
</script>


<style scoped>
    .title h3 {
        color: lightgreen;
        text-align: center;
    }
    .info {
        display: flex;
        justify-content: space-between;
        color: rgba(0, 0, 0, 0.4)
    }
    .content {
        padding: 5px;
    }
</style>


