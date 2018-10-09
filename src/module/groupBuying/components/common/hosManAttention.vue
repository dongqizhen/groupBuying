<template>
    <div class="hosManAttention">
        <div class="leftBox">
            <div v-lazy-container="{ selector: 'img' }">
                <img :data-src="result.userImageUrl" data-error="../static/images/defaultAuthor.png" data-loading="../static/images/defaultAuthor.png" alt="">
            </div>
            <div class="nameAndHospital">
                <span class="name">{{result.userName}}</span>
                <slot name="hospitalName"></slot>
            </div>
        </div>
        <div class="rightBox">
            <attention-btn :isFollw="result.isFollw"></attention-btn>
        </div>
    </div>
</template>
<script>
    import attentionBtn from "./attentionBtn";
    export default {
        data() {
            return {};
        },
        props: ["result"],
        components: {
            attentionBtn
        }
    };
</script>
<style lang="scss" scoped>
    .hosManAttention {
        border-bottom: 0.5px solid #e9e9e9;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .leftBox {
            display: flex;
            padding: 15px 0 15px 13px;
            img {
                width: 46px;
                height: 46px;
                vertical-align: middle;
                border-radius: 50%;
                margin-right: 10px;
            }
            .nameAndHospital {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
        }
        .name {
            font-family: PingFangSC-Medium;
            font-size: 13px;
            color: #333;
        }
        .hospital {
            font-family: PingFangSC-Regular;
            font-size: 13px;
            color: #333;
        }
        .rightBox {
            margin-right: 23px;
        }
    }
</style>
