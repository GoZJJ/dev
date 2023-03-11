<template>
  <div>
    首页
    {{ totalData }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalData: {},
    };
  },
  created() {
    this.totalInfo();
  },
  methods: {
    async totalInfo() {
      let res = await this.$api.totalInfo();
      if (res.status == 200) {
        if (res.data.code === 1) {
          this.totalData = res.data.data;
        } else {
          this.$message({
            message: res.data.msg,
            type: "warning",
          });
        }
      } else {
        this.$message.error(res);
      }
    },
  },
};
</script>

<style>
</style>