<template>
  <div>
    <!-- 用户搜索 -->
    <!-- el-form-item  表单控件 每一项内容-->
    <div class="header">
      <div class="form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关键信息">
            <el-input
              v-model="formInline.queryKey"
              placeholder="账号/昵称/地址"
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
    <!-- 用户列表 -->
    <!-- el-table 是表格组件
    :data="tableData" 注入data对象数组[{},{}]
    stripe 属性可以增加斑马纹 
    border 边框 -->

    <div class="content">
      <el-table
        :data="tableData"
        style="width: 100%"
        header-row-class-name="active-header"
        header-cell-class-name="table-center"
        cell-class-name="table-center"
        row-class-name="table-center"
        stripe
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="number" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="role" label="角色"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="userStatus" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.userStatus == 1">
              正常
            </el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
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
      <!-- 分页组件 -->
      <div class="pagination">
        <Pagination
          :total="pages.total"
          :pageSize="pages.pageSize"
          @CurrentChange="CurrentChange"
          @SizeChange="SizeChange"
        ></Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pgination/Pagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      formInline: {
        queryKey: "",
      },
      tableData: [],
      pages: {
        total: 100,
        pageSize: 10,
        current: 1,
      },
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    CurrentChange(val) {
      console.log("页", val);
      this.pages.current = val;
      this.onSubmit();
    },
    SizeChange(val) {
      console.log("页面size", val);
      this.pages.pageSize = val;
      this.onSubmit();
    },
    onSubmit() {
      this.$api.selectUserAdmin(this.formInline, this.pages).then((res) => {
        if (res.status == 200) {
          if (res.data.code == 1) {
            this.tableData = res.data.data.records;
            this.pages.total = res.data.data.total;
            this.pages.pageSize = res.data.data.size;
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
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(row.userId);
          this.$api.deleteUserAdmin(row.userId).then((res) => {
            if (res.status == 200) {
              if (res.data.code == 1) {
                this.onSubmit();
                this.$message.success(res.data.msg);
              } else {
                this.$message(res.data.msg);
              }
            } else {
              this.$message.error(res);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log("删除", index, row);
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
.content {
  background-color: #fff;
  /deep/.active-header {
    color: #333;
  }
  /deep/.table-center {
    text-align: center;
  }
  .pagination {
    padding: 10px;
  }
}
</style>