<template>
    <div class="temp">
        <div class="title">
            <h3>{{goodsDescData.title}}</h3>
        </div>
        <div class="content">
            <p v-html="goodsDescData.content"></p>
        </div>
    </div>
</template>

<style >
    .temp {
        padding-left: 5px;
        padding-right: 5px;
    }
    .title h3 {
        text-align: center;
    }
    .content img {
        width: 100%;
    }
</style>

<script>
import tool from "../tool/tool";
export default {
    data () {
        return {
            goodsDescData: {}
        }
    },
    created () {
        var id = this.$route.params.id;
        this.getDescData(id);
    },
    methods: {
        getDescData (id) {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/goods/getdesc/${id}`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.goodsDescData = res.body.message[0];
                },
                res => {
                    console.log("goodsdesc页面请求图文信息错误！");
                }
            );
        }
    }
}
</script>



