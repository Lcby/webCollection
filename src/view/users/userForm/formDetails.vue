<template>
  <div>
    <div class="breadcrumbs" >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/user/personForm' }">个人表单</el-breadcrumb-item>
        <el-breadcrumb-item >表单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="main">
      <div class="title">
        <h1>{{title}}</h1>
        <div class="thanks">
          <p>感谢您抽出宝贵时间参与我们的调查!</p>
          <p>发起者：{{projInfo.username}}</p>
        </div>
      </div>
      <ul class="questList">
        <!-- 循环问题列表 -->
        <li v-for="(item,index) in questions" :key=index>
          <div class="questTitle">
            <span>{{index+1}}.</span>
            {{item.describe}}
          </div>
          <!-- 循环选项列表 -->
          <div v-if="item.type == 'radio' ">
            <el-radio-group v-model="answers[index]" class="inputs">
              <el-radio v-for="(i,k) in item.chooses" :key=k :label="i" >{{i}}</el-radio>
            </el-radio-group>
          </div>
          <div v-if="item.type == 'checkbox'">
            <el-checkbox-group v-model="answers[index]" class="inputs">
              <el-checkbox v-for="(i,k) in item.chooses" :key=k :label="i" ></el-checkbox>
            </el-checkbox-group>
          </div>
          <textarea name="textAns" v-model="answers[index]" id="textQuest" cols="100" rows="5" v-if="item.chooses == null" ></textarea>
        </li>
      </ul>
      <div class="answerBtn">
       <el-button class="answer" type="primary" @click="submit">提交问卷</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {personFormJs} from "./personFormJs";
  import {Auth} from "../../../store/user/auth";
  import {Msg} from "../../../tools/message";
  export default {
    data(){
      return {
        projInfo: this.$route.query.projInfo, // 回答的问卷信息
        questions: [], // 问题信息
        answers: [], // 答案信息
        projectId: null,
        title:''
      }
    },
    methods:{
      // 用户提交问卷
      submit:function(index){
        let self = this;
        console.log(self);
        for (let index = 0; index < self.answers.length; index++) {
            if(self.answers[index]==''){
                alert("第"+(index+1)+"题未填写，请填写后再提交");
                break;
            }
        }
        personFormJs.addNewFeedback({formId:self.projInfo.id,formUserId:Auth.getUserInfo().id,answer:self.answers}).then(res=>{
          Msg.success("填写成功");
          this.$router.go(-1);
        })
      },
    },
    beforeMount(){
      let self = this;
      personFormJs.selectFormDetail({id:self.$route.query.projInfo.id}).then(res=>{
        self.questions = res.data.data.formQuestions;
        self.title = res.data.data.title
        console.log(res.data.data.formQuestions)
        for(let i=0;i<self.questions.length;i++){
          if (self.questions[i].type!=='text'){
            self.questions[i].chooses = JSON.parse(self.questions[i].chooses);
          }
        }
        for(let i=0;i<self.questions.length;i++){
          if(self.questions[i].type == 'checkbox'){
            self.answers[i] = [];
          }else{
            self.answers[i] = '';
          }
        }
      });
    }
  }
</script>

<style lang="scss" scoped>
  .main{
    width: 850px;
    margin: 30px auto 0 auto;
    padding-bottom: 20px;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1{
      margin: 0;
    }
    .title{
      width: 90%;
      padding-top: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border-bottom: 3px solid skyblue;
      p{
        margin: 10px auto;
        color: #aaa;
      }
    }
    .questList{
      width: 90%;
      margin: 30px auto 0 auto;
      padding: 0;
      list-style: none;
      border-bottom: 1px solid #ccc;
      li{
        padding: 20px;
        .questTitle{
          width: 100%;
          margin-bottom: 20px;
          font-size: 1.2em;
          font-weight: bold;
          span{
            font-size: 0.8em;
          }
        }
      }
      .inputs{
        display: flex;
        flex-direction: column;
        .el-checkbox , .el-radio{
          margin: 6px 0;
        }
      }
    }
    .answerBtn{
      width: 100%;
      height: 60px;
      line-height: 60px;
      margin-top: 40px;
      text-align: center;
      .answer{
        width: 50%;
      }
    }
  }
</style>
