<template>
  <div class="search">
    <el-form ref="formRef" :model="formInline" label-width="100px" class="form">
      <el-form-item class="form-item" label="用户名：" prop="user">
        <el-input v-model="formInline.user" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item class="form-item" label="登录IP：" prop="ip">
        <el-input v-model="formInline.ip" placeholder="请输入登录IP" />
      </el-form-item>
      <el-form-item class="form-item" label="登录时间：" prop="time">
        <el-input v-model="formInline.time" placeholder="请输入登录时间" />
      </el-form-item>
      <el-form-item class="form-item" label="操作系统：" prop="system">
        <el-input v-model="formInline.system" placeholder="请输入操作系统" />
      </el-form-item>
      <el-form-item class="form-item" label="浏览器：" prop="browser">
        <el-input v-model="formInline.browser" placeholder="请输入浏览器" />
      </el-form-item>
      <el-form-item class="form-item">
        <el-button @click="resetForm(formRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(formRef)">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="list">
    <div class="title">
      <span>在线用户</span>
      <el-tooltip class="box-item" effect="dark" content="这是真实操作，请不要随意将其他用户踢下线。" placement="right">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="num" label="#" width="80" />
      <el-table-column prop="user" label="用户名" width="200" />
      <el-table-column prop="ip" label="登录IP" width="140" />
      <el-table-column prop="time" label="登录时间" width="200" />
      <el-table-column prop="system" label="操作系统" width="200" />
      <el-table-column prop="browser" label="浏览器" width="200" />
      <el-table-column label="operation" width="200">
        <template #default>
          <el-button link type="primary" size="small">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { ref,reactive,onMounted } from 'vue'
import type {FormInstance} from 'element-plus'
import {getOnlineList} from '@/api/online.js'
const formRef = ref<FormInstance>()
const formInline = reactive({
  user: '',
  region: '',
  ip:'',
  time: '',
  system: '',
  browser: '',
})
onMounted(()=> {
  getOnlineList((res:any)=>console.log('onlineRes' + res))
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean) => {
    if (valid) {
      return console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl:FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const tableData = [
  {
    num: '2016-05-03',
    user: 'Tom',
    ip: 'California',
    time: 'Los Angeles',
    system: 'No. 189, Grove St, Los Angeles',
    browser: 'CA 90036',
    operation: '下线',
  },
  {
    num: '2016-05-03',
    user: 'Tom',
    ip: 'California',
    time: 'Los Angeles',
    system: 'No. 189, Grove St, Los Angeles',
    browser: 'CA 90036',
    operation: '下线',
  },
  {
    num: '2016-05-03',
    user: 'Tom',
    ip: 'California',
    time: 'Los Angeles',
    system: 'No. 189, Grove St, Los Angeles',
    browser: 'CA 90036',
    operation: '下线',
  },
]
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.search {
  width: 100%;
  height: 136px;
  background: #fff;
  padding: 24px;
  margin-bottom: 24px;
  .form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .form-item {
      width: 30%;
    }
  }
}
.list {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 24px;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
</style>