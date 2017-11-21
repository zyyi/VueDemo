<template>
    <div class="temp">
        <!-- 轮播图 -->
        <Lunbo :lunboData="goodsLunboData"></Lunbo>
        <!-- 商品描述详细信息 -->
        <div class="goodsDesc">
            <h4>{{goodsDescData.title}}</h4>
            <div class="goodsPrice">
                市场价：<del>￥{{goodsDescData.market_price}}</del>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                销售价：<span class="red">￥{{goodsDescData.sell_price}}</span>
            </div>
            <div class="number">
                购买数量：<Number v-on:toFather="getNumber"></Number>
                <transition
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:after-enter="afterEnter"
                >
                    <div v-if="isShow" class="ball"></div>
                </transition>
            </div>
            <!-- 按钮 -->
            <div class="btn">
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small" @click="shoppingCar">加入购物车</mt-button>
            </div>
            <!-- 商品参数 -->
            <div class="info">
                <h5>商品参数</h5>
                <ul>
                    <li>商品货号：{{goodsDescData.goods_no}}</li>
                    <li>库存情况：{{goodsDescData.stock_quantity}}</li>
                    <li>上架时间：{{goodsDescData.add_time | timeFilter("YYYY-MM-DD")}}</li>
                </ul>
            </div>
            <!-- 介绍与评论 -->
            <div class="btns">
                <!-- plain可以使背景镂空 -->
                <mt-button plain type="primary" size="large" @click="goToDesc">图文介绍</mt-button>
                <mt-button class="bottomBtn" plain type="danger" size="large" @click="goToDis">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .goodsDesc h4 {
        color: lightskyblue;
    }
    .goodsPrice {
        font-size: 12px;
    }
    .goodsPrice .red {
        color: red;
        font-size: 16px;
    }
    .number {
        position: relative;
        display: flex;
        margin-top: 5px;
    }
    .btn {
        display: flex;
        justify-content: space-around;
        margin-top: 5px;
    }
    .info {
        margin-top: 20px;
    }
    .info h5 {
        border-bottom: 1px dashed #ccc;
        line-height: 30px;
    }
    .info ul {
        list-style: none;
        color: #333;
        border-bottom: 1px solid #ccc;
        padding: 20px;
        margin: 0;
    }
    .btns {
        padding: 5px;
    }
    .bottomBtn {
        margin-top: 10px;
    }
    .ball{
        width: 35px;
        height: 35px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left: 127px;
        top: -4px;
        /* transition: all 1s cubic-bezier(1,-1.07,.9,.31); */
        transition: all 1s cubic-bezier(.80,-0.33,1,.55);
    }
</style>

<script>
import Lunbo from "./sub/Lunbo.vue";
import tool from "../tool/tool";
import Number from "./sub/Number.vue";
import {setItem} from "../tool/localStorageHelper";
import {bus} from "../tool/bus";
export default {
    data () {
        return {
            goodsLunboData: [],
            goodsDescData: {},
            receiveNum: 1,
            isShow: false
        }
    },
    components: {
        Lunbo,
        Number
    },
    created () {
        var id = this.$route.params.id;
        this.getGoodsLunboData(id);
        this.getGoodsDescData(id);
    },
    methods: {
        // 获取轮播图信息
        getGoodsLunboData (id) {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getthumimages/${id}`;
            this.$http.get(url).then(
                res => {
                    // console.log(res);
                    this.goodsLunboData = res.body.message;
                },
                res => {
                    console.log("goodsinfo页面请求轮播图数据出错！");
                }
            );
        },
        // 获取内容描述信息
        getGoodsDescData (id) {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/goods/getinfo/${id}`;
            this.$http.get(url).then(
                res => {
                    console.log(res);
                    this.goodsDescData = res.body.message[0];
                },
                res => {
                    console.log("goodsinfo页面请求商品描述信息出错！");
                }
            );
        },
        // 接收number组件传过来的值(加入购物车的数量)
        getNumber (num) {
            // console.log(num);
            this.receiveNum = num;
        },
        // 图文介绍 跳转到goodsdesc页面的js方法
        goToDesc () {
            var descId = this.$route.params.id;
            // $router.push 可以使页面进行跳转
            this.$router.push({
                name: "goodsdesc", 
                params: {id: descId}
            });
        },
        // 评论，跳转到Discuss页面的方法
        goToDis () {
            var disId = this.$route.params.id;
            this.$router.push({
                name: "discuss",
                params: {id: disId}
            });
        },
        // 加入购物车
        shoppingCar () {
            // 1.获取id和加入购物车数量
            var id = this.$route.params.id;
            var count = this.receiveNum;
            var data = {"goodsId": id, "count": count};
            // 2.将数据存入到本地数据库
            setItem(data);
            // 3.设置小球动画
            this.isShow = !this.isShow;
            // 4.更改tabar上面的badge（徽章）的值
            bus.$emit("badgeCount", this.receiveNum);
        },
        // 过渡动画的钩子方法
        beforeEnter: function (el) {
            el.style.transform = "translate3d(0,0,0)";
        },
        // 此回调函数是可选项的设置，与css结合时使用
        enter: function (el, done) {
            var width = el.offsetWidth;
            el.style.transform = "translate3d(150px, 400px, 0px)";
            done();
        },
        afterEnter: function (el) {
            this.isShow = !this.isShow;
        }
    }
}
</script>

