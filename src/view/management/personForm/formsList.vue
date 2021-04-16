<!--  -->
<template>
  <div>
    <div class="breadcrumbs" >
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/management/personForm' }">个人表单</el-breadcrumb-item>
            <el-breadcrumb-item >表单详情列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="operations">
      <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
        <el-form-item label="姓名/学号">
          <el-input v-model="pageInformations.search" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="pageInformations.isWrite" placeholder="请选择" clearable>
            <el-option label="已填写" value="1"></el-option>
            <el-option label="未填写" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectFormList()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="downloadfile()">导出</el-button>
    </div>
    <h1 style="text-align:center">{{formName}}的表单填写详情</h1>
    <div class="tables">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column
                prop="nickname"
                label="姓名"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="account"
                label="学号"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="isWrite"
                :formatter="changeWriteProp"
                align="center"
                label="填写状态">
            </el-table-column>
            <el-table-column
                prop="writedTime"
                align="center"
                label="填写时间">
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    v-if='scope.row.isWrite==1'
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">查看</el-button>
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
  </div>
</template>

<script>
import {personFormJs} from "./personFormJs";
export default {
  data () {
    return {
        tableData: [],
        formName:this.$route.query.formName,
        pageInformations:{
          pageSize:10,
          currentPage:1,
          search: '',
          isWrite:'',
          isColor:false,
          id:this.$route.query.id,
          formId: this.$route.query.formId, // 问卷id
        },  
        total:0,          
    };
  },
  mounted(){
    this.selectFormList();
  },

  methods: {
    selectFormList(){
      personFormJs.selectFormList(this.pageInformations).then(res=>{
        this.tableData = res.data.data.list;
        this.total = res.data.data.total
      })
    },
    
    handleEdit(index,row){
      // console.log(row.id);
      this.$router.push({path:'/management/personForm/userFormAnswers',
      query:{projInfo:{projectName:this.formName,username:"",
      id:this.pageInformations.id,userId:row.id,formId:this.pageInformations.formId}}})
      // console.log(this.pageInformations.id);
    },
    handleSizeChange(val) {
      this.pageInformations.pageSize = val;
      this.selectFormList();
    },
    handleCurrentChange(val) {
      this.pageInformations.currentPage = val;
      this.selectFormList();
    },

    changeWriteProp(row, column){
      const manProp = row[column.property];
      var string = null;
      if(manProp == 1){
        string = "已填写";
      }
      else{
        string = "未填写";
      }
      return string;
    },

    downloadfile(){
      window.location.href="http://localhost:8090/formExcel/excelDownloads?id="+this.pageInformations.id;
    }
  }
}

</script>
<style lang='scss' scoped>

    h1{
      margin-top: 0;
    }

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