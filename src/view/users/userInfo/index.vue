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
            <div>
                 <el-avatar :size="80" src="https://c-ssl.duitang.com/uploads/item/202007/01/20200701063944_5VaBk.thumb.1000_0.jpeg" />
            </div>
        </div>
        <div class="user-detail">
            <div class="title">
               <div>昵称</div>
            </div>
            <div>
                <div>小鲤鱼</div>
            </div>
        </div>        
        <div class="user-detail">
            <div class="title">
                <div>学号</div>
            </div>
            <div>
                <div>11703080220</div>
            </div>
        </div>        
        <div class="user-detail">
            <div class="title">
               <div>班级</div>
            </div>
            <div>
                <div>117030802</div>
            </div>
        </div>        
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        ruleForm:{}
    };
  },


  methods: {}
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
            margin-right: 120px;
        }
    }
</style>