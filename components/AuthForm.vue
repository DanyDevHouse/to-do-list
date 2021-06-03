<template>
<el-row :gutter="20">
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
    :label-position="labelPosition"
    v-if="!isMobileAuth"
  >
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">Log in</el-button>
    </el-form-item>
  </el-form>
   <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="120px"
    class="demo-ruleForm"
    :label-position="labelPosition"
    v-if="isMobileAuth"
  >
    <el-form-item label="Phone number" prop="phone">
      <el-input v-model="ruleForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="Auth code" prop="code" v-if="showCodeField">
      <el-input v-model="ruleForm.code"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="SendCode()" v-if="!showCodeField">Send code</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')" v-if="codeAccept">Log in</el-button>
    </el-form-item>
  </el-form>
  <el-col :span="24" :offset="0">
    <el-button round @click="loginWithGoogle()">Login with Google</el-button>
  </el-col>
  
</el-row>

    
</template>

<style></style>
<script>
export default {
  data() {
    return {
      ruleForm: {
        email: '',
        password: '',
        phone: '',
        code: null
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          }
        ],
        password: [
          {
            required: true,
            message: 'Please input password',
            trigger: 'blur',
          },
          {
            min: 6,
            message: 'Length should be 6',
            trigger: 'blur',
          },
        ],
        phone: [
          {
            required: true,
            message: 'Please input phone number',
            trigger: 'blur',
          },
          {
            min: 12,
          },
          {
              max: 12
          }
        ]
      },
      labelPosition: 'top',
      isMobileAuth: false,
      showCodeField: false,
      codeAccept: false,
      createNewUser: false
    }
  },
  methods: {
   submitForm(formName) {
      this.$refs[formName].validate( (valid) => {
        if (valid) {
          this.$store.dispatch('authorization/LogInByEmail', { email: this.ruleForm.email, password: this.ruleForm.password})
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginWithGoogle(){
      this.$store.dispatch('authorization/LogInByGoogleAccount', window.innerWidth)
    },
    SendCode(){
        if(this.ruleForm.phone != '' && this.ruleForm.phone.length == 12) {
            console.log('send')
            this.showCodeField = true
        }
        
    }
  },
}
</script>
