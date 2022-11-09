<template>
  <div class="all">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="formInline.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="登录IP">
          <el-input v-model="formInline.ip" placeholder="请输入登录IP" />
        </el-form-item>
        <el-form-item label="登陆时间">
          <el-col :span="20">
            <el-date-picker
              v-model="formInline.time"
              type="date"
              label="登陆时间"
              placeholder="请选择登陆时间"
              style="width: 100%"
            />
          </el-col>
        
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="操作系统">
          <el-input v-model="formInline.os" placeholder="请输入操作系统" />
        </el-form-item>
        <el-form-item label="浏览器">
          <el-input v-model="formInline.browser" placeholder="请输入浏览器" />
        </el-form-item>
        <el-form-item>
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
  
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <el-table :data="tableData" style="width: 100% ">
        <el-table-column prop="username" label="用户名" width="300" />
        <el-table-column prop="ip" label="登录IP" width="300" />
        <el-table-column prop="time" label="登陆时间" width="300" />
        <el-table-column prop="os" label="操作系统" width="300" />
        <el-table-column prop="browser" label="浏览器" width="300" />
      </el-table>
    </div>
  </div>
  
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import {selectLogList} from '@/api/log'
  export default defineComponent(
    {
    data(){
      return {
        formInline:{
          username:'',
          ip:'',
          os:'',
          browser:'',
          time:'',
        },
        tableData:[{
          username:'11',
          ip:'11',
          os:'11',
          browser:'11',
          time:'11',
        },
        {
          username:'11',
          ip:'11',
          os:'11',
          browser:'11',
          time:'11',
        }]
      }
    },
    methods:{
      onSubmit(){
        selectLogList().then(res=>{
          console.log(res)
        })
      },
      reset(){
        this.formInline.username=""
        this.formInline.ip=""
        this.formInline.os=""
        this.formInline.browser=""
        this.formInline.time=""
      }
    }
  });
  </script>
  
  <style lang="scss" scoped>
  
  .all{
    background-color: #e5e7eb;
    padding: 20px;
  
    width: 100%;
    height: 1000px;
    .top{
    width: 100%;
    height: 100px;
    background-color: white;
    padding: 20px;
    }
    .bottom{
      margin-top: 20px;
    }
  }
  </style>
  