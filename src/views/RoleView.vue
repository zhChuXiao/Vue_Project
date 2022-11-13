<template>
  <div class="totalBox">
    <div class="topBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
        <el-form-item label="名称:">
          <el-input v-model="formInline.user" placeholder="请输入名称" style='width:423px' />
        </el-form-item>
        <el-form-item label="标识:">
          <el-input v-model="formInline.user" placeholder="请输入标识" style='width:423px' />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="formInline.user" placeholder="请输入备注" style='width:423px' />
        </el-form-item>

      </el-form>
      <el-form-item class="queryBox">
        <el-button>重置</el-button>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </div>
  </div>
  <div class="bottomBox">
    <div class="jue">
      <div class="jueGuan">角色管理</div>
      <div class="jueRightBox">
        <el-button type="primary">新增</el-button>
      </div>
    </div>
    <el-table :data="tableData" border="true" style="width: 100%">
      <el-table-column prop="序号" label="#" width="60" align="center" />
      <el-table-column prop="name" label="名称" width="180" align="center" />
      <el-table-column prop="identification" label="标识" width="79" align="center" />
      <el-table-column prop="remarks" label="备注" width="200" align="center" />
      <el-table-column prop="creat" label="创建时间" width="300" align="center" />
      <el-table-column prop="updata" label="更新时间" width="300" align="center" />
      <el-table-column prop="address" label="操作" width="150" align="center">
        <template #default>
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>>
    </el-table>

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      formInline: {
        user: '',
        region: '',
      },
      tableData: [
        {
          序号: '55',
          name: 'Tom',
          identification: 'test',
          remarks: '',
          creat: '2022-11-03 09:52:53',
          updata: '2022-11-04 09:56:53'
        },
        {
          序号: '66',
          name: 'Tom',
          identification: 'test',
          remarks: '',
          creat: '2022-11-03 09:52:53',
          updata: '2022-11-04 09:56:53'
        },
        {
          序号: '67',
          name: 'Tom',
          identification: 'test',
          remarks: '',
          creat: '2022-11-03 09:52:53',
          updata: '2022-11-04 09:56:53'
        },
        {
          序号: '68',
          name: 'Tom',
          identification: 'test',
          remarks: '',
          creat: '2022-11-03 09:52:53',
          updata: '2022-11-04 09:56:53'
        },
      ]
    }
  }
});
</script>

<style lang="scss" scoped>
.topBox {
  width: 100%;
  height: 136px;
  padding: 24px;
  margin-bottom: 24px;
  .el-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .el-form-item {
    width: 30%;
  }

  .queryBox {
    float: right;
  }

}

.el-table {
  padding: 0 6px;
}

.jue {
  width: 100%;
  height: 32px;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;

  .jueGuan {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
