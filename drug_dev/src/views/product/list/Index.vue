<template>
  <div>
    <el-card shadow="never">商品列表</el-card>
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
          @click="toProductPage"
          >添加商品</el-button
        >
        <el-button
          size="small"
          icon="el-icon-delete"
          type="danger"
          @click="deleteMany"
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
      <el-table
        :data="tableData"
        style="width: 100%"
        header-row-class-name="active-header"
        header-cell-class-name="table-center"
        cell-class-name="table-center"
        row-class-name="table-center"
        @selection-change="selectHandle"
        stripe
        border
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="goodsId" label="id" width="180">
        </el-table-column>
        <el-table-column prop="goodsName" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="goodsPrice" label="估价"></el-table-column>
        <el-table-column
          prop="goodsDescription"
          label="描述"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="userName" label="卖家"></el-table-column>
        <el-table-column
          prop="userId"
          label="卖家id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="address" label="小区"></el-table-column>
        <el-table-column prop="goodsStatus" label="状态">
          <template slot-scope="scope">
            <el-tag type="warning" v-if="scope.row.goodsStatus == 1">
              待审核
            </el-tag>
            <el-tag type="success" v-else-if="scope.row.goodsStatus == 2">
              已上架
            </el-tag>
            <el-tag type="primary" v-else-if="scope.row.goodsStatus == 3">
              交易中
            </el-tag>
            <el-tag type="danger" v-else-if="scope.row.goodsStatus == 4">
              已拒绝
            </el-tag>
            <el-tag type="info" v-else-if="scope.row.goodsStatus == 5">
              已下架
            </el-tag>
            <el-tag type="info" v-else-if="scope.row.goodsStatus == 0">
              已售出
            </el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="178">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              icon="el-icon-s-tools"
              type="primary"
              @click="handleVerify(scope.$index, scope.row)"
            ></el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            ></el-button>
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
    <!-- 弹窗 -->
    <div class="dialogVerify">
      <Dialog
        ref="dialogVerify"
        :info="info"
        @updateViews="updateViews"
      ></Dialog>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/pgination/Pagination.vue";
import Dialog from "@/views/product/list/Dialog.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    Pagination,
    Dialog,
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
      ids: [],
      info: {},
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    //vuex 中的方法
    ...mapMutations("product", ["changeRowData", "changeTitle"]),
    //当前页码改变事件
    CurrentChange(val) {
      console.log("页", val);
      this.pages.current = val;
      this.onSubmit();
    },
    //当前页大小改变事件
    SizeChange(val) {
      console.log("页面size", val);
      this.pages.pageSize = val;
      this.onSubmit();
    },
    //请求后端得到页面数据
    onSubmit() {
      this.$api.selectGoodsAdmin(this.formInline, this.pages).then((res) => {
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
    //每行前边的选择事件
    selectHandle(selection) {
      let arr = [];
      selection.forEach((element) => {
        arr.push(element.goodsId);
      });
      this.ids = arr;
    },
    //单个删除事件
    handleDelete(index, row) {
      let arr = [];
      arr[0] = row.goodsId;
      this.ids = arr;
      this.deleteMany();
    },
    //批量删除事件
    deleteMany() {
      if (!this.ids.length > 0) {
        this.$message("您尚未选择任何内容！");
        return;
      }
      this.$confirm(
        "此操作将永久删除所选的" + this.ids.length + "条信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          let strIds = this.ids.join(",");
          this.$api.deleteGoodsAdmin(strIds).then((res) => {
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
    },
    //审核事件
    handleVerify(index, rwo) {
      this.$refs.dialogVerify.dialogVisible = true;
      this.info = rwo;
      console.log(index, rwo);
    },
    updateViews() {
      this.onSubmit();
    },
    //编辑事件
    handleEdit(index, rwo) {
      console.log(index, rwo);
      //存储当前行的数据--vuex--跳转到另外一个界面--获取vuex行数据
      this.changeRowData(rwo);
      this.changeTitle("编辑");
      //路由跳转
      this.$router.push("/product/product-page");
    },
    //点击跳转到商品详情页面
    toProductPage() {
      this.changeTitle("添加");
      this.$router.push("/product/product-page");
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