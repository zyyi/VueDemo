<template>
    <div class="temp">
        <Comment :recCommentId="receiveID"></Comment>
    </div>
</template>

<script>
import Comment from "./sub/Comment.vue";
export default {
    components: {
        Comment
    },
    data () {
        return {
            receiveID: 0
        }
    },
    created () {
        var id = this.$route.params.id;
        this.receiveID = id;
    }
}
</script>

<style>

</style>
