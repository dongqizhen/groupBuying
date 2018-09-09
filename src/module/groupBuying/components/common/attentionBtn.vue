<template>
   <div class="attentionBtn" @click="triggleSrc">
     <img :src="isAttention?'../../../../../static/images/attention-active.png':'../../../../../static/images/attention.png'" alt="">
     </div>
</template>
<script>
export default {
  data() {
    return {
      isAttention: false
    };
  },
  methods: {
    triggleSrc() {
      this.isAttention = !this.isAttention;
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

