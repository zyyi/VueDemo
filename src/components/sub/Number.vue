
<template>
    <div class="num">
        <div class="left" @click="sub">-</div>
        <div class="middle">{{num}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            num: 1
        }
    },
    methods: {
        sub () {
            if (this.num <= 1) {
                return ;
            }
            this.num--;
            // 传值
            this.submitNumber();
        },
        add () {
            this.num++;
            // 传值
            this.submitNumber();
        },
        submitNumber () {
            this.$emit("toFather", this.num);
        }
    }
}
</script>

<style scoped>
    .num {
        display: flex;
    }
    .left,
    .right {
        border: 1px solid #ccc;
        width: 35px;
        height: 25px;
        text-align: center;
    }
    .middle {
        border: 1px solid #ccc;
        margin: 0 2px;
        width: 45px;
        height: 25px;
        text-align: center;
    }
</style>
