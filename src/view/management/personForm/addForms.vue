<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management/personForm' }">个人表单</el-breadcrumb-item>
        <el-breadcrumb-item >新增表单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="edit">
      <div class="editor" id="editor">
        <!-- 保存至PDF的部分 -->
        <div class="questions" id="pdfDom">
          <div class="header">
            <input type="text" class="title" placeholder="问卷题目" v-model="projectName">
          </div>
          <div class="main" id="main">
            <ul class="questList" v-if="questInfo.length != 0">
              <li v-for="(item,index) in questInfo" :key=index class="quests">
                <div class="title">
                  <span>{{index+1}}.</span>
                  <input class="questTitle" type="text" placeholder="请输入题目名称" v-model="questInfo[index].questTitle">
                </div>
<div class="answer">
  <div v-for="(i,k) in item.answers" :key = k class="answer-container">
    <input type="radio" disabled v-if="questInfo[index].type == 'radio'">
    <input type="checkbox" disabled v-if="questInfo[index].type == 'checkbox'">
    <input class="answers" type="text" v-model="questInfo[index].answers[k]">
    <i class="el-icon-delete delete-item" @click="deleteOptions(index,k)"></i>
  </div>
</div>
<textarea name="textAns" id="textQuest" cols="20" rows="5" v-if="questInfo[index].type == 'text'" disabled></textarea>
                <el-row class="questBtns">
                  <el-button v-if="questInfo[index].type != 'text' " type="primary" class="delBtn" @click="addOptions(index)" icon="el-icon-plus" circle></el-button>
                  <el-button type="primary" class="delBtn" @click="removeQuest(index)" icon="el-icon-delete" circle></el-button>
                </el-row>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer" @click="changeOpts">
          <div v-if="showOpt">
            <el-button class="addBtns" @click="addOpts('radio')" plain>单选题</el-button>
            <el-button class="addBtns" @click="addOpts('checkbox')" plain>多选题</el-button>
            <el-button class="addBtns" @click="addOpts('text')" plain>文字题</el-button>
          </div>
          <div v-else>
            <el-button class="showOpts" @click.stop="showOpts">添加问题</el-button>
          </div>
        </div>
        <div class="btns">
<!--          <el-button @click="getPdf()">将问卷另存为PDF</el-button>-->
          <el-button class="btn" @click="saveQuest">保存问卷</el-button>
          <el-button type="primary" class="btn publicBtn" @click="dialogFormVisible = true">发布问卷</el-button>
        </div>
      </div>
    </div>
    <el-dialog title="选择范围" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="校级/班级" :label-width="formLabelWidth" >
          <el-select v-model="form.level" placeholder="请选择范围" style="width: 100%">
            <el-option label="校级" value="1"></el-option>
            <el-option label="班级" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth" v-if="this.form.level == 2">
          <el-select v-model="form.classId" placeholder="请选择班级" filterable clearable style="width: 100%">
            <el-option v-for="(item) in this.selectAllClasses" :key=item.id :label=item.className :value=item.id ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="publicQuest">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {personFormJs} from "./personFormJs";
  import {Auth} from "../../../store/user/auth";
  import {Msg} from "../../../tools/message";

  export default {
    props:['id'],
    data(){
      return{
        projectName: '',
        questInfo: [],
        checked: null,
        showOpt: false,
        isSaved: false, // 用户是否保存
        projectNameCopy : '',
        questInfoCopy: [],  //判断用户是否编辑
        count: 0,
        dialogFormVisible: false,
        form:{
          level:'1',
          classId:''
        },
        selectAllClasses:[],
        formLabelWidth: '120px'
      }
    },
    computed:{
      htmlTitle(){
        return this.projectName
      }
    },
    updated(){
      this.count++;
    },
    methods:{
      showOpts: function(){
        this.showOpt = !this.showOpt;
      },
      changeOpts: function(){
        if(this.showOpt){
          this.showOpt = !this.showOpt;
        }
      },
      // 添加题目
      addOpts:function(type){
        // 类型为单选或者多选
        if(type == 'radio' || type == 'checkbox'){
          let typeZN = ''
          if (type == 'radio'){
            typeZN = '单选'
          }
          if(type == 'checkbox'){
            typeZN = '多选'
          }
          this.questInfo.push(
            {
              questTitle: '请输入题目'+`（${typeZN}）`,
              type: type,
              answers:['选项1','选项2','选项3']
            }
          )
        }
        // 类型是文本
        else{
          this.questInfo.push({
            questTitle: '请输入题目',
            type: type
          })
        }
      },
      // 添加选项
      addOptions:function(i){
        this.questInfo[i].answers.push('选项'+(this.questInfo[i].answers.length+1));
      },
      // 删除选项
      deleteOptions: function(i,k){
        if(this.questInfo[i].answers.length > 2){
          this.questInfo[i].answers.splice(k,1);
        }else{
          this.$message({
            message: '请至少提供两个选项！',
            type: 'warning'
          })
        }
      },
      // 删除题目
      removeQuest:function(i){
        this.questInfo.splice(i,1);
      },
      // 保存问卷
      saveQuest:function(){
        let id = this.$route.params.id;
        if(this.projectName == ''){
          this.$alert('请先输入问卷名称','问卷名称不能为空',{
            confirmButtonText: '好'
          })
        }else if(id>=0){
          window.localStorage.setItem(this.projectName,JSON.stringify(this.questInfo));
          this.$store.commit('updateProjects',{
            code: 1,
            id: id,
            content: this.projectName
          })
          this.$message({
            message: '恭喜！保存成功！',
            type: 'success'
          });
          this.isSaved = true;
          this.$router.go(-1);
        }
        else{
          let questList = this.$store.state.projects;
          // 判断是是否有重复的名称
          if(questList.includes(this.projectName)){
            this.$alert('名称不能相同','此名称已存在',{
              confirmButtonText: '好'
            })
          }else{
            // 名称不重复，保存
            window.localStorage.setItem(this.projectName,JSON.stringify(this.questInfo));
            this.$store.commit('updateProjects',{
              code: 0,
              value: this.projectName
            });
            this.$message({
              message: '恭喜！保存成功！',
              type: 'success'
            })
            this.isSaved = true;
            this.$router.go(-1);
          }
        }
      },
      // 发布问卷
      publicQuest:function(){
        let self = this;
        let time = new Date();
        console.log(self.questInfo);
        personFormJs.addNewForm({projectName:self.projectName,newFormQuestions:self.questInfo,
          adminId:Auth.getUserInfo().id,level:this.form.level,classId:this.form.classId}).then(res=>{
          self.count = 0;
          Msg.success(res.data.message);
          this.dialogFormVisible = false;
          this.$router.push("/management/personForm")
        })
      }
    },
    beforeCreate(){
    },
    beforeMount:function(){
      if(this.$route.params.id >= 0){
        this.projectName = this.$store.state.projects[this.$route.params.id];
        this.questInfo = JSON.parse(window.localStorage.getItem(this.projectName));
      }
      personFormJs.selectALLClass().then(res=>{
        this.selectAllClasses = res.data.data;
      });
    },
    // 未保存询问是否立即退出
    beforeRouteLeave (to, from, next) {
      const tip = '当前页面未保存，是否继续退出？'
      // 如果无编辑，直接返回
      if(this.count == 0){
        next();
      }else if(this.isSaved == false){
        // 未保存，询问
        this.$confirm(tip,'提示',{
          confirmButtonText: '是',
          cancelButtonText:'取消',
          type: 'warning'
        }).then(()=>{
          next();
        }).catch(()=>{
          next(false);
        })
      }else{
        next();
      }
    }
  }
