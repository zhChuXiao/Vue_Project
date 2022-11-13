<template>
  <div class="title">
    菜单管理
    <el-button
      style="
        width: 60px;
        height: 30px;
        background: deepskyblue;
        color: azure;
        border: none;
      "
      text
      @click="dialogFormVisible = true"
    >
      新增
    </el-button>

    <el-dialog v-model="dialogFormVisible" title="新增菜单">
      <el-form :model="form">
        <el-form-item required label="节点名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item required label="上级节点" :label-width="formLabelWidth">
          <el-input v-model="form.perms" autocomplete="off" />
        </el-form-item>
        <el-form-item required label="节点路由" :label-width="formLabelWidth">
          <el-input v-model="form.router" autocomplete="off" />
        </el-form-item>
        <el-form-item label="节点图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <el-switch v-model="value1" />
        </el-form-item>
        <el-form-item label="排序号" :label-width="formLabelWidth">
          <el-input v-model="form.orderNum" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="sureAdd"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <el-table
    border
    :data="tableData"
    row-key="id"
    lazy
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    style="width: 100%"
  >
    <el-table-column fixed prop="name" label="名称" width="250" />
    <el-table-column prop="icon" label="图标" width="130" />
    <el-table-column prop="type" label="类型" width="120" />
    <el-table-column prop="router" label="节点路由" width="220" />
    <el-table-column prop="keepalive" label="路由缓存" width="130" />
    <el-table-column prop="viewPath" label="文件路径" width="220" />
    <el-table-column prop="perms" label="权限" width="220" />
    <el-table-column prop="orderNum" label="排序号" width="120" />
    <el-table-column prop="updatedAt" label="更新时间" width="220" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleChange(scope.row)"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { menuList } from '@/api/menu.js';
// 新增
const value1 = ref(true);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const form = reactive({
  name: '',
  perms: '',
  router: '',
  icon: '',
  isShow: '',
  orderNum: '',
});
// 结束参数
const tableData = ref([]);
/**
 * 编辑方法
 */
const handleChange = (row) => {
  console.log('可以获取这一行的内容，并且可以编辑，不知道编辑什么，所以这个方法装样');
};
/**
 * 新增的方法确定按钮
 */
const sureAdd = () => {
  dialogFormVisible = false;
  menuAdd().then((res) => {
    console.log(res);
  });
};
onMounted(() => {
  menuList().then((res) => {
    console.log(res);
    // type0的数据
    let type0 = res?.data?.filter((item) => {
      return item.type === 0;
    });
    // console.log('type0', type0);
    // type1的数据
    let type1 = res?.data?.filter((item) => {
      return item.type === 1;
    });
    // console.log('type1', type1);
    // type2的数据
    let type2 = res?.data?.filter((item) => {
      return item.type === 2;
    });
    // console.log('type2', type2);
    // 处理全部数据
    let tableData1 = [];
    tableData1 = type0?.filter((type0item) => {
      return type0item.name === '系统';
    });
    tableData1?.forEach((item) => {
      item.children = type1?.filter((type1item) => {
        return type1item.orderNum === item.orderNum;
      });
      item.children?.forEach((item1) => {
        item1.children = type2?.filter((type2item) => {
          return type2item.orderNum === item1.orderNum;
        });
      });
    });
    console.log('--->', tableData1);
    tableData.value = tableData1;
  });
  // sureAdd();
});
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 60px;
  line-height: 60px;
  // background: #fff;
  padding: 0 30px 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
// 表单
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
