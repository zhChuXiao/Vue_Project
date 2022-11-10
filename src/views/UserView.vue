<template>
  <el-container>
    <el-aside width="160px">组织架构</el-aside>
    <el-container>
      <el-header>
        <!-- 表单 -->
        <el-form :model="formInline" label-width="70" ref="ruleFormRef">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formInline.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formInline.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="formInline.phone" placeholder="请输入手机" />
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="formInline.remark" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item label="">
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">查询</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <!-- main -->
      <el-main>
        <!-- 用户管理 -->
        <el-space class="manager">
          <div>用户管理</div>
          <div>
            <el-button type="primary">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiajianzujianjiahao"></use>
              </svg>
              <div style="margin-left: 10px">新增</div>
            </el-button>
            <el-button
              type="success"
              :disabled="multipleSelection.length == 0"
              @click="editData"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuanhuan1"></use>
              </svg>
              <div style="margin-left: 10px">转移</div>
            </el-button>
            <el-button
              type="danger"
              @click="deleteData"
              :disabled="multipleSelection.length == 0"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shanchutianchong"></use>
              </svg>
              <div style="margin-left: 10px">删除</div>
            </el-button>
          </div>
        </el-space>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          ref="multipleTableRef"
          @selection-change="handleSelectionChange"
          stripe
          :header-cell-style="{ background: '#eee' }"
          :cell-style="{ height: '70px' }"
        >
          <el-table-column align="center" fixed type="selection" width="55" />
          <el-table-column align="center" fixed type="index" label="序号" width="80" />
          <el-table-column align="center" prop="headImg" label="头像" width="70">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.headImg" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="120" />
          <el-table-column align="center" prop="username" label="用户名" width="140" />
          <el-table-column align="center" prop="deptName" label="所在部门" width="120" />
          <el-table-column align="center" prop="roleNames" label="所属角色" width="300">
            <template #default="{ row }">
              <el-space v-for="_ in row.roleNames" :key="_" :size="4">
                <el-tag type="success">{{ _ }}</el-tag>
              </el-space>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="nickName" label="昵称" width="120" />
          <el-table-column align="center" prop="email" label="邮箱" width="220" />
          <el-table-column align="center" prop="phone" label="手机" width="120" />
          <el-table-column align="center" fixed="right" label="Operations" width="150">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick"
                >编辑</el-button
              >
              <el-button link type="primary" size="small">改密</el-button>
              <el-button link type="primary" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, type Ref } from 'vue';
import { getDeptList, getUserPage } from '@/api/dept';
import type { AxiosResponse } from 'axios';
import { ElMessage, type ElTable, type FormInstance } from 'element-plus';
import 'http://at.alicdn.com/t/c/font_3740444_ut9ecrguym.js';
onMounted(async (): Promise<void> => {
  let res: AxiosResponse<any, any> = await getDeptList();
  ElMessage.closeAll();
  console.log(res);
  // 获取用户列表
  getUser();
});
// 表单数据
const formInline = reactive({
  name: '',
  username: '',
  email: '',
  phone: '',
  remark: '',
});
// 表单ref
const ruleFormRef = ref<FormInstance>();
// 提交按钮
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    }
  });
};
// 重置按钮
const resetForm = (formEl: FormInstance | undefined) => {
  console.log(formEl);
  if (!formEl) return;
  formEl.resetFields();
};
// 删除按钮
const deleteData = () => {
  console.log(multipleSelection.value);
};
// 转移按钮
const editData = () => {
  console.log();
};
/**
 * 表格
 */
const handleClick = () => {
  console.log('click');
};
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<any[]>([]);
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val;
};
const tableData: Ref<Array<any>> = ref([]);
// 获取用户列表
const getUser = async () => {
  let res: AxiosResponse<any, any> = await getUserPage({ limit: 10, page: 1 });
  console.log(res);
  tableData.value = res.data.list;
};
</script>

<style lang="sass" scoped>
:deep(.el-scrollbar__view)
  height: 100% !important

.el-container
  height: 100%
  background: #fff
  padding: 20px
  border-radius: 10px
  .el-aside
    height: 720px
    box-shadow: 5px 0px 5px -5px #999
    margin-right: 5px

  .el-header
    height: 100px
    .el-form
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      .el-form-item
        width: 30%

.manager
  display: flex
  justify-content: space-between
  margin-botton: 50px
.el-table
  margin-top: 30px
.icon
  width: 1em
  height: 1em
  vertical-align: -0.15em
  fill: currentColor
  overflow: hidden
</style>
