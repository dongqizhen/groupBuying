<template>
    <div class="comment">
        <h2>会员企业留言区<span>（仅限铂金、钻石会员）</span></h2>
        <div class="commentContainer">
            <ul v-if="commentList.length">
                <li v-for="(val,index) in commentList" :key="index">
                    <comment-list-item :commentData='val' :index="index" v-on:delete_commit="delete_commit"></comment-list-item>
                </li>
            </ul>
            <div v-else class="noComment">
                <img src="../../../../../static/images/sofa.png" alt="">
                <span>还没有企业发表留言，快来抢沙发~</span>
            </div>
        </div>
    </div>
</template>
<script>
    import commentListItem from "./commentListItem";

    export default {
        data() {
            return {};
        },
        components: {
            commentListItem
        },
        props: ["commentList"],
        created() {
            console.log("评论", this.commentList);
        },

        watch: {
            commentList(newVal) {
                console.log(newVal);
            }
        },
        methods: {
            delete_commit(id, index) {
                this.$emit("delete_commit", id, index);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../../../../static/scss/_commonScss";
    .comment {
        background-color: #fff;
        h2 {
            padding: 13px;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333333;

            border-bottom: $border_style;
            span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #aaaaaa;
            }
        }
        .noComment {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 240px;
            img {
                height: 59px;
                width: 57px;
            }
            span {
                color: #999;
                font-size: 12px;
                margin-top: 20px;
            }
        }
    }
</style>

