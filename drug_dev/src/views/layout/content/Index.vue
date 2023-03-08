<template>
  <div collapse-transition="true">
    <!-- 顶部 -->
    <Header @changeShow="changeShow" v-bind="$attrs"></Header>
    <!-- 内容 -->
    <div class="outWrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/views/layout/content/Header.vue";
export default {
  // props: ["isCollapse"],
  components: {
    Header,
  },
  methods: {
    changeShow() {
      //调用父组件的指定方法
      this.$emit("changeShow");
    },
  },
};
</script>

<style lang='less' scoped>
//统一出口增加内边距
.outWrapper {
  padding: 10px;
}
</style>