</script>

<style lang="scss" scoped>
  input{
    border: 0;
    outline: none;
  }
  .edit{
    display: flex;
    justify-content: center;
    .editor{
      background-color: white;
      width: 850px;
      margin-top: 50px;
      border: 1px solid gray;
      display: flex;
      flex-direction: column;
      .header{
        width: 95%;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
        text-align: center;
        border-bottom: 1px solid gray;
        display: flex;
        justify-content: center;
        .title{
          outline: none;
          border: 0;
          font-size: 1.5rem;
          text-align: center;
        }
      }
      .main{
        margin-top: 20px;
        margin-left: 10px;
        margin-right: 10px;
        .title{
          font-size: 2em;
        }
        .questList{
          list-style-type: none;
          position:relative;
          padding-bottom: 10px;
          .questTitle{
            border: 0;
            outline: none;
            font-size: 1.2rem;
            width:90%;
          }
          #textQuest{
            outline: none;
            font-size: 1em;
            width: 90%;
            margin: 5px auto;
          }
          .questBtns{
            height: 40px;
            line-height: 40px;
            display: flex;
            padding-right: 20px;
            justify-content: flex-end;
            .delBtn{
              visibility: hidden;
            }
          }
          .quests:hover{
            .delBtn{
              visibility: inherit;
            }
          }
        }
        .answer{
          display: flex;
          flex-direction: column;
          .answers{
            height: 40px;
            line-height: 40px;
            font-size: 1rem;
            width: 90%;
          }
          .answer-container:hover{
            .delete-item{
              visibility: inherit;
            }
          }
          .delete-item{
            visibility: hidden;
            color: red;
            cursor: pointer;
          }
        }
      }
      .footer{
        width: 95%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        border-bottom: 1px solid gray;
        margin: 0 auto;
        .addBtns{
          animation: flash .2s linear;
        }
        .showOpts{
          width: 70%;
        }
      }
      .btns{
        margin: 10px 0;
        display: flex;
        justify-content: flex-end;
        .btn{
          width: 15%;
          height: 40px;
          margin-right: 2em;
        }
      }
    }
  }
  @keyframes flash {
    0% {
      opacity: 0;
      margin:0 20px;
    }
    50% {
      opacity: .3;
      margin:0 15px;
    }
    100% {
      opacity: 1;
      margin: 0 10px;
    }
  }
</style>
