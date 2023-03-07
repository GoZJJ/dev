<template>
  <div class="header">
    <div class="open">
      <i v-if="!isCollapse" class="el-icon-s-unfold" @click="changMenu"></i>
      <i v-else class="el-icon-s-fold" @click="changMenu"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  methods: {
    changMenu() {
      console.log(1);
      this.$emit("changeShow");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  height: 56px;
  background-color: #545c64;
  color: rgb(5, 230, 5);
  line-height: 56px;
  .open {
    margin-left: 10px;
    font-size: 25px;
  }
}
</style>