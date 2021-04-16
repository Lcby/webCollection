<template>
  <div class="container">
    <div class="login-part">
      <h1>信息收集<span>系统</span></h1>
      <el-form :model="loginForm"  :rules="ruleForm" ref="loginForm" class="login-form" >
        <el-form-item  prop="account" >
          <div class="icon-wrap">
            <i class="el-icon-user-solid"></i>
            <el-input type="text" v-model="loginForm.account" autocomplete="off" placeholder="请输入您的用户名" />
          </div>
        </el-form-item>
        <el-form-item  prop="password" >
          <div class="icon-wrap">
            <i class="el-icon-lock"></i>
            <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入您的密码" />
          </div>
        </el-form-item>

        <el-form-item  prop="type">
          <div class="icon-wrap">
            <el-radio-group v-model="loginForm.type">
              <el-radio label="1" value="1">管理员</el-radio>
              <el-radio label="2" value="2">用户</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="button">
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
            <el-button type="primary" @click="registerForm()">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {Auth} from "../../store/user/auth";
  import {Msg} from "../../tools/message";

  export default {
    name: "index",
    data(){
      return{
        loginForm:{
          account:'',
          password:'',
          isRemember:false
        },//登录表单
        ruleForm:{
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            // {min: 6, max: 16, message: '长度在6-16个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择用户类型', trigger: 'blur'}
          ]
        },//校验表单
        isDisabled:false
      }
    },
    methods:{
      //提交登录
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if(valid){
            if (valid) {
              var that = this;
              let data = {
                account: that.loginForm.account,
                password: that.loginForm.password,
                type:that.loginForm.type
              };
              this.$store.dispatch('accountLoginSubmit', data).then((res) => {
                if (res.data.id!==undefined&&res.data.id!==null&&res.data.id!==''){
                  console.log(res.data);
                  if(res.data.type==1){
                    this.$router.push("/management")
                  }else{
                    this.$router.push("/user")
                  }
                }
              })
            } else {
              console.log('error submit!')
            }
          }
        })
      },
      saveData(){
        this.$store.dispatch('accountLoginSubmit',
          {account:this.loginForm.account,
            password:this.loginForm.password,
          }
        ).then((res => {
          if (res.toString() === 'Error: Network Error'){
            throw errorMessageOsX;
          }
          console.log(res.id)
          if (res.id !== null) {
            Msg.success('登录成功');
            this.$router.push('/homepage');
            this.loginForm = {};
          } else {
            this.$message.error('登录失败，用户名或者密码错误！');
            if (res.toString() === 'Error: Network Error') {
              this.isDisabled = false;//解除锁定
            } else {
              this.isDisabled = false;//解除锁定
              Msg.error('登录失败，用户名或者密码错误！');
            }
          }
        }))
      },
      registerForm(){
        this.$router.push('/register');
      },
      getUser(){
        this.loginForm = Auth.getAccountPwd() || {};
      }
    },
    mounted(){
      this.getUser();
    }
  }
</script>

<style scoped>
  *{
    text-align: center;
  }
  .container{
    background-image: url('../../assets/img/registerBacg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color: #CCCCCC;
    width:100%;
    height:100%;
    margin:0;
    overflow: hidden;
    display:flex;
    align-items: center;
    justify-content: center;
  }
  .login-part{
    border:1px solid seashell;
    box-shadow: 0 0 10px #0099FF;
    width:500px;
    height:420px;
    line-height: 100px;
    background-color: rgba(255,255,255,.3);
  }
  h1{
    color: #04558C;
    font-size: 35px;
  }
  h1 span{
    margin-left: 15px;
    color:#25304C;
    font-size: 38px;
  }
  .el-input{
    width:300px;
  }
  .icon-wrap{
    font-size: 40px;
    color: #0099FF;
    vertical-align: middle;
  }
  .el-input{
    vertical-align: middle;
  }
  .el-col-24 {
    width: 100%;
    position: absolute;
    left: -6%;
    top: 54%;
  }
  .el-button {
    background: rgb(66,190,204);
    width:150px;
    margin:0 23px;
  }
  .button{
    width:500px;
    margin:10px 0;
  }
  .el-button:focus, .el-button:hover {
    border-color: darkgray;
    background-color: lightblue;
  }
  .login-form>>>.el-form-item__error {
    left: 129px;
  }

</style>
