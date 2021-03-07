<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/management/class' }">班级管理</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operations">
      <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
        <el-form-item label="搜索班级">
          <el-input v-model="pageInformations.className" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="pageInformations.academyId" placeholder="学院" clearable >
            <el-option v-for="(item,index) in this.searchAcademy" :key=item.id :label=item.academyName :value=item.id ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="pageInformations.classId" placeholder="年级" clearable >
            <el-option v-for="(item,index) in this.searchGrade" :key=item.id :label=item.gradeName :value=item.id ></el-option>
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
          align="center"
          prop="academyName"
          label="所属学院">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gradeName"
          label="年级">
        </el-table-column>
        <el-table-column
          align="center"
          prop="className"
          label="班级名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="classNum"
          label="班级代码">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createdTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openUpdateForm(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteClass(scope.row.id)" style="color:red">删除</el-button>
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

    <el-dialog title="添加班级" :visible.sync="addFormVisible">
      <el-form :model="addForm" :rules="addRules" ref="ruleAddForm">
        <el-form-item label="所属学院" :label-width="formLabelWidth" prop="academyId">
          <el-select v-model="addForm.academyId" placeholder="学院" style="width: 100%">
            <el-option v-for="(item,index) in this.selectAcademy" :key=item.id :label=item.academyName :value=item.id ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在年级" :label-width="formLabelWidth" prop="classId">
          <el-select v-model="addForm.classId" placeholder="年级" clearable style="width: 100%">
            <el-option v-for="(item,index) in this.selectGrade" :key=item.id :label=item.gradeName :value=item.id ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级名称" :label-width="formLabelWidth" prop="className">
          <el-input v-model="addForm.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级代码" :label-width="formLabelWidth" prop="classNum">
          <el-input v-model="addForm.classNum" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewClass">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改班级信息" :visible.sync="updateFormVisible">
      <el-form :model="updateForm" :rules="updateRules" ref="ruleUpdateForm">
        <el-form-item label="班级名称" :label-width="formLabelWidth" prop="className">
          <el-input v-model="updateForm.className" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级代码" :label-width="formLabelWidth" prop="classNum">
          <el-input v-model="updateForm.classNum" autocomplete="off"></el-input>
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
  import {classJs} from "./classJs"
  import {Msg} from "../../../tools/message";
  import {gradeJs} from "../grade/gradeJs";
  export default {
    name: "index",
    data(){
      return{
        searchInput:'',
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        pageInformations:{
          pageSize:10,
          currentPage:1,
          className:'',
          academyId:'',
          classId:'',
        },
        total:0,
        searchAcademy:[],
        selectAcademy:[],
        searchGrade:[],
        selectGrade:[],
        addForm:{},
        addFormVisible: false,
        updateForm:{},
        updateFormVisible: false,
        formLabelWidth: '120px',
        addRules:{
          academyId:{ required: true, message: '请选择所属学院', trigger: 'blur' },
          classId:{ required: true, message: '请选择所属年级', trigger: 'blur' },
          className:{ required: true, message: '请输入班级名称', trigger: 'blur' },
          classNum:{ required: true, message: '请输入班级代码', trigger: 'blur' },
        },
        updateRules:{
          className:{ required: true, message: '请输入班级名称', trigger: 'blur' },
          classNum:{ required: true, message: '请输入班级代码', trigger: 'blur' },
        }
      }
    },
    mounted() {
      classJs.findSelectAcademy({}).then(res=>{
        this.searchAcademy = res.data.data;
        this.selectAcademy = res.data.data;
      });
      classJs.findGradeSelect({}).then(res=>{
        this.selectGrade = res.data.data;
        this.searchGrade = res.data.data;
      });
      this.selectAllClass();
    },
    methods: {
      onSubmit() {
        this.selectAllClass();
      },
      handleSizeChange(val) {
        this.pageInformations.pageSize = val;
        this.selectAllAcademy();
      },
      handleCurrentChange(val) {
        this.pageInformations.currentPage = val;
        this.selectAllAcademy();
      },
      selectAllClass(){
        classJs.selectAll(this.pageInformations).then(res=>{
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        })
      },
      openAdd(){
        this.addForm = {};
        if (this.$refs['ruleAddForm']!==undefined){
          this.$refs['ruleAddForm'].resetFields();
        }
        this.addFormVisible = true;
      },
      addNewClass(){
        this.$refs['ruleAddForm'].validate((valid) => {
          if (valid) {
            classJs.addNewClass(this.addForm).then(res=>{
              if (res.data.data){
                Msg.success(res.data.message);
              }else{
                Msg.error(res.data.message);
              }
              this.addFormVisible = false;
              this.selectAllClass();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      openUpdateForm(row){
        if (this.$refs['ruleUpdateForm']!==undefined){
          this.$refs['ruleUpdateForm'].resetFields();
        }
        let temp = JSON.stringify(row);
        this.updateForm = JSON.parse(temp);
        this.updateFormVisible = true;
      },
      updateForms(){
        this.$refs['ruleUpdateForm'].validate((valid) => {
          if (valid) {
            classJs.updateClass(this.updateForm).then(res=>{
              console.log(res);
              this.selectAllClass();
              this.updateFormVisible = false;
              Msg.success(res.data.message)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deleteClass(id){
        this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          classJs.deleteClass({id:id}).then(res=>{
            this.selectAllClass();
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
