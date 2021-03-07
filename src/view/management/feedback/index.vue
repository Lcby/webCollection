<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/management/feedback' }">意见反馈</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operations">
      <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
        <el-form-item label="内容">
          <el-input v-model="pageInformations.content" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="pageInformations.type" placeholder="请选择" clearable>
            <el-option label="是" value=1></el-option>
            <el-option label="否" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否回复">
          <el-select v-model="pageInformations.isReply" placeholder="请选择" clearable>
            <el-option label="是" value=1></el-option>
            <el-option label="否" value=2></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
          prop="content"
          align="center"
          label="反馈内容">
        </el-table-column>
        <el-table-column
          prop="type"
          align="center"
          label="反馈类型">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="反馈人">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          label="反馈时间">
        </el-table-column>
        <el-table-column
          prop="answer"
          align="center"
          label="回复内容">
        </el-table-column>
        <el-table-column
          prop="adminName"
          align="center"
          label="回复人">
        </el-table-column>
        <el-table-column
          prop="replyTime"
          align="center"
          label="回复时间">
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openReplyForm(scope.row)">回复</el-button>
            <el-button type="text" size="small" style="color:red">删除</el-button>
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
    <el-dialog title="回复反馈" :visible.sync="replyFormVisible">
      <el-form :model="replyForm" :rules="rules" ref="ruleForm">
        <el-form-item label="回复内容" :label-width="formLabelWidth" prop="answer">
          <el-input v-model="replyForm.answer" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="replyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {feedbackJs} from "./feedbackJs";
  import {Auth} from "../../../store/user/auth";
  import {Msg} from "../../../tools/message";

  export default {
    name: "index",
    data(){
      return{
      rules: {
        answer: [
          { required: true, message: '请输入回复', trigger: 'blur' },
        ]},
        searchInput:'',
        formInline: {
          user: '',
          region: ''
        },
        tableData: [],
        pageInformations:{
          pageSize:10,
          currentPage:1,
          content:'',
          type:'',
          isReply:'',
        },
        total:0,
        replyFormVisible:false,
        replyForm:{},
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.selectAllFeedback();
    },
    methods: {
      onSubmit() {
        this.selectAllFeedback();
      },
      handleSizeChange(val) {
        this.pageInformations.pageSize = val;
        this.selectAllAcademy();
      },
      handleCurrentChange(val) {
        this.pageInformations.currentPage = val;
        this.selectAllAcademy();
      },
      selectAllFeedback(){
        if (this.pageInformations.isReply == ''){
          this.pageInformations.isReply = 0
        }
        feedbackJs.selectAll(this.pageInformations).then(res=>{
          this.total = res.data.data.total;
          this.tableData = res.data.data.list;
          if (this.pageInformations.isReply == 0){
            this.pageInformations.isReply = ''
          }
        })
      },
      openReplyForm(row){
        this.replyFormVisible = true;
        if (this.$refs['ruleForm']!==undefined){
          this.$refs['ruleForm'].resetFields();
        }
        this.replyForm.id = row.id;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            feedbackJs.replyFeedback({id:this.replyForm.id,answer:this.replyForm.answer,adminId:Auth.getUserInfo().id}).then(res=>{
              Msg.success(res.data.message);
              this.replyFormVisible = false
              this.selectAllFeedback();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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
