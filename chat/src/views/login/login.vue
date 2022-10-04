<template>
  <div style="background:#ECECEC; padding:50px" class="LoginCard">
    <a-card title="登录/注册" :bordered="false" class="card" :hoverable="true">
      <a-form-model ref="ruleForm" class="cardForm" layout="vertical" :model="model" :wrapper-col="{ span: 24 }"
        :rules="rules">
        <a-form-model-item label="用户名" prop="username">
          <a-input size="large" v-model.trim="model.username" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input type="password" size="large" v-model.trim="model.password" @pressEnter="login('ruleForm')" />
        </a-form-model-item>

        <a-form-model-item class="formBtn">
          <a-space :size="80">
            <a-button size="large" @click="register('ruleForm')">注册</a-button>
            <a-button type="primary" size="large" @click="login('ruleForm')">登录</a-button>
          </a-space>
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <div class="avaterSelector" ref="avaterSelector">
      <h3 class="avaterTitle">请选择你的头像</h3>
      <div class="imgContainer">
        <template v-for="(item, index) in imgArr">
          <img :key="index" :src="item" alt="" class="imgItem" :class="imgIndex === index?'imgItemBorder':''"
            @click="selectAvater(index)" ref="avater" />
        </template>
      </div>
      <button class="avaterBtn" @click="avaterRegister">选好了</button>
    </div>
  </div>
</template>
<script>
let imgArr = [
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/0.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/1.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/2.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/3.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/4.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/5.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/6.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/7.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/8.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/9.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/10.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/11.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/12.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/13.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/14.jpg',
  'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/15.jpg',
]
import MD5 from 'md5.js';
export default {
  name: 'Login',
  data() {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      model: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ validator: validateName, trigger: 'change' }],
        password: [
          { validator: validatePass, trigger: 'change' },
          { min: 5, max: 40, message: '密码长度为5-40', trigger: 'change' },
        ],
      },
      formName: null,
      imgUrl: '../../assets/avater/0.jpg',
      imgIndex: ''
    }
  },
  computed: {
    imgArr() {
      return imgArr
    },
  },
  methods: {
    async register(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.$refs.avaterSelector.style.visibility = 'visible'
          this.$refs.avaterSelector.style.top = '50%'
          this.formName = formName
        }
      })
    },
    async login(formName) {
      // 如果form表格里面的数据通过检验，valid则为true，否则为false
      this.$refs[formName].validate(async (valid) => {
        try {
          if (valid) {
            console.log('开始登录')
            //发送post请求
            const res = await this.$http.post('login',
              {
                username: this.model.username,
                password: new MD5().update(this.model.password).digest('hex'),
              }
            )
            localStorage.token = res.data.token
            this.$message.success('登录成功')
            // 请求个人信息
            //把当前登录的用户信息储存到localStorage，以便公用登录用户信息
            localStorage.setItem('myInfo', JSON.stringify(res.data.userInfo))
            this.$store.commit('updateMyInfo', res.data.userInfo)
            this.$router.replace('/chat')
          } else {
            this.$message.error('请正确输入')
            return false
          }
        } catch (error) {
          console.log(error);
        }
      })
    },
    selectAvater(index) {
      console.log(this.$refs.avater[index])
      this.imgUrl =
        'https://webpon-img.oss-cn-guangzhou.aliyuncs.com/avater/avater/' +
        index +
        '.jpg'
      this.imgIndex = index
    },
    async avaterRegister() {
      // 如果form表格里面的数据通过检验，valid则为true，否则为false
      this.$refs[this.formName].validate(async (valid) => {
        // 如果form表格里面的数据通过检验，valid则为true，否则为false
        this.$refs[this.formName].validate(async (valid) => {
          if (valid) {
            try {
              await this.$http.post('create', {
                username: this.model.username,
                password: new MD5().update(this.model.password).digest('hex'),
                imgSrc: this.imgUrl,
              })
              const res = await this.$http.post('login',
                {
                  username: this.model.username,
                  password: new MD5().update(this.model.password).digest('hex'),
                }
              )
              this.$refs.avaterSelector.style.top = '-50%'
              localStorage.token = res.data.token
              localStorage.setItem(
                'myInfo',
                JSON.stringify({
                  username: this.model.username,
                  msg: 'Hi',
                  imgSrc: this.imgUrl,
                })
              )
              this.$store.commit('updateMyInfo', {
                username: this.model.username,
                msg: 'Hi',
                imgSrc: this.imgUrl,
              })
              setTimeout(() => {
                this.$message.success('注册成功，并完成自动登录')
                this.$router.replace('/chat')
              }, 300)
            } catch (error) {
              this.$refs.avaterSelector.style.top = '-50%'
            }
          } else {
            this.$message.error('请正确输入')
            this.$refs.avaterSelector.style.top = '-50%'
          }
        })
      })
    },
  },
}
</script>
<style scoped>
.LoginCard {
  width: 100%;
  height: 100vh;
}

@media screen and (min-width: 750px) {
  .card {
    width: 600px;
  }

  ::v-deep .card .ant-card-body {
    padding: 24px 70px;
  }

  .avaterSelector {
    width: 600px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 55px;
  }
}

@media screen and (max-width: 750px) {
  .card {
    width: 300px;
  }

  .avaterSelector {
    width: 350px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 55px;
  }

  .imgContainer {
    width: 300px;
  }
}

.card {
  height: 365px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.card .cardForm {
  margin: 0 auto;
}

.avaterSelector {
  position: fixed;
  background-color: #fff;
  box-shadow: 0px 0px 10px #888888;
  top: -50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.8s;
  visibility: hidden;
  display: flex;
}

.avaterTitle {
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  font-weight: 700;
}

.avaterBtn {
  width: 100px;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #333;
  position: absolute;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 图片设置 */
.imgItem {
  width: 75px;
  height: 75px;
  box-sizing: border-box;
}

.imgItemBorder {
  border: 1px solid red;
}
</style>
<style>
.card .ant-card-head-title {
  font-weight: 800;
  font-size: 18px;
}

.card .ant-form-item-label label {
  font-weight: 500;
  font-size: 16px;
}

.cardForm .ant-form-item {
  margin-bottom: 20px;
}

.formBtn .ant-form-item-control-wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
</style>
