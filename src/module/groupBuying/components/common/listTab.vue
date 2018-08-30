<template>
    <div class="scrollWrapper">
        <div class="listTab">
            <cube-tab-bar v-model="ScrollListSelectedLabel" showSlider>
                <cube-tab v-for="(item, index) in listTabs" :label="item.label" :key="item.label">
                </cube-tab>
            </cube-tab-bar>
        </div>
        <div class="tab-slide-container">
            <cube-slide ref="slide" :loop="false" :auto-play="false" :show-dots="false" :options="slideOptions" @scroll="scroll" @change="changePage">
                <cube-slide-item>
                    <list-item></list-item>
                    <list-item></list-item>
                </cube-slide-item>
            </cube-slide>
        </div>
    </div>
</template>

<script>
    import ListItem from './listItem'
    export default {
        data(){
            return {
                loop:false,
                ScrollListSelectedLabel:"2018(3场)",
                listTabs:[{
                    label:"2018(3场)"
                },{
                    label:"2019(8场)"
                }]
            }
        },
        components:{
            ListItem
        }
    }
</script>

<style lang="scss" scoped>
     .scrollWrapper{
            .listTab{
              height: 40px;
              border-bottom:1px solid #E9E9E9;
              box-sizing: border-box;
              .cube-tab-bar{ 
                height: 100%;
                .cube-tab{
                   margin:0;
                }
              }
            }
            .tab-slide-container{
              padding: 10px 10px 0;
            }
          }
</style>