<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="goods">
            <div class="title">药品{{ title }}</div>
            <div class="content">
              <el-form
                :model="goods"
                ref="goodsForm"
                label-width="80px"
                size="medium"
              >
                <el-form-item label="用户ID" prop="userId">
                  <el-input v-model="goods.userId"></el-input>
                </el-form-item>
                <el-form-item label="所属小区" prop="address">
                  <el-select v-model="goods.address" placeholder="请选择小区">
                    <el-option label="碧桂园" value="碧桂园"></el-option>
                    <el-option label="恒大" value="恒大"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="药品类型" prop="goodsType">
                  <!-- <el-select
                    v-model="goods.goodsType"
                    placeholder="请选择药品类型"
                  >
                    <el-option label="感冒" value="感冒"></el-option>
                    <el-option label="退烧" value="退烧"></el-option>
                  </el-select> -->
                  <el-cascader
                    v-model="goods.goodsType"
                    placeholder="请选择药品类型"
                    :options="data"
                    :show-all-levels="false"
                    :props="defaultProps"
                  ></el-cascader>
                </el-form-item>
                <el-form-item label="药品名称" prop="goodsName">
                  <el-input v-model="goods.goodsName"></el-input>
                </el-form-item>
                <el-form-item label="药品估价" prop="goodsPrice">
                  <el-input v-model="goods.goodsPrice"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="contactInformation">
                  <el-input v-model="goods.contactInformation"></el-input>
                </el-form-item>
                <el-form-item label="上传图片" prop="goodsImg">
                  <UploadImg
                    @sentImgUrl="sentImgUrl"
                    ref="uploadImg"
                    :fileList="fileList"
                  ></UploadImg>
                </el-form-item>
                <el-form-item label="药品描述" prop="goodsDescription">
                  <WangEditor
                    @sendWangEditor="sendWangEditor"
                    ref="wangEditor"
                    :wangValue="wangValue"
                  ></WangEditor>
                </el-form-item>
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmit"
                    >立即提交</el-button
                  >
                  <el-button @click="resetForm('goodsForm')">重置</el-button>
                  <el-button @click="closePage">取消</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import UploadImg from "@/views/product/list/UploadImg.vue";
import WangEditor from "@/views/product/list/WangEditor.vue";
import { mapState } from "vuex";
export default {
  components: {
    UploadImg,
    WangEditor,
  },
  data() {
    return {
      fileList: [], //图片的容器集合
      wangValue: "",
      goods: {
        goodsName: "",
        goodsPrice: "",
        goodsDescription: "",
        contactInformation: "",
        goodsType: "",
        goodsImg: "",
        userId: "",
        address: "",
      },
      data: [],
      defaultProps: {
        label: "name",
        emitPath: false,
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.title == "添加") {
        this.$api.addGoodsAdmin(this.goods).then((res) => {
          if (res.status == 200) {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("/product/list");
            } else {
              this.$message(res.data.msg);
            }
          } else {
            this.$message.error(res);
          }
        });
      } else {
        this.$api.updateGoodsAdmin(this.goods).then((res) => {
          if (res.status == 200) {
            if (res.data.code == 1) {
              this.$message.success(res.data.msg);
              this.$router.push("/product/list");
            } else {
              this.$message(res.data.msg);
            }
          } else {
            this.$message.error(res);
          }
        });
      }
    },
    //取消按钮事件 路由到商品列表页
    closePage() {
      this.$router.push("/product/list");
    },
    //接受子组件发来的图片路径
    sentImgUrl(val) {
      this.goods.goodsImg = val;
    },
    //接受子组件发来的商品描述
    sendWangEditor(val) {
      this.goods.goodsDescription = val;
    },
    //重置表单事件
    resetForm(formName) {
      if (this.title == "添加") {
        this.$refs[formName].resetFields();
        this.$refs.uploadImg.clear();
        //this.$refs.wangEditor.html = "";
        this.$refs.wangEditor.editor.clear();
      } else {
        console.log(this.goods);
        console.log(this.rowData);
        // console.log(this.);
        this.goods = JSON.parse(JSON.stringify(this.rowData)); //深copy
        this.fileList = [];
        this.fileList.push({ name: "", url: this.goods.goodsImg });
        this.wangValue = this.goods.goodsDescription;
        //this.$refs.wangEditor.html = this.goods.goodsDescription;
      }
    },
    selectGoodsCategory() {
      this.$api.selectGoodsCategoryAdmin().then((res) => {
        if (res.status == 200) {
          if (res.data.code == 1) {
            this.data = [];
            let arr = res.data.data;
            arr.forEach((element) => {
              if (element.type == 1) {
                element.value = element.name;
                element.children = [];
                this.data.push(element);
              }
            });
            this.data.forEach((item) => {
              //console.log(item);
              arr.forEach((element) => {
                if (element.type == item.cid) {
                  element.value = element.name;
                  item.children.push(element);
                }
              });
            });
            //console.log(this.data);
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
  computed: {
    //读取vuex中的数据
    ...mapState("product", ["rowData", "title"]),
  },
  created() {
    this.selectGoodsCategory();
    if (this.title == "编辑") {
      //赋值rowData是个新值
      // this.goods = { ...this.rowData }; //浅copy
      this.goods = JSON.parse(JSON.stringify(this.rowData)); //深copy
      this.fileList.push({ name: "", url: this.goods.goodsImg });
      this.wangValue = this.goods.goodsDescription;
      console.log(this.goods);
      //多张图片解决方案
      // let arr = JSON.parse(this.rowData.goodsImg);
      //arr.forEach((element) => {
      //   this.fileList.push({ name: "", url: element });
      // });
    }
  },
};
</script>

<style lang = 'less' scoped>
.goods {
  background-color: #fff;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  .title {
    background-color: #909399;
    height: 20px;
    color: #fff;
    padding: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .content {
    padding: 15px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
}
</style>