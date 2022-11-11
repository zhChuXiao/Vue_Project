<template>
  <el-container>
    <el-aside width="160px">
      <div>组织架构</div>
      <el-tree :data="data" :props="defaultProps" default-expand-all />
    </el-aside>
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
            <el-button type="primary" @click="addUser">
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
          :cell-style="{ height: '70px' }"
          max-height="500"
        >
          <el-table-column align="center" fixed type="selection" width="55" />
          <el-table-column align="center" fixed type="index" label="序号" width="60" />
          <el-table-column align="center" prop="headImg" label="头像" width="70">
            <template #default="{ row }">
              <el-avatar :size="40" :src="row.headImg" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="name" label="姓名" width="120" />
          <el-table-column align="center" prop="username" label="用户名" width="140" />
          <el-table-column align="center" prop="deptName" label="所在部门" width="80" />
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
          <el-table-column align="center" fixed="right" label="操作" width="150">
            <template #default>
              <el-button link type="primary" size="small" @click="handleClick"
                >编辑</el-button
              >
              <el-button link type="primary" size="small">改密</el-button>
              <el-button link type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <!-- 添加对话框 -->
    <el-dialog
      v-model="dialog.dialogAdd"
      :fullscreen="fullscreen"
      :modal="true"
      :show-close="false"
      @close="dialogClose"
      destroy-on-close
    >
      <!-- 增加用户title -->
      <template #header>
        <div
          style="
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            border-bottom: 2px solid #ddd;
            padding-bottom: 20px;
          "
        >
          <span>新增用户</span>
          <!-- 全屏 -->
          <div>
            <svg
              class="icon"
              aria-hidden="true"
              style="cursor: pointer; margin-right: 15px"
              @click="fullscreen = !fullscreen"
            >
              <use xlink:href="#icon-full-screen"></use>
            </svg>
            <!-- 关闭 -->
            <svg
              class="icon"
              aria-hidden="true"
              style="cursor: pointer"
              @click="dialog.dialogAdd = false"
            >
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </div>
        </div>
      </template>
      <!-- 增加用户表单 -->
      <el-form :model="addData" label-width="70" :rules="rules" ref="addDataRef">
        <el-form-item label="所属部门">
          <el-input value="总公司" disabled />
        </el-form-item>
        <el-form-item label="所属角色" prop="roles">
          <!-- 角色 -->
          <el-select
            v-model="addData.roles"
            multiple
            placeholder="请选择所属角色"
            clearable
            collapse-tags-tooltip
            fit-input-width
            validate-event
            style="width: 100%"
          >
            <el-option
              v-for="item in selectData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input clearable v-model="addData.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-space>
          <el-form-item label="姓名" prop="name" class="shortItem">
            <el-input clearable v-model="addData.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="昵称" prop="nickName" class="shortItem">
            <el-input clearable v-model="addData.nickName" placeholder="请输入昵称" />
          </el-form-item>
        </el-space>
        <el-space>
          <el-form-item label="邮箱" prop="email" class="shortItem">
            <el-input clearable v-model="addData.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="手机" prop="phone" class="shortItem">
            <el-input clearable v-model="addData.phone" placeholder="请输入手机" />
          </el-form-item>
        </el-space>
        <el-form-item label="备注" prop="remark">
          <el-input clearable v-model="addData.remark" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item label="是否启用" prop="remark">
          <el-radio-group v-model="addData.status">
            <el-radio-button :label="1">启用</el-radio-button>
            <el-radio-button :label="0">禁用</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 足部按钮 -->
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.dialogAdd = false">取消</el-button>
          <el-button type="primary" @click="addComfirm(addDataRef)"> 添加 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-container>
</template>

