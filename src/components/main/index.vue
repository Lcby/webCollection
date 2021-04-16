<template>
  <el-container style="height:100%">
    <el-aside width="200px" style="height:100%">
      <el-menu
      v-if="type===1"
        :router = 'true'
        style="height:100%"
        default-active="/management"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/management">
          <i class="el-icon-school"></i>
          <span slot="title">学院管理</span>
        </el-menu-item>
        <el-menu-item index="/management/grade">
          <i class="el-icon-office-building"></i>
          <span slot="title">年级管理</span>
        </el-menu-item>
        <el-menu-item index="/management/class">
          <i class="el-icon-house"></i>
          <span slot="title">班级管理</span>
        </el-menu-item>
        <el-menu-item index="/management/users">
          <i class="el-icon-user-solid"></i>
          <span slot="title">成员管理</span>
        </el-menu-item>
        <el-menu-item index="/management/personForm">
          <i class="el-icon-folder"></i>
          <span slot="title">个人表单</span>
        </el-menu-item>
<!--        <el-menu-item index="/management/forms">-->
<!--          <i class="el-icon-folder-opened"></i>-->
<!--          <span slot="title">表单库</span>-->
<!--        </el-menu-item>-->
        <el-menu-item index="/management/feedback">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">意见反馈</span>
        </el-menu-item>
      </el-menu>
  <!-- 用户栏***************************************** -->
      <el-menu
      v-else
        :router = 'true'
        style="height:100%"
        default-active="/user"
        @open="handleOpen"
        @close="handleClose">
        <el-menu-item index="/user">
          <i class="el-icon-school"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/user/personForm">
          <i class="el-icon-office-building"></i>
          <span slot="title">表单管理</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">意见反馈</span>
        </el-menu-item>
      </el-menu>      
    </el-aside>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
    import {Auth} from "../../store/user/auth";
    export default {
      name: "index",
      data(){
        return{
          type:Auth.getUserInfo().type
        }
      },
      methods: {
        created () {
         
        },
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
