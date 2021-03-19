<template>
  <div >
    <div class="breadcrumbs" >
      <el-breadcrumb separator="">
        <el-breadcrumb-item :to="{ path: '/user/personForm' }">个人表单</el-breadcrumb-item>
        <el-breadcrumb-item ></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="operations">
      <el-form :inline="true" :model="pageInformations" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="pageInformations.title" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="范围">
          <el-select v-model="pageInformations.level" placeholder="请选择" clearable>
            <el-option label="校级" value="1"></el-option>
            <el-option label="班级" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="pageInformations.status" placeholder="请选择" clearable>
            <el-option label="已发布" value="1"></el-option>
            <el-option label="停止" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectAllFormsAdmin">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="all-card">
      <el-card class="box-card" v-for="s in this.tableData" :key="s.id">
        <div>
          <router-link :to="{path:'/management/personForm/formDetails',query:{projInfo:{projectName:s.formName,username:adminName,id:s.id}}}">
            <div>
              {{s.formName}}
            </div>
          </router-link>
          <span style="font-size: 12px;color: red" v-if="s.status==2">(已停止)</span>
          <span style="font-size: 12px;color: blue" v-else>(发布中)</span>
          <div style="font-size: 14px;color: #ff8a1b;margin: 5px 0" v-if="s.level==2">班级：{{s.classNum}}</div>
          <div style="font-size: 14px;color: #ff8a1b;margin: 5px 0;" v-else>校级</div>
          <div>发布人:{{adminName}}</div>
          <div style="text-align: center;margin:20px 0">
            <i class="el-icon-document-copy icons"/>
          </div>
          <div class="option-menu">
            <div style="font-size: 12px">发布时间：{{s.publishTime}}</div>
            <div>
              <el-dropdown>
                  <span class="el-dropdown-link">
                    <i class="el-icon-setting" />
                  </span>
                <el-dropdown-menu slot="dropdown">
<!--                  <el-dropdown-item>查看</el-dropdown-item>-->
                  <el-dropdown-item v-if="s.status==2" @click.native="updateStatus(s.id,1)">发布</el-dropdown-item>
                  <el-dropdown-item v-else @click.native="updateStatus(s.id,2)">停止</el-dropdown-item>
<!--                  <el-dropdown-item>删除</el-dropdown-item>-->
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
//   import {personFormJs} from "./personFormJs";
  import {Auth} from "../../../store/user/auth";
  import {Msg} from "../../../tools/message";

  export default {
    name: "personForm",
    data(){
      return{
        adminName:Auth.getUserInfo().nickname,
        pageInformations:{
          pageSize:10,
          currentPage:1,
          title: '',
          level: '',
          status:'',
          adminId:Auth.getUserInfo().id
        },
        tableData:[
            {
                formName:'用户端调查问卷',
                status:1,
                level:2,
                publishTime:'2021-10-11',
                id:'xxcasfcwa'
            }
        ],
        total:0,
      }
    },
    mounted() {
      this.selectAllFormsAdmin();
    },
    methods:{
      selectAllFormsAdmin(){
        personFormJs.selectAllPersonForms(this.pageInformations).then(res=>{
          this.tableData = res.data.data.list;
          this.total = res.data.data.total
        })
      },
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
      updateStatus(id,type){
        console.log("xxx")
        this.$confirm('该操作将改变表单状态, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          personFormJs.updateStatus({id:id,status:type}).then(res=>{
            Msg.success(res.data.message)
            this.selectAllFormsAdmin();
          })
        });
      }
    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: black;
  }
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
