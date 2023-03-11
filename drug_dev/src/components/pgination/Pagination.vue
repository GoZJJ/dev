<template>
  <div>
    <!-- el-pagination 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 50, 100, 500]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      typeof: Number,
      default: 100,
    },
    pageSize: {
      typeof: Number,
      default: 10,
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("SizeChange", val);
    },
    handleCurrentChange(val) {
      //val 当前第几页
      this.$emit("CurrentChange", val);
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
};
</script>

<style>
</style>