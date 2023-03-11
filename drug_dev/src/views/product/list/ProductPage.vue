<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <div class="goods">
            <div class="title">药品添加</div>
            <div class="content">
              <el-form
                ref="form"
                :model="sizeForm"
                label-width="80px"
                size="medium"
              >
                <el-form-item label="药品名称">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="药品估价">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="药品估价">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="药品描述">
                  <el-input type="textarea" v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="sizeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="药品类型">
                  <el-select
                    v-model="sizeForm.region"
                    placeholder="请选择活动区域"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>

                <!-- <el-form-item label="活动性质">
                  <el-checkbox-group v-model="sizeForm.type">
                    <el-checkbox-button
                      label="美食/餐厅线上活动"
                      name="type"
                    ></el-checkbox-button>
                    <el-checkbox-button
                      label="地推活动"
                      name="type"
                    ></el-checkbox-button>
                    <el-checkbox-button
                      label="线下主题活动"
                      name="type"
                    ></el-checkbox-button>
                  </el-checkbox-group>
                </el-form-item> -->
                <el-form-item size="large">
                  <el-button type="primary" @click="onSubmit"
                    >立即创建</el-button
                  >
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
export default {
  data() {
    return {
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>

<style lang = 'less' scoped>
.goods {
  background-color: #fff;
  height: 600px;
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