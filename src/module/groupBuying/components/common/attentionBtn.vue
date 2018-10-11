<template>

    <div class="attentionBtn" @click.stop="triggleSrc">
        <img v-if="isFollw==0" src="../../../../../static/images/attention-active.png">
        <img v-else-if="isFollw==1" src="../../../../../static/images/attention.png" alt="" srcset="">
        <img v-else src="../../../../../static/images/attention-each.png" alt="">
    </div>
</template>
<script>
    import { _getData } from "../../service/getData";
    export default {
        data() {
            return { isAttention: false };
        },
        props: ["isFollw"],
        methods: {
            triggleSrc() {
                this.isAttention = !this.isAttention;
                _getData(
                    "/server/followBusiness!request.action",
                    {
                        method: "addOrDeleteFollow",

                        params: {
                            id: "316", //业务id
                            controlflag: 0 //1表示取消，0表示添加（传的是现在的状态）
                        }
                    },
                    data => {
                        console.log(data);
                    }
                );
            }
        },
        computed: {
            isFollwed() {
                return this.triggleSrc();
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

