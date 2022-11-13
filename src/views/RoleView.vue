<template>
  <div class="totalBox">
    <div class="topBox">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
        <el-form-item label="名称:">
          <el-input v-model="formInline.name" placeholder="请输入名称" style='width:423px' />
        </el-form-item>
        <el-form-item label="标识:">
          <el-input v-model="formInline.label" placeholder="请输入标识" style='width:423px' />
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="formInline.remark" placeholder="请输入备注" style='width:423px' />
        </el-form-item>

      </el-form>
      <el-form-item class="queryBox">
        <el-button>重置</el-button>
        <el-button type="primary" @click="askRole">查询</el-button>
      </el-form-item>
    </div>
  </div>
  <div class="bottomBox">
    <div class="jue">
      <div class="jueGuan">角色管理</div>
      <div class="jueRightBox">
        <el-button type="primary" @click="addTable">新增</el-button>
        <el-dialog v-model="dialogVisible" title="新增角色" width="50%" :before-close="handleClose">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" :rules="rules">
            <el-form-item label="名称:" label-width="100px" prop="name">
              <el-input v-model="formInline.addUser" placeholder="请输入名称" style='width:332px' />
            </el-form-item>
            <el-form-item label="标识:" label-width="90px" prop="label">
              <el-input v-model="formInline.addLabel" placeholder="请输入标识" style='width:332px' />
            </el-form-item>
            <el-form-item label="备注:" label-width="100px">
              <el-input type="textarea" v-model="formInline.addRemark" placeholder="请输入备注" style='width:788px' />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="confirm">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
        <el-icon>
          <RefreshLeft />
        </el-icon>
      </div>
    </div>
<<<<<<< HEAD
    <el-table :data="tableData" border="true" style="width: 100%">
      <el-table-column prop="序号" label="#" width="60" align="center" />
      <el-table-column prop="name" label="名称" width="180" align="center" />
      <el-table-column prop="identification" label="标识" width="79" align="center" />
      <el-table-column prop="remarks" label="备注" width="200" align="center" />
      <el-table-column prop="creat" label="创建时间" width="300" align="center" />
      <el-table-column prop="updata" label="更新时间" width="300" align="center" />
      <el-table-column prop="address" label="操作" width="150" align="center">
        <template #default>
=======
    <el-table :data="tableData" :border="true" style="width: 99.15%">
      <el-table-column prop="id" label="#" width="60" align="center" />
      <el-table-column prop="name" label="名称" width="199" align="center" />
      <el-table-column prop="label" label="标识" width="79" align="center" />
      <el-table-column prop="remarks" label="备注" width="384" align="center" />
      <el-table-column prop="createdAt" label="创建时间" width="384" align="center" />
      <el-table-column prop="updatedAt" label="更新时间" width="384" align="center" />
      <el-table-column prop="address" label="操作" width="159" align="center">
        <template #default="scope">
>>>>>>> 8b76ed7c7ffa7615e50b7cd74d8fde6ff839d305
          <el-button link type="primary" size="small">编辑</el-button>
          <el-button link type="primary" size="small" @click="delData(scope.row)">删除</el-button>
        </template>
      </el-table-column>>
    </el-table>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getRoleList, getPageRole, addRole, deleteRole } from '@/api/role.js';

export default defineComponent({
  data() {
    return {
      formInline: {
        name: '',
        label: '',
        remark: '',
        addUser: '',
        addLabel: '',
        addRemark: ''
      },
      tableData: [],
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
        label: [
          { required: true, message: '请输入标识', trigger: 'blur' },
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    getData() {
      getRoleList().then(res => {
        console.log(res)
        // res.data.forEach((item) => {
        //   this.tableData.push(item)
        // })
        this.tableData = res.data
      })
    },
    // askRole() {
    //   getPageRole(75).then(res => {
    //     console.log(res)
    //   })
    // },
    confirm() {
      if (this.formInline.addUser && this.formInline.addLabel) {
        addRole({
          name: this.addUser,
          label: this.addLabel,
          remark: this.addRemark,
          menus: [1, 3, 37, 57, 85, 4, 7, 23, 51, 55, 69, 70, 58, 66, 86, 5, 6, 20, 33, 34, 35, 36, 39, 40, 41, 68, 104, 8, 9, 10, 19, 155, 156, 25, 28, 29, 32, 52, 53, 56, 59, 60, 61, 62, 63, 64, 65, 67, 87, 88, 89, 90, 114, 44, 26, 27],
          depts: [1, 2, 59, 69, 73, 74, 75, 77, 23, 76, 60, 25]
        }).then(res => {
          console.log(res)
        })
        this.formInline.addUser = ''
        this.formInline.addLabel = ''
        this.formInline.addRemark = ''
        this.dialogVisible = false
        this.getData()
      } else {
        this.dialogVisible = true
        ElMessage({
          message: '请填写必填内容',
          type: 'warning',
        })
      }
    },
    addTable() {
      this.dialogVisible = true
    },
    delData(row) {
      // console.log(row)
      deleteRole({
        "roleIds": [row.id]
      }).then(res => {
        console.log(res)
        this.getData()
      })
    }
  },
  mounted() {
    this.getData()
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

  .jueRightBox .el-button {
    margin-right: 16px;
  }
}
</style>
