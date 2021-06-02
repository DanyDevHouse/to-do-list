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
      codeAccept: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
         const res = this.$fb.auth().signInWithEmailAndPassword(this.ruleForm.email, this.ruleForm.password).then((userCredential) => {
            this.$store.commit('authorization/UserLogged')
            const user = {
              name: userCredential.user.displayName,
              email: userCredential.user.email,
              phoneNumber: userCredential.user.phoneNumber,
              photoURL: userCredential.user.photoURL,
              uid: userCredential.user.uid
            }
            console.log(userCredential.user)
            // document.cookie = `user_token=${base64UrlEncode(user)}; max-age=604800`;
            
          })
          .catch((error) => {
            console.error(error)
          });
          // const res = this.$store.dispatch('authorization/LogIn', { email: this.ruleForm.email, password: this.ruleForm.password})
          console.log(res)
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
