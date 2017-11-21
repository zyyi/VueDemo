<template>
    <div class="temp">
        <div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li v-for="(item, index) in goodsListData" :key="index" class="mui-table-view-cell mui-media mui-col-xs-6">
		            <router-link :to='"/goodsinfo/" + item.id'>
		                <img class="mui-media-object" :src="item.img_url">
		                <div class="goodsInfo">
                            <p class="title">{{item.title}}</p>
                            <div class="goodsPrice">
                                <div>
                                    <span class="sellPrice">￥{{item.sell_price}}</span>
                                    <span class="marketPrice">￥{{item.market_price}}</span>
                                </div>
                                <div class="stock">库存: {{item.stock_quantity}}件</div>
                            </div>
                        </div>
                    </router-link>
                </li>
		    </ul>    
		</div>
    </div>
</template>

<style scoped>
    .mui-content>.mui-table-view:first-child {
        margin-top: 0;
    }
    .goodsInfo {
        font-size: 14px;
        color: #999;
        padding: 0 5px;
    }
    .goodsInfo .title {
        white-space: pre-wrap;
        font-size: 14px;
    }
    .marketPrice {
        text-decoration: line-through;
    }
    .goodsPrice {
        display: flex;
        justify-content: space-between;
    }
    .stock {
        color: #333;
    }
</style>



<script>
import tool from "../tool/tool";
export default {
    data () {
        return {
            goodsListData: []
        }
    },
    created () {
        this.getGoodsListData();
    },
    methods: {
        getGoodsListData () {
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/getgoods?pageindex=1`
            this.$http.get(url).then(
                res => {
                    console.log(res);
                    this.goodsListData = res.body.message;
                },
                res => {
                    console.warn("googslist商品列表页面请求数据出现错误！");
                }
            );
        }
    }
  
}
</script>


