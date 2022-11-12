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
        <el-form-item label="操作系统" v-show="isShow">
          <el-input v-model="formInline.os" placeholder="请输入操作系统" />
        </el-form-item>
        <el-form-item label="浏览器" v-show="isShow">
          <el-input v-model="formInline.browser" placeholder="请输入浏览器"  />
        </el-form-item>
        <el-form-item>
           
              <el-button @click="reset">重置</el-button>
              <el-button type="primary" @click="onSubmit">查询</el-button>
              <span @click="exchange">{{isShow?"收起":"展开"}}</span>
            
        </el-form-item>
      </el-form>
    </div>
    <div class="bottom">
      <div class="title">
        <span>登录日志</span>
        <div class="icon">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="刷新"
              placement="top"
            >
              <el-icon><Refresh/></el-icon>
            </el-tooltip>


            <el-tooltip
              class="box-item"
              effect="dark"
              content="列设置"
              placement="top"
            >
              <el-dropdown  trigger="click" size="large">
                <el-icon><Setting/></el-icon>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :icon="Refresh">默认</el-dropdown-item>
                    <el-dropdown-item :icon="Setting">中等</el-dropdown-item>
                    <el-dropdown-item :icon="Setting">紧凑</el-dropdown-item>
                    
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-tooltip>



            <el-tooltip
              class="box-item"
              effect="dark"
              content="密度"
              placement="top"
            >
              <el-dropdown  trigger="click">
                <el-icon><Operation/></el-icon>
                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="changeDensity1" >默认</el-dropdown-item>
                    <el-dropdown-item @click="changeDensity2">中等</el-dropdown-item>
                    <el-dropdown-item @click="changeDensity3">紧凑</el-dropdown-item>
                    
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-tooltip>

            
                  
          
        </div>
      </div>
      
      <el-table 
      :data="tableData" 
      style="width: 100%"  
      :cell-style="{padding: this.density+'px'}"
>
        <el-table-column prop="username" label="用户名" width="250" />
        <el-table-column prop="ip" label="登录IP" width="250" />
        <el-table-column prop="time" label="登陆时间" width="250" />
        <el-table-column prop="os" label="操作系统" width="250" />
        <el-table-column prop="browser" label="浏览器" width="250" />
      </el-table>
      
       <el-pagination background layout="prev, pager, next" 
       :total="total" 
       v-model:current-page="currentPage" 
       @current-change="changeCurrentPage"
       />

    </div>
  </div>
  
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import {selectLogList} from '@/api/log'
  import {Setting,Refresh,Operation} from '@element-plus/icons-vue'
  export default defineComponent(
    {
    components:{
      Setting,  
      Refresh,
      Operation
    },
    data(){
      return {
        density:5,
        isShow:true,
        total:0,
        formInline:{
          username:'',
          ip:'',
          os:'',
          browser:'',
          time:'',
        },
        tableData:[]
      }
    },
    created(){
      selectLogList({
        limit:10,
        page:this.currentPage
      }).then(res=>{
          this.tableData=res.data.list
          this.total=res.data.pagination.total
        })
    },
    methods:{
      changeDensity1(){
        this.density=5
      },
      changeDensity2(){
        this.density=10
      },
      changeDensity3(){
        this.density=0
      },
      exchange(){
        this.isShow=!this.isShow
      },
      onSubmit(){
 
      },
  
      changeCurrentPage(){
        console.log(this.currentPage)
        selectLogList({
        limit:10,
        page:this.currentPage
      }).then(res=>{
          this.tableData=res.data.list
          this.total=res.data.pagination.total
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
          span{
            margin-left: 10px;
            color:blue
          }
        
      
    }
    .bottom{
      margin-top: 20px;
      .title{
        width: 100%;
        height: 60px;
        background-color: white;
        line-height: 60px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content:space-between;
        span{
          margin-left: 10px;
        }
      
       .el-dropdown{
          margin-top: 20px;
        .el-icon{
         
         font-size: 16px;
         font-weight: 500;

        }
       }
      }

      .el-pagination{
        display: flex;
        justify-content: end;
        margin-top: 20px;
      }
     
    
    }
  }
   
  </style>
  