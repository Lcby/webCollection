<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/management' }">学院管理</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operations">
      <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
        <el-form-item label="学院名称">
          <el-input v-model="pageInformations.academyName" placeholder="学院名称"></el-input>
        </el-form-item>
        <el-form-item label="校区">
          <el-select v-model="pageInformations.campus" placeholder="校区" clearable>
            <el-option label="两江" value="两江"></el-option>
            <el-option label="两江/花溪" value="两江/花溪"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
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
          prop="academyName"
          align="center"
          label="学院名称">
        </el-table-column>
        <el-table-column
          prop="campus"
          align="center"
          label="校区">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="classNums"
          align="center"
          label="班级数量">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openUpdateForm(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteAcademy(scope.row.id)" style="color:red">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInformations.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageInformations.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog title="添加学院" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="ruleAddForm">
        <el-form-item label="学院名称" :label-width="formLabelWidth" prop="academyName">
          <el-input v-model="addForm.academyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在校区" :label-width="formLabelWidth" prop="campus">
          <el-select v-model="addForm.campus" placeholder="请选择所在校区" style="width: 100%">
            <el-option label="两江" value="两江"></el-option>
            <el-option label="两江/花溪" value="两江/花溪"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewAcademy">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改学院信息" :visible.sync="updateFormVisible">
      <el-form :model="updateForm" :rules="updateRules" ref="ruleUpdateForm">
        <el-form-item label="学院名称" :label-width="formLabelWidth" prop="academyName">
          <el-input v-model="updateForm.academyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在校区" :label-width="formLabelWidth" prop="campus">
          <el-select v-model="updateForm.campus" placeholder="请选择所在校区" style="width: 100%">
            <el-option label="两江" value="两江"></el-option>
            <el-option label="两江/花溪" value="两江/花溪"></el-option>
          </el-select>
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
  import {academyJs} from './academyJs'
  import {Msg} from "../../../tools/message";
  export default {
    name: "index",
    data(){
      return{
        searchInput:'',
        tableData: [],
        pageInformations:{
          pageSize:10,
          currentPage:1,
          academyName: '',
          campus: ''
        },
        total:0,
        addForm:{},
        addFormVisible: false,
        updateForm:{},
        updateFormVisible: false,
        formLabelWidth: '120px',
        addRules:{
          academyName:[{ required: true, message: '请输入学院名称', trigger: 'blur' }],
          campus:[{ required: true, message: '请输入学院名称', trigger: 'blur' }],
        },
        updateRules:{
          academyName:[{ required: true, message: '请输入学院名称', trigger: 'blur' }],
          campus:[{ required: true, message: '请输入学院名称', trigger: 'blur' }],
        },
      }
    },
    mounted() {
      this.selectAllAcademy();
    },
    methods: {
      onSubmit() {
        this.selectAllAcademy();
      },
      handleSizeChange(val) {
        this.pageInformations.pageSize = val;
        this.selectAllAcademy();
      },
      handleCurrentChange(val) {
        this.pageInformations.currentPage = val;
        this.selectAllAcademy();
      },
      openAdd(){
        if (this.$refs['ruleAddForm']!==undefined){
          this.$refs['ruleAddForm'].resetFields();
        }
        this.addForm = {};
        this.addFormVisible = true
      },
      selectAllAcademy(){
        academyJs.selectAll(this.pageInformations).then(res=>{
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        })
      },
      addNewAcademy(){
        this.$refs['ruleAddForm'].validate((valid) => {
          if (valid) {
            academyJs.addNewAcademy(this.addForm).then(res=>{
              if (res.data.data){
                Msg.success(res.data.message);
              }else{
                Msg.error(res.data.message);
              }
              this.addFormVisible = false;
              this.selectAllAcademy();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openUpdateForm(row){
        let temp = JSON.stringify(row);
        this.updateForm = JSON.parse(temp);
        if (this.$refs['ruleUpdateForm']!==undefined){
          this.$refs['ruleUpdateForm'].resetFields();
        }
        this.updateFormVisible = true;
      },
      updateForms(){
        this.$refs['ruleUpdateForm'].validate((valid) => {
          if (valid) {
            academyJs.updateAcademy(this.updateForm).then(res=>{
              console.log(res);
              this.selectAllAcademy();
              this.updateFormVisible = false;
              Msg.success(res.data.message)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteAcademy(id){
        this.$confirm('此操作将永久删除该学院, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          academyJs.deleteAcademy({id:id}).then(res=>{
            this.selectAllAcademy();
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
    -webkit-box-pack: justify;
    display: -webkit-box;
  }

  .tables{
    min-height: 55vh;
  }

  .pagination{
    display: flex;
    justify-content: center;
  }
</style>
