<template>
  <el-dialog
    :title="info.title"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>请输入类目名称：</span>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitHandle">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ["info", "type"],
  data() {
    return {
      dialogVisible: false,
      input: "",
    };
  },
  methods: {
    submitHandle() {
      //1 新增 2 修改 3新增一级
      if (this.type == 1) {
        console.log("新增", this.type, this.input);
        this.info.name = this.input;
        this.$api.addAddressAdmin(this.info).then((res) => {
          if (res.status == 200) {
            //新增成功
            if (res.data.code == 1) {
              //关闭弹窗
              this.dialogVisible = false;
              //更新视图
              this.$emit("updateViews");
              this.$message.success(res.data.msg);
            } else {
              this.$message(res.data.msg);
            }
          } else {
            this.$message.error(res);
          }
        });
      } else if (this.type == 2) {
        console.log("修改", this.type, this.input);
        this.info.name = this.input;
        this.$api.updateAddressAdmin(this.info).then((res) => {
          if (res.status == 200) {
            //更新成功
            if (res.data.code == 1) {
              //关闭弹窗
              this.dialogVisible = false;
              //更新视图
              this.$emit("updateViews");
              this.$message.success(res.data.msg);
            } else {
              this.$message(res.data.msg);
            }
          } else {
            this.$message.error(res);
          }
        });
      } else {
        console.log("修改", this.type, this.input);
        this.info.name = this.input;
        this.$api.addAddressOneLevel(this.info).then((res) => {
          if (res.status == 200) {
            //更新成功
            if (res.data.code == 1) {
              //关闭弹窗
              this.dialogVisible = false;
              //更新视图
              this.$emit("updateViews");
              this.$message.success(res.data.msg);
            } else {
              this.$message(res.data.msg);
            }
          } else {
            this.$message.error(res);
          }
        });
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>