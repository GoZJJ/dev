<template>
  <div>
    <!-- 
      el-upload 上传组件
      action 上传地址
      list-type	文件列表的类型	string	text/picture/picture-card
      on-preview	点击文件列表中已上传的文件时的钩子	function(file)
      on-remove	文件列表移除文件时的钩子	function(file, fileList)
     -->
    <el-upload
      ref="upload"
      :action="addGoodsImgUrl"
      list-type="picture-card"
      :on-success="handUploadSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { addGoodsImgUrl, host } from "@/api/base.js";
export default {
  data() {
    return {
      addGoodsImgUrl,
      dialogImageUrl: "",
      dialogVisible: false,
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handUploadSuccess(response, file, fileList) {
      let imgUrl = host + response.data;
      this.$emit("sentImgUrl", imgUrl);
    },
    clear() {
      this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style>
</style>