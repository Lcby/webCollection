<!--  -->
<template>
  <div>
    <div class="breadcrumbs" >
        <el-breadcrumb separator="">
            <el-breadcrumb-item :to="{ path: '/user/feedback' }">意见反馈</el-breadcrumb-item>
            <el-breadcrumb-item ></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="feedbacks">
      <div class="title">
        你的意见是我们进步最大的动力！！！
      </div>
      <div>
        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="ruleForm">
          <el-form-item label="意见类型" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择意见类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        
          <el-form-item label="意见反馈" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="sidentify">
            <div class="sidentifys">
              <el-input placeholder="请输入验证码" v-model="ruleForm.sidentify" />
              <div @click="refreshCode()" style="cursor:pointer;" >
                <v-sidentify :identifyCode="identifyCode"></v-sidentify>
              </div>
            </div>
          </el-form-item>  
               
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-form>        
      </div>
    </div>
  </div>
</template>

<script>
import Sidentify from './sidentify'
export default {
  data () {
    return {
      ruleForm:{},
      identifyCode: "",
      identifyCodes: ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    };
  },
  components: {
      'v-sidentify':Sidentify 
  },
  mounted(){
   this.refreshCode()
  },
  methods: {
      randomNum(min, max) {
        max = max + 1
        return Math.floor(Math.random() * (max - min) + min);
      },
      // 更新验证码
      refreshCode() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
        console.log('当前验证码:',this.identifyCode);
      },
      // 随机生成验证码字符串
      makeCode(data, len) {
        for (let i = 0; i < len; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length-1)]
        }
      },
      submitForm(formName) {
        console.log(this.ruleForm.sidentify.toLowerCase()==this.identifyCode.toLowerCase());
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }    
  }
}

</script>
<style lang='scss' scoped>
.feedbacks{
  margin: 40px 40% 0 5%;
  .title{
    border-left: 5px solid #0099CC;
    padding-left: 5px;
    margin-bottom: 20px;
  }
  .ruleForm{
    >>>.el-form-item__label{
      font-weight: 700;
    }

    >>>.el-textarea__inner{
      min-height: 150px !important;
    }

    .sidentifys{
      display: flex;
      >>>.el-input{
        width: 170px;
        margin-right: 30px;
      }
    }
  }
}
</style>