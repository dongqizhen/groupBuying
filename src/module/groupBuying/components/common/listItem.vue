<template>
    <router-link to="/Details" @click.native="clickLink">
        <div class="listItem">
            <h2>{{dataValue.mainName}}</h2>
            <div class="title">{{dataValue.viceName}}</div>
            <div class="time_box">
                <div class="left">
                    <p>
                        时间：
                        <span>{{dataValue.dateArea}}</span>
                    </p>
                    <p>
                        地点：
                        <span>安徽省·合肥市
                            <i :class=""></i>
                        </span>

                    </p>
                </div>
                <div class="right">
                    <span>已参加团购的有:</span>
                    <span>
                        <a>{{dataValue.hospitalNum}}</a>家医院
                        <a>{{dataValue.companyNum}}</a>家企业
                    </span>

                </div>
            </div>
            <i class="topLeft"></i>
            <i class="topRight"></i>
        </div>
    </router-link>

</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            clickLink() {
                this.$store.commit("setTransition", "turn-on");
            }
        },
        props: ["dataValue"],
        computed: {
            addClass() {
                switch (this.dataValue.leveName) {
                    case "全国团购":
                        return "National";
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .listItem {
        padding: 30px 12px 15.5px;
        position: relative;
        background: rgba(255, 255, 255, 0.03);
        border: 0.5px solid rgba(254, 75, 79, 0.2);
        //box-shadow: 0 2px 7px 0 rgba(97,176,42,0.10);
        box-shadow: 0.5px 2px 7px 0.5px rgba(254, 74, 75, 0.09);
        font-family: PingFangSC-Medium;
        color: #333333;
        height: 155px;
        margin-bottom: 10px;
        width: 100%;
        .topLeft,
        .topRight {
            position: absolute;
            display: block;
            height: 20px;
            width: 60px;
            top: 0;
            background: url("../../../../../static/images/progress.png") no-repeat
                center;
            background-size: 100% 100%;
        }
        .topLeft {
            left: 0;
        }
        .topRight {
            background: url("../../../../../static/images/nationwide.png") no-repeat
                center;
            right: 0;
            background-size: 100% 100%;
        }
        h2 {
            font-size: 12px;
            margin-bottom: 10px;
        }
        .title {
            font-size: 15px;
            margin-bottom: 21.5px;
        }
        .time_box {
            display: flex;
            font-size: 12px;
            .left {
                width: 50%;
                color: #999;
                p {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    &:first-child {
                        margin-bottom: 17px;
                    }
                    span {
                        color: #151515;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        i {
                            display: flex;
                            height: 13px;
                            width: 10px;
                            background: url("../../../../../static/images/site.png")
                                no-repeat center;
                            background-size: 100% 100%;
                            margin-left: 3px;
                            //margin-top: 2px;
                        }
                    }
                }
            }
            .right {
                width: 50%;
                color: #666666;
                padding-left: 15px;
                font-family: PingFangSC-Regular;
                font-size: 10px;
                color: #666666;
                span {
                    display: block;
                    &:first-child {
                        margin-bottom: 10.5px;
                    }
                    a {
                        font-family: BebasNeue, Arial, Helvetica, sans-serif;
                        font-size: 24px;
                        color: #feb930;
                        margin-right: 4px;
                    }
                }
            }
        }
    }
</style>