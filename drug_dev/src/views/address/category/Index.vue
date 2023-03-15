<template>
  <div class="category">
    <!-- 标题 -->
    <el-card shadow="never">地区管理</el-card>
    <div class="tree">
      <!-- 树的内容结构 -->
      <!-- 
        data tree的数据
        show-checkbox 多选框
        default-expand-all 是否默认展开所有节点 boolean - false
        expand-on-click-node	是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。	boolean	—	true
       render-content	树节点的内容区的渲染 Function	Function(h, { node, data, store }	—	—
       -->
      <el-card shadow="never" class="box-card">
        <el-button type="info" @click="addAddressOneLevel"
          >新增一级地区</el-button
        >
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent"
          :props="defaultProps"
        >
        </el-tree>
      </el-card>
    </div>
    <!-- 弹窗 -->
    <div class="dialogs">
      <Dialog
        :info="info"
        :type="type"
        ref="dialogs"
        @updateViews="updateViews"
      ></Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from "@/views/address/category/Dialog.vue";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      //tree 的数据
      data: [],
      //tree的结构修改
      defaultProps: {
        label: "name",
      },
      info: {},
      type: 1, //1新增 2修改  3 新增一级
    };
  },
  created() {
    this.selectAddress();
  },
  methods: {
    //增加一级标题
    addAddressOneLevel() {
      this.$refs.dialogs.dialogVisible = true;
      this.info = {
        title: "新增【一级】分类",
        name: "",
      };
      this.type = 3;
      this.$refs.dialogs.input = "";
    },
    //渲染视图
    updateViews() {
      this.selectAddress();
    },
    //新增
    append(data) {
      this.$refs.dialogs.dialogVisible = true;
      this.info = {
        title: "新增【" + data.name + "】子集分类",
        cid: data.cid,
        name: data.name,
      };
      this.type = 1;
      this.$refs.dialogs.input = "";
    },
    //删除
    remove(node, data) {
      console.log(data);
      this.$confirm(
        "此操作将永久删除所选的【" + data.name + "】类目, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$api.deleteAddressAdmin(data.id).then((res) => {
            if (res.status == 200) {
              if (res.data.code == 1) {
                //更新视图
                this.selectAddress();
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
    //更新
    update(node, data) {
      this.$refs.dialogs.dialogVisible = true;
      this.info = {
        title: "修改【" + data.name + "】分类名称",
        id: data.id,
        cid: data.cid,
        name: data.name,
      };
      this.type = 2;
      this.$refs.dialogs.input = data.name;
      //console.log(data);
    },
    //渲染内容
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          {node.level == 1 || node.level == 2 ? (
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.append(data)}
              >
                新增
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.update(node, data)}
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          ) : (
            <span>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.update(node, data)}
              >
                修改
              </el-button>
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          )}
        </span>
      );
    },
    //查询并渲染地址
    selectAddress() {
      this.$api.selectAddressAdmin().then((res) => {
        if (res.status == 200) {
          if (res.data.code == 1) {
            this.data = [];
            let arr = res.data.data;
            arr.forEach((element) => {
              if (element.type == 1) {
                element.children = [];
                this.data.push(element);
              }
            });
            this.data.forEach((item) => {
              //console.log(item);
              arr.forEach((element) => {
                if (element.type == item.cid) {
                  element.children = [];
                  item.children.push(element);
                }
              });
            });
            this.data.forEach((item) => {
              item.children.forEach((i) => {
                arr.forEach((element) => {
                  if (element.type == i.cid) {
                    // element.children = [];
                    i.children.push(element);
                  }
                });
              });
            });
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

<style lang='less' scoped>
.category {
  .tree {
    .el-tree {
      padding: 15px;
    }
    /deep/.el-tree-node__content {
      padding: 10px;
    }
    /deep/.custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>