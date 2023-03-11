<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="goods">
            <div class="title">药品添加</div>
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
                  <el-select
                    v-model="goods.goodsType"
                    placeholder="请选择药品类型"
                  >
                    <el-option label="感冒" value="感冒"></el-option>
                    <el-option label="退烧" value="退烧"></el-option>
                  </el-select>
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
                  ></UploadImg>
                </el-form-item>
                <el-form-item label="药品描述" prop="goodsDescription">
                  <WangEditor
                    @sendWangEditor="sendWangEditor"
                    ref="wangEditor"
                  ></WangEditor>
                </el-form-item>
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmit"
                    >立即添加</el-button
                  >
                  <el-button @click="resetForm('goodsForm')">重置</el-button>
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
export default {
  components: {
    UploadImg,
    WangEditor,
  },
  data() {
    return {
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
    };
  },
  methods: {
    onSubmit() {
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
    },
    //接受子组件发来的图片路径
    sentImgUrl(val) {
      this.goods.goodsImg = val;
    },
    //接受子组件发来的商品描述
    sendWangEditor(val) {
      this.goods.goodsDescription = val;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.uploadImg.clear();
      //this.$refs.wangEditor.html = "";
      this.$refs.wangEditor.editor.clear();
    },
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