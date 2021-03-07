<template>
   <div class="body">
     <div class="register-part">
       <h1>用户<span>注册</span></h1>
       <el-form :model="registeredForm" :rules="rules" ref="registeredForm" label-width="105px" >
         <el-form-item label="姓名" prop="name" class="register-form">
           <el-input v-model="registeredForm.name" placeholder="请输入您的用户名"></el-input>
         </el-form-item>
         <el-form-item label="学号" prop="account" class="register-form">
           <el-input v-model="registeredForm.account" placeholder="请输入您的学号"></el-input>
         </el-form-item>
         <el-form-item label="密码" prop="password" class="register-form">
           <el-input type="password" v-model="registeredForm.password" placeholder="请输入您的密码"></el-input>
         </el-form-item>
         <el-form-item label="确认密码" prop="checkPassword" class="register-form">
           <el-input type="password" v-model="registeredForm.checkPassword" placeholder="请再次输入您的密码"></el-input>
         </el-form-item>
         <el-form-item label="学院" prop="academyId" class="register-form">
           <el-select v-model="registeredForm.academyId" placeholder="学院" clearable @change="findClasses">
             <el-option v-for="(item,index) in this.selectAcademy" :key=item.id :label=item.academyName :value=item.id ></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="年级" prop="classId" class="register-form" >
           <el-select v-model="registeredForm.classId" placeholder="年级" clearable @change="findClasses">
             <el-option v-for="(item,index) in this.selectGrade" :key=item.id :label=item.gradeName :value=item.id ></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="班级" prop="classesId" class="register-form">
           <el-select v-model="registeredForm.classesId" placeholder="班级" clearable >
             <el-option v-for="(item,index) in this.selectClass" :key=item.id :label=item.className :value=item.id ></el-option>
           </el-select>
         </el-form-item>
         <el-form-item class="register-button">
           <el-button type="primary" @click="registerUser">注册</el-button>
           <el-button type="primary" @click="cancelRegister">返回</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
</template>

<script>
    import {registerJs} from "./registerJs";
    import {Msg} from "../../tools/message";

    export default {
      name: "index",
      data(){
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.registeredForm.password !== this.registeredForm.checkPassword) {
              callback(new Error('两次密码不一样'));
            }else{
              callback();
            }
          }
        };
        var validateAccount = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入账号'));
          } else {
            registerJs.loginManagement({account: this.registeredForm.account, type:2}).then(res=>{
              if(res.data.code==200){
                callback(new Error('该账号已存在，请直接登录'));
              }else {
                callback();
              }
            })
          }
        };
        return {
          registeredForm: {
            password: '',
            checkPassword: '',
          },
          addForm:{},
          selectGrade:[],
          selectAcademy:[],
          findClass:[],
          selectClass:[],
          rules: {
            name: [
              { required: true, message: '请输入用户名', trigger: 'change' }
            ],
            account: [
              { required: true, validator: validateAccount, trigger: 'blur' }
            ],
            password: [
              { required: true, message: '请输入密码', trigger: 'change' }
            ],
            checkPassword: [
              { required: true, validator:validatePass, trigger: 'change' }
            ],
            academyId: [
              { required: true, message: '请选择学院', trigger: 'change' }
            ],
            classId: [
              { required: true, message: '请选择年级', trigger: 'change' }
            ],
            classesId: [
              { required: true, message: '请选择班级', trigger: 'change' }
            ],
          }
        }
      },
      mounted() {
        registerJs.findSelectAcademy({}).then(res=>{
          this.selectAcademy = res.data.data;
        });
        registerJs.findGradeSelect({}).then(res=>{
          this.selectGrade = res.data.data;
        });
        // this.findClasses();
      },
      methods:{
        cancelRegister() {
          this.$router.push("/")
        },
        registerUser(){
          this.$refs['registeredForm'].validate((valid) => {
            if (valid) {
              registerJs.addNewUser(this.registeredForm).then(res=>{
                Msg.success("注册成功，请登录");
                this.$router.push("/");
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        findClasses(){
          registerJs.findClassSelect(this.registeredForm).then(res=>{
            this.selectClass = res.data.data;
          });
        },
      }
    }
</script>

<style scoped>
  *{
    text-align: center;
  }
  .body{
    background-image: url('../../assets/img/registerBacg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #CCCCCC;
    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-part{
    width:500px;
    min-height:540px;
    background-color: rgba(255,255,255,.7);
    border:1px solid seashell;
    box-shadow: 0 0 10px #0099FF;
  }
  h1{
    color: #99CCFF;
    font-size: 30px;
    margin-top:5%;
  }
  h1 span{
    color: #FFCC33;
    font-size: 34px;
    margin-left: 15px;
  }
  .register-form >>>.el-form-item__label{
    color: #333333;
    font-weight: bold;
    font-size:20px;

  }
  .register-form>>>.el-form-item__content{
    margin: 0 !important;
  }
  .register-form{
    display: flex;
    justify-content: flex-start;
  }
  .el-input{
    width:320px;
  }
  .el-select{
    width: 320px;
  }
  .register-button{
    margin-top:50px;
    width:500px;
    margin-left: -50px;
  }
  .el-button{
    width:160px;
    margin:0 12px;
    color:white;
    background-color: rgb(66,190,204);
  }

  .el-button:focus, .el-button:hover {
    border-color: darkgray;
    background-color: lightblue;
  }

</style>
