<template>
  <div class="headers">
    <div><h1>信息收集系统</h1></div>
    <div class="right">
      <span class="right-distance">欢迎登陆</span>
      <div class="user-info right-distance">
        <span class="nickname">{{infoData.nickname}}</span>
        <el-avatar size="small" :src="infoData.avator"></el-avatar>
      </div>
      <el-button class="right-distance" type="text" @click="openChangePwd()"><i class="el-icon-setting" />修改密码</el-button>
      <el-button class="right-distance" type="text" @click="exitLogin"><i class="el-icon-switch-button"/>退出登录</el-button>
    </div>
  </div>
</template>

<script>
  import {Auth} from "../../store/user/auth";
  export default {
    name: "index",
    data(){
      return{
        dialogFormVisible: false,
        form:{},
        infoData:{},
        userName:'',
        formLabelWidth: '120px',
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    },
    mounted() {
      this.getUser();
    },
    methods:{
      openChangePwd(){
        this.$emit('changepwd',true);
      },
      getUser() {
        this.infoData = Auth.getUserInfo();
        this.userName = Auth.getUserInfo().userName;
      },
      /** 退出登录 */
      exitLogin: function () {
        this.$confirm('确认退出登录？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$store.dispatch('accountLogoutSubmit').then((res) => {
            this.$router.push({path: '/'})
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })
      },
    }
  }
</script>

<style scoped>
  .headers{
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-button{
    color: white;
  }
  .right{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right-distance{
    margin-right: 10px;
  }
  .nickname{
    color: #2c3e50;
    cursor: pointer;
    margin-right: 2px;
  }
</style>
