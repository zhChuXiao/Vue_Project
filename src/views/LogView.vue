<template>
   <div class="all">
    <div class="bottom">
        <div class="title">
          <span>任务日志</span>
          <div>
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
       



          
        <el-table :data="tableData" style="width: 100%" :cell-style="{padding: this.density+'px'}">
          <el-table-column prop="id" label="#" width="190" />
          <el-table-column prop="taskId" label="任务编号" width="180" />
          <el-table-column prop="name" label="任务名称" width="180" />
          <el-table-column prop="detail" label="异常信息" width="180" />
          <el-table-column prop="consumeTime" label="耗时" width="180" >
            <template v-slot={row}>
              <el-tag type="info">{{row.consumeTime+"ms"}}</el-tag>
            </template>
          </el-table-column>>
          <el-table-column prop="status" label="状态" width="180" >
            <template #default={row}>
              <el-tag type="success">{{row.status=1?'成功':'失败'}}</el-tag>
            </template>
          </el-table-column>>

          <el-table-column prop="createdAt" label="执行时间" width="180" />
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
    import {LogList} from '@/api/log'
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
            name:'',
            taskId:'',
            createdAt:'',
            consumeTime:'',
            detail:'',
            status:''
          },
          tableData:[]
        }
      },
      created(){
        LogList({
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
        changeCurrentPage(){
          console.log(this.currentPage)
          LogList({
          limit:10,
          page:this.currentPage
        }).then(res=>{
            this.tableData=res.data.list
            this.total=res.data.pagination.total
          })
      
        },
        
      }
    });
    </script>
    
    <style lang="scss" scoped>
   .all{
    background-color: #e5e7eb;
    padding: 20px;
    width: 100%;
    height: 1000px;
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
       .icon{
        padding: 10px;
        .el-icon{
          margin:0 10px;
        }
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
    