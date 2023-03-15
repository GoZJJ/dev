<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>用户{{ name }}</span>
      </div>
      <div class="content">
        <el-form
          :model="userForm"
          :rules="rules"
          ref="userForm"
          label-width="100px"
        >
          <el-form-item label="用户名" prop="number">
            <el-input v-model="userForm.number"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="userForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="小区" prop="address">
            <el-select v-model="userForm.address" placeholder="请选择小区">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')"
              >立即创建</el-button
            >
            <el-button @click="resetForm('userForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "nihao",
      userForm: {
        number: "",
        password: "",
      },
      rules: {
        number: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 8,
            max: 11,
            message: "长度在 8 到 11 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        nickname: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 1 到 8 个字符",
            trigger: "blur",
          },
        ],
        address: [{ required: true, message: "请选择小区", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  height: 100%;
}
</style>