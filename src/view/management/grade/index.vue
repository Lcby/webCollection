<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/management/grade' }">年级管理</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operations">
      <el-button type="primary" @click="openAdd">添加</el-button>
    </div>
    <div class="tables">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="序号"
          align="center"
          type="index">
        </el-table-column>
        <el-table-column
          prop="gradeName"
          align="center"
          label="年级名称">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openUpdateForm(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteGrade(scope.row.id)" style="color:red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page=pageInformations.currentPage
        :page-sizes="[5, 10, 15]"
        :page-size=pageInformations.pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=total>
      </el-pagination>
    </div>

    <el-dialog title="添加年级" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="ruleAddForm">
        <el-form-item label="年级名称" :label-width="formLabelWidth" prop="gradeName">
          <el-input v-model="addForm.gradeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewGrade">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改年级信息" :visible.sync="updateFormVisible">
      <el-form :model="updateForm" :rules="updateRules" ref="ruleUpdateForm">
        <el-form-item label="年级名称" :label-width="formLabelWidth" prop="gradeName">
          <el-input v-model="updateForm.gradeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateForms">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {gradeJs} from "./gradeJs"
  import {Msg} from "../../../tools/message";
  export default {
    name: "index",
    data(){
      return{
        tableData: [],
        pageInformations:{
          pageSize:10,
          currentPage:1
        },
        total:0,
        selectAcademy:[],
        addForm:{},
        addFormVisible: false,
        updateForm:{},
        updateFormVisible: false,
        formLabelWidth: '120px',
        addRules:{
          gradeName:[{ required: true, message: '请输入年级名称', trigger: 'blur' }],
        },
        updateRules:{
          gradeName:[{ required: true, message: '请输入年级名称', trigger: 'blur' }],
        }
      }
    },
    mounted() {
      this.selectAllGrade();
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSizeChange(val) {
        this.pageInformations.pageSize = val;
        this.selectAllAcademy();
      },
      handleCurrentChange(val) {
        this.pageInformations.currentPage = val;
        this.selectAllAcademy();
      },
      selectAllGrade(){
        gradeJs.selectAllGrade(this.pageInformations).then(res=>{
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        })
      },
      openAdd(){
        if (this.$refs['ruleAddForm']!==undefined){
          this.$refs['ruleAddForm'].resetFields();
        }
        this.addForm = {};
        this.addFormVisible = true;
      },
      addNewGrade(){
        this.$refs["ruleAddForm"].validate((valid) => {
          if (valid) {
            gradeJs.addNewGrade(this.addForm).then(res=>{
              if (res.data.data){
                Msg.success(res.data.message);
              }else{
                Msg.error(res.data.message);
              }
              this.addFormVisible = false;
              this.selectAllGrade();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openUpdateForm(row){
        let temp = JSON.stringify(row);
        if (this.$refs['ruleUpdateForm']!==undefined){
          this.$refs['ruleUpdateForm'].resetFields();
        }
        this.updateForm = JSON.parse(temp);
        this.updateFormVisible = true;
      },
      updateForms(){
        this.$refs["ruleUpdateForm"].validate((valid) => {
          if (valid) {
            gradeJs.updateGrade(this.updateForm).then(res=>{
              console.log(res);
              this.selectAllGrade();
              this.updateFormVisible = false;
              Msg.success(res.data.message)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteGrade(id){
        this.$confirm('此操作将永久删除该年级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          gradeJs.deleteGrade({id:id}).then(res=>{
            this.selectAllGrade();
            Msg.success(res.data.message)
          })
        });
      }
    }
  }
</script>

<style scoped>
  .breadcrumbs{
    margin-bottom: 20px;
  }
  .operations{
    text-align: right;
    margin-bottom: 20px;
  }

  .tables{
    min-height: 55vh;
  }

  .pagination{
    display: flex;
    justify-content: center;
  }
</style>
