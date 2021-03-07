<template>
    <div >
      <div class="breadcrumbs" >
        <el-breadcrumb separator="">
          <el-breadcrumb-item :to="{ path: '/management/forms' }">表单库</el-breadcrumb-item>
          <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="operations">
        <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="pageInformations.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="openAdd">添加</el-button>
      </div>
      <div class="all-card">
        <el-card class="box-card" v-for="s in 5" :key="s" shadow="hover">
          <div>
            <div>满意度调查问卷</div>
            <div>发布人:xxxx</div>
            <div style="text-align: center;margin:20px 0">
              <i class="el-icon-document-copy icons"/>
            </div>
            <div class="option-menu">
              <div style="font-size: 12px">发布时间：2020-10-11</div>
              <div>
                <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-setting" />
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>删除</el-dropdown-item>
                    <el-dropdown-item>查看</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </div>
        </el-card>
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
    </div>
</template>

<script>
    export default {
      name: "index",
      data(){
        return{
          pageInformations:{
            pageSize:10,
            currentPage:1,
            academyName: '',
            campus: ''
          },
          total:0,
        }
      },
      methods:{
        handleSizeChange(val) {
          this.pageInformations.pageSize = val;
          this.selectAllAcademy();
        },
        handleCurrentChange(val) {
          this.pageInformations.currentPage = val;
          this.selectAllAcademy();
        },
        onSubmit() {

        },
        openAdd(){
          this.addForm = {};
          this.addFormVisible = true
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
  .all-card{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .box-card{
    width: 20%;
    margin-right: 3%;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .icons{
    font-size: 80px;
  }
  .option-menu{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pagination{
    display: flex;
    justify-content: center;
  }
</style>
