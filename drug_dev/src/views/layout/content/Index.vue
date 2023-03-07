<template>
  <div collapse-transition="true">
    <!-- 顶部 -->
    <Header @changeShow="changeShow" v-bind="$attrs"></Header>
    <!-- 内容 -->
    <router-view></router-view>
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
      this.$emit("changeShow");
    },
  },
};
</script>

<style>
</style>