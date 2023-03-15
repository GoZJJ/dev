<template>
  <div>
    <el-menu
      :default-active="active"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
    >
      <el-menu-item>
        <i class="el-icon-user"></i>
        <span slot="title">后台管理</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/user">
        <i class="el-icon-menu"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-submenu index="/product">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/product/list">商品列表</el-menu-item>
          <el-menu-item index="/product/category">商品分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/order">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/comment">
        <i class="el-icon-setting"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="/address">
        <i class="el-icon-setting"></i>
        <span slot="title">地区管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["isCollapse"],
  data() {
    return {
      // isCollapse: false,
      active: "",
    };
  },
  created() {
    if (this.$route.meta.activeMenu) {
      this.active = this.$route.meta.activeMenu;
    } else {
      this.active = this.$route.path;
    }
  },
  watch: {
    $route(to, from) {
      let { meta, path } = to;
      if (meta.activeMenu) {
        this.active = meta.activeMenu;
      } else {
        this.active = path;
      }
    },
  },
};
</script>

<style lang='less' scoped>
// 消除右边突出部分
.el-menu {
  border-right: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>