<template>
    <!-- 评论区 -->
    <div class="comment">
        <!-- 提交评论 -->
        <div class="submitComment">
            <h3>提交评论</h3>
            <textarea ref="textArea" placeholder="请输入评论内容">
            </textarea>
            <mt-button @click="submitComment" type="primary" size="large">发表</mt-button>
        </div>
        <!-- 展示评论 -->
        <div class="showComment">
            <h3>展示评论</h3>
            <ul>
                <li v-for="(item, index) in commentListData" :key="index">
                    <p>{{item.content}}</p>
                    <div class="info">
                        {{item.user_name}}
                        <div class="timeInfo">
                            {{item.add_time | timeFilter("YY/MM/DD hh:mm:ss")}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .comment {
        margin-top: 20px;
    }
    .comment textarea {
        resize: none;
        width: 100%;
        height: 100px;
        display: block;
        margin: 10px 0;
        font-size: 14px;
    }
    .showComment {
        margin-top: 10px;
    }
    .showComment h3 {
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    .showComment ul {
        list-style: none;
        padding: 0 5px;
    }
    .showComment ul li {
        margin-bottom: 10px;
        border-bottom: 1px solid #ccc;
    }
    .showComment p {
        margin-bottom: 5px;
    }
    .info {
        display: flex;
        justify-content: space-between;
        color: lightcoral;
        font-size: 12px;
    }
</style>

<script>
import tool from "../../tool/tool";
import { Toast } from 'mint-ui';
export default {
    data () {
        return {
            commentListData: []
        }
    },
    props: ["recCommentId"],
    created () {
        this.getComment();
    },
    methods: {
        // 提交评论
        submitComment () {
            // 获取textarea里面输入的内容
            var contentValue = this.$refs.textArea.value;
            // 对获取的内容进行判断验证
            if (!contentValue || contentValue.trim() == "") {
                Toast("请输入内容后再进行提交！");
                return ;
            }
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/postcomment/${this.recCommentId}`;
            // post方式提交数据
            this.$http.post(url, {content: contentValue}, {emulateJSON: true}).then(
                res => {
                    // console.log(res);
                    Toast("评论成功！");
                    // 将textarea里面的内容置为空
                    this.$refs.textArea.value = "";
                    this.getComment();
                },
                res => {
                    Toast("评论失败！");
                    console.log("comment页面提交评论错误");
                }
            );
        },
        // 获取评论
        getComment () {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getcomments/${this.recCommentId}?pageindex=1`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.commentListData = res.body.message;
                },
                res => {
                    console.log("comment页面获取评论列表信息错误！");
                }
            );
        }
    }
}
</script>



