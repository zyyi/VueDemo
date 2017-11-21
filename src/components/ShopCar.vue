<template>
    <div class="temp">
        <h1>我是ShopCar.vue</h1>
    </div>
</template>

<script>
import tool from "../tool/tool";
import {getItem} from "../tool/localStorageHelper";
export default {
    data () {
        return {
            shopcarData: []
        }
    },
    created () {
        this.getShopCarData();
    },
    methods: {
        getShopCarData () {
            // 获取本地数据库中的数据
            var array = getItem();
            var message = {};
            for (var i = 0; i < array.length; i++) {
                var item = array[i];
                // 判断该id项有没有存在
                if (message[item.goodsId]) {
                    var count = message[item.goodsId];
                    count += item.count;
                    message[item.goodsId] = count;
                } else {
                    message[item.goodsId] = item.count;
                }
            }
            // console.log(message);
            // 遍历将key值存到一个数组中(都是id值)
            var tempArray = [];
            for (var key in message) {
                tempArray.push(key);
            }
            // 将数组拆分成字符串
            var ids = tempArray.join(",");
            // 向后台发送请求，读取数据
            var url = `${tool.HTTP}${tool.SERVER_PATH}/api/goods/getshopcarlist/${ids}`;
            this.$http.get(url).then(
                res => {
                    this.shopcarData = res.body.message;
                    console.log(this.shopcarData);
                },
                res => {
                    console.log("shopcar页面请求数据出错！");
                }
            );
        }
    }

}
</script>

<style>

</style>

