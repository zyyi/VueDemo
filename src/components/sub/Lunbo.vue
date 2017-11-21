
<template>

    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item, index) in lunboData" :key="index">
                <a :href="item.url">
                    <img class="img" v-if="item.url" :src="item.img" alt="">
                    <img class="img" v-else :src="item.src" alt="">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </div>
    
</template>

<script>
export default {
    
    // 接收Home传过来的数据
    props: ["lunboData"]

}
</script>

<style>
    /* 轮播图样式 */
    .mint-swipe {
        height: 200px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        margin-bottom: 20px;
    }

    .mint-swipe-item {
      line-height: 200px;
    }

    .img {
      width: 100%;
      height: 100%;
    }
</style>


