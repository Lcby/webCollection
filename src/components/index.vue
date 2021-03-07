<template>
  <el-container style="height: 100%">
    <el-header><header-nav @changepwd ="openPwd($event)"/></el-header>
    <el-main><main-nav/></el-main>
    <div>
      <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="新的密码" :label-width="formLabelWidth" prop="newPwd">
            <el-input v-model="form.newPwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="surePwd">
            <el-input v-model="form.surePwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
          <el-form-item label="当前密码" :label-width="formLabelWidth" prop="currentPwd">
            <el-input v-model="form.currentPwd" autocomplete="off" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="changePassword">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </el-container>
</template>

<script>
    import headerNav from './header/index'
    import mainNav from './main/index'
    import {Auth} from "../store/user/auth";
    import {Msg} from "../tools/message";
    import {submitLoginInfo} from "./submitLoginInfo";

    export default {
      name: "index",
      components: {
        'headerNav': headerNav,
        'mainNav':mainNav
      },
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        return {
          dialogFormVisible: false,
          form:{},
          formLabelWidth: '120px',
          rules:{
            newPwd:{ required: true, message: '请输入密码', trigger: 'blur' },
            surePwd:{ required: true,message: '请再次输入密码', trigger: 'blur' },
            currentPwd:{ required: true, message: '请输入原密码', trigger: 'blur' },
          }
        }
      },
      methods: {
        openPwd(data){
          if (this.$refs['ruleForm']!==undefined){
            this.$refs['ruleForm'].resetFields();
          }
          this.form = {};
          this.dialogFormVisible = data;
        },
        changePassword(){
          this.$refs["ruleForm"].validate((valid) => {
            if (valid) {
              if (this.form.newPwd !== this.form.surePwd){
                Msg.error("两次密码不一致，请重试")
              }
              else if (Auth.getUserInfo().password == this.form.currentPwd){
                submitLoginInfo.changePasswords({id:Auth.getUserInfo().id,password:this.form.newPwd}).then(res=>{
                  if (res.data.data){
                    Msg.success(res.data.message);
                    this.$router.push("/")
                  }else {
                    Msg.error(res.data.message)
                  }
                  this.dialogFormVisible = false;
                })
              }else {
                Msg.error("请确认密码正确")
              }
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .el-header{
    height: auto !important;
    background-color: #0099FF;
  }
  .el-main{
    margin: 0;
    padding: 0;
  }
</style>
