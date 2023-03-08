<template>
  <div>
    <!-- 产品搜索 -->
    <!-- el-form-item  表单控件 每一项内容-->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键信息">
            <el-input
              v-model="formInline.queryKey"
              placeholder="名称/描述/用户名"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="group">
        <el-button
          size="small"
          icon="el-icon-circle-plus-outline"
          type="warning"
          >添加商品</el-button
        >
        <el-button size="small" icon="el-icon-delete" type="danger"
          >批量删除</el-button
        >
      </div>
    </div>
    <!-- 产品列表 -->
    <!-- el-table 是表格组件
    :data="tableData" 注入data对象数组[{},{}]
    stripe 属性可以增加斑马纹 
    border 边框 -->

    <div class="content">
      <el-table :data="tableData" style="width: 100%" stripe border>
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        queryKey: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.$api.selectGoodsAdmin(this.formInline).then((res) => {
        // console.log(this.formInline);
        if (res.status == 200) {
          if (res.data.code == 1) {
            this.$message.success(res.data.msg);
          } else {
            this.$message(res.data.msg);
          }
        } else {
          this.$message.error("超时错误！");
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.header {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  .el-form-item {
    margin-bottom: 16px;
  }
}
.group {
  border: 1px solid #eee;
  padding: 8px;
}
// .content {
//   background-color: pink;
//   padding: 10px;
// }
</style>