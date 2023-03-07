<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <div class="menu">
      <Menu :isCollapse="isCollapse"></Menu>
    </div>
    <!-- 右侧内容 -->
    <div class="content" :class="{ small: isCollapse }">
      <Content @changeShow="changeShow" :isCollapse="isCollapse"></Content>
    </div>
  </div>
</template>

<script>
import Menu from "@/views/layout/menu/Index.vue";
import Content from "@/views/layout/content/Index.vue";
export default {
  components: { Menu, Content },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    changeShow() {
      console.log(2);
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang='less' scoped>
.layout {
  // display: flex;
  .menu {
    // width: 200px;
    background: #545c64;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
  .content {
    transition: all 390ms;
    padding-left: 200px;
  }
  .small {
    padding-left: 64px;
  }
}
</style>