<script lang="ts" setup>
import { h, onMounted, reactive, ref, type Ref } from 'vue';
import { getDeptList, getUserPage, getRoleList, addAdmin } from '@/api/dept';
import type { AxiosResponse } from 'axios';
import { ElMessage, ElNotification, type ElTable, type FormInstance } from 'element-plus';
import '@/utils/symbol.js';
onMounted(async (): Promise<void> => {
  let res: AxiosResponse<any, any> = await getDeptList();
  ElMessage.closeAll();
  console.log(res);
  // 获取用户列表
  await getUser();
  ElMessage.closeAll();
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
// 表单提交按钮
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

/**
 * @button 添加按钮
 */
const addUser = async () => {
  dialog.dialogAdd = true;
  let res = await getRoleList();
  ElMessage.closeAll();
  selectData.value = res.data.map((item: any) => ({ label: item.name, value: item.id }));
};
// 添加表单ref
const addDataRef = ref<FormInstance>();
// select数据
const selectData: any = ref([]);
// 添加全屏
const fullscreen = ref(false);
// 添加数据
const addData: any = reactive({
  departmentId: 1,
  roles: [],
  name: '',
  username: '',
  nickName: '',
  email: '',
  phone: '',
  remark: '',
  status: 1,
});
// 发送添加请求
const addComfirm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid: any): Promise<any> => {
    if (valid) {
      let res: any = await addAdmin(addData);
      console.log(res);
      ElMessage.closeAll();
      if (res.code === 200) {
        dialog.dialogAdd = false;
        ElNotification({
          title: '提示',
          message: h('i', { style: 'color: teal' }, '添加成功'),
        });
      }

      res.code === 10001 &&
        ElNotification({
          title: '提示',
          message: h('i', { style: 'color: red' }, res.message),
        });
      console.log(res);
    } else {
      return false;
    }
  });
};
// 用户名验证
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else if (!/^[A-Za-z0-9]+$/.test(value) || value.length < 6) {
    callback(new Error('用户名必须由6位以上数字字母构成'));
  } else {
    callback();
  }
};
// 昵称验证
const validateName = (rule: any, value: any, callback: any) => {
  if (value.length < 2) {
    callback(new Error('用户名必须两个字以上！'));
  } else {
    callback();
  }
};
// 邮箱验证
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱'));
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    )
  ) {
    callback(new Error('请输入正确格式的邮箱！'));
  } else {
    callback();
  }
};
// 电话号码验证
const validatePhone = (rule: any, value: any, callback: any) => {
  if (/^(?:(?:\+|00)86)?1\d{11}$/.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};
const validateRoles = (rule: any, value: any, callback: any) => {
  console.log(value);
  if (value.length > 3 || !value[0]) {
    callback(new Error('必须选择1到3个角色'));
  } else {
    callback();
  }
};
// 验证规则
const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  name: [{ validator: validateName, trigger: 'blur' }],
  email: [{ validator: validateEmail, trigger: 'blur' }],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
  roles: [{ validator: validateRoles, trigger: 'change', type: 'object' }],
});

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
  let res: AxiosResponse<any, any> = await getUserPage({ limit: 100, page: 1 });
  tableData.value = res.data?.list;
};
// 添加对话框
const dialog = reactive({
  dialogAdd: false,
});
// 对话框关闭
const dialogClose = () => {
  addData.departmentId = 1;
  addData.roles = '';
  addData.name = '';
  addData.username = '';
  addData.nickname = '';
  addData.email = '';
  addData.phone = '';
  addData.remark = '';
  addData.status = 1;
};
// 组织架构
const data: any = [
  {
    label: '总公司',
    children: [
      {
        label: '北京',
        children: [
          {
            label: '北分客服',
          },
        ],
      },
      {
        label: '沧州',
        children: [
          {
            label: '客服',
          },
        ],
      },
    ],
  },
  {
    label: '上海',
    children: [
      {
        label: 'hello',
      },
    ],
  },
  {
    label: '开发部',
    children: [
      {
        label: '开发分部1',
      },
      {
        label: '开发分部2',
      },
    ],
  },
  {
    label: '测试部',
    children: [
      {
        label: '测试分部1',
      },
    ],
  },
  {
    label: '图书馆',
    children: [
      {
        label: '杭州图书馆',
      },
      {
        label: '郑州图书馆',
      },
    ],
  },
];

const defaultProps = {
  children: 'children',
  label: 'label',
};
</script>

<style lang="sass" scoped>
:deep(.el-scrollbar__view)
  height: 100% !important

.el-container
  height: 100%
  // background: #fff
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
