<template>
  <el-dialog
    title="商品审核"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <strong
      >当前正在审核的商品是【<span style="color: red">{{ info.goodsName }}</span
      >】</strong
    >
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" plain @click="visible(3)">商品上架</el-button>
      <el-button type="info" plain @click="visible(2)">商品下架</el-button>
      <el-button type="danger" plain @click="visible(0)">审核拒绝</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    visible(val) {
      // val == 1 通过
      // val == 0 拒绝
      //goodsStatus 1待审核 2已上架 3交易中 4已拒绝 5已下架 0已售出
      if (val == 0) {
        this.info.goodsStatus = 4;
      } else if (val == 2) {
        this.info.goodsStatus = 5;
      } else {
        this.info.goodsStatus = 2;
      }
      this.$api.updateGoodsAdmin(this.info).then((res) => {
        if (res.status == 200) {
          if (res.data.code == 1) {
            this.dialogVisible = false;
            this.$emit("updateViews");
            // console.log(res.data);
            this.$message.success(res.data.msg);
          } else {
            this.$message(res.data.msg);
          }
        } else {
          this.$message.error(res);
        }
      });
    },
  },
};
</script>

<style>
</style>