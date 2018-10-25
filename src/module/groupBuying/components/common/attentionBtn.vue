<template>

    <div class="attentionBtn" @click.stop="triggleSrc(isAttention)" v-if="isShowBtn">
        <img v-if="isAttention==0" src="../../../../../static/images/attention-active.png">
        <img v-else-if="isAttention==1" src="../../../../../static/images/attention.png" alt="" srcset="">
        <img v-else src="../../../../../static/images/attention-each.png" alt="">
    </div>
</template>
<script>
    import { _getData } from "../../service/getData";
    export default {
        data() {
            return { isAttention: this.result.isFollw };
        },
        props: ["result"],
        methods: {
            triggleSrc(status) {
                // this.isAttention = !this.isAttention;

                _getData(
                    `${this.$API_URL.WEB_URL}/server/follow!request.action`,
                    {
                        method: "addOrDeleteFollow",
                        params: {
                            followId: this.result.userId,
                            controlflag: status == 1 || 2 ? 0 : 1
                        }
                    },
                    data => {
                        console.log(data);
                        this.isAttention = data.status;
                    }
                ).then(() => {});
            }
        },
        computed: {
            isFollwed() {
                return this.triggleSrc();
            },
            isShowBtn() {
                return this.$USER_INFO.userid != this.result.userId;
            }
        },
        watch: {
            result(newVal) {
                this.isAttention = newVal.isFollw;
            }
        }
    };
</script>
<style lang="scss" scoped>
    .attentionBtn {
        img {
            width: 70px;
            height: 28px;
            vertical-align: middle;
        }
    }
</style>

