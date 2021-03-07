<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/management/users' }">成员管理</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operations">
      <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="pageInformations.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="学号">
          <el-input v-model="pageInformations.sno" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="pageInformations.academyId" placeholder="学院" clearable >
            <el-option v-for="(item,index) in this.searchAcademy" :key=item.id :label=item.academyName :value=item.id ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectAllUsers">查询</el-button>
        </el-form-item>
      </el-form>
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
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          align="center"
          prop="nickname"
          label="昵称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="sno"
          label="学号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          align="center"
          prop="idCard"
          label="身份证号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="academyName"
          label="学院">
        </el-table-column>
        <el-table-column
          align="center"
          prop="gradeName"
          label="年级">
        </el-table-column>
        <el-table-column
          align="center"
          prop="className"
          label="班级">
        </el-table-column>
<!--        <el-table-column-->
<!--          align="center"-->
<!--          label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button type="text" size="small">查看</el-button>-->
<!--            <el-button type="text" size="small" style="color:red">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
  </div>
</template>

<script>
  import {usersJs} from "./usersJs";

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
          name:'',
          sno:'',
          academyId:'',
        },
        total:0,
        searchAcademy:[],
      }
    },
    mounted() {
      usersJs.findSelectAcademy({}).then(res=>{
        this.searchAcademy = res.data.data;
      });
      this.selectAllUsers();
    },
    methods: {
      selectAllUsers(){
        usersJs.selectAll(this.pageInformations).then(res=>{
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
        })
      },
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
