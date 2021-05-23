<!--  -->
<template>
  <div>
    <div class="breadcrumbs" >
        <el-breadcrumb separator="">
            <el-breadcrumb-item :to="{ path: '/user' }">个人信息</el-breadcrumb-item>
            <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div>
        <div class="user-detail user-detail-first">
            <div class="title">
               <div>头像</div>
            </div>
            <div class="update-info">
                 <el-avatar :size="80" :src="userInfo.avator" />
                 <!-- <div class="update-button">上传</div> -->
            </div>
        </div>
        <div class="user-detail">
            <div class="title">
               <div>昵称</div>
            </div>
            <div class="update-info">
                <div>{{userInfo.nickname}}</div>
                <div class="update-button" @click="openDialog()">修改</div>
            </div>
        </div>        
        <div class="user-detail">
            <div class="title">
                <div>学号</div>
            </div>
            <div>
                <div>{{userInfo.account}}</div>
            </div>
        </div>        
        <!-- <div class="user-detail">
            <div class="title">
               <div>班级</div>
            </div>
            <div>
                <div>117030802</div>
            </div>
        </div>         -->
    </div>

    <el-dialog title="修改昵称" :visible.sync="dialogFormVisible" >
        <el-form :model="form" :rules="rules" ref="ruleForm">
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeNickname()">确 定</el-button>
        </div>
    </el-dialog>    
  </div>
</template>

<script>
import {Auth} from "../../../store/user/auth";
import {userInfoJs} from "./userInfo";
import {Msg} from "../../../tools/message";
export default {
  data () {
    return {
        ruleForm:{},
        userInfo:{},
        dialogFormVisible: false,
        form:{
            name:''
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入新的昵称', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
    };
  },

  mounted(){
    this.userInfo = Auth.getUserInfo();
  },
  methods: {
      openDialog(){
        if (this.$refs['ruleForm']!==undefined){
            this.$refs['ruleForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.form.name = this.userInfo.nickname;
      },
      changeNickname(){
          this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            userInfoJs.changeNickname({
                id:Auth.getUserInfo().id,
                nickname:this.form.name
            }).then(res=>{
                this.userInfo.nickname = this.form.name;
                Auth.setUserInfo(this.userInfo);
                location.reload();
                Msg.success("修改昵称成功");
                this.dialogFormVisible = false;
            })  
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  }
}

</script>
<style lang="scss" scoped>
    .breadcrumbs{
        margin-bottom: 20px;
    }
    .user-detail-first{
        border-top:1px solid rgba($color: #000000, $alpha: .1);
    }
    .user-detail{
        display: flex;
        align-items: center;
        font-size: 25px;
        font-weight: 500;
        padding: 0 20px;
        height: 100px;
        border-bottom: 1px solid rgba($color: #000000, $alpha: .1);
        .title{
            flex-grow: 0;
            margin-right: 120px;
        }
    }

    .update-info{
        display: flex;
        justify-content: space-between;
        flex-grow: 1;
        align-items: center;
        .update-button{
            font-size: 15px;
            cursor: pointer;
            color: skyblue;
        }
    }
</style>