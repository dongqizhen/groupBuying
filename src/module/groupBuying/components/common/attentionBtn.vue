<template>
  <div class="attentionBtn" @click="triggleSrc">
    <img v-if="isFollw==0" src="../../../../../static/images/attention-active.png">
    <img v-else-if="isFollw==1" src="../../../../../static/images/attention.png" alt="" srcset="">
    <img v-else src="../../../../../static/images/attention-each.png" alt="">
  </div>
</template>
<script>
  export default {
      data() {
          return { isAttention: false };
      },
      props: ["isFollw"],
      methods: {
          triggleSrc() {
              this.isAttention = !this.isAttention;
          }
      },
      computed: {
          isFollwed() {}
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

