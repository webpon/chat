<template>
  <div class="chatTitle">
    <h3 class="msg_title">
      <a-icon type="left" class="back" @click="back"></a-icon>
      {{ $route.query.userName }}
      <span class="nick" :style="{ color: isOnline ? 'blue' : 'gray' }" v-if="$route.query.userName !== '群聊'">
        <span style="font-size: 10px;">
          {{ isOnline ? '(在线)' : '(离线)' }}
        </span>
      </span>
      <a-select v-show="$route.query.userName === '智能客服'" :value="$store.state.chatAiModel" class="model-select"
        :options="modelOptions" @select="selectChatModel">
      </a-select>
    </h3>
    
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      modelOptions: [
        { label: 'gpt3通用AI', value: 'text-davinci-003' },
        { label: 'chatGPT', value: 'chatgpt' },
        { label: '图片生成Ai', value: 'picture-model' },
      ]
    }
  },
  watch: {
    "$store.state.chatList": {
      handler(newArr) {
        let b = true
        newArr.forEach((item) => {
          if (item.username === this.$route.query.userName) {
            this.$store.commit("updateMsgItemNumber", item)
            b = false
          }
        })
        if (b) {
          this.$router.push({ path: '/chat' });
        }
      },
      deep: true
    }
  },
  components: {},
  methods: {
    selectChatModel(e) {
      this.$store.commit('setChatAiModel', e)
    },
    back() {
      this.$router.push({ path: '/chat' });
    },
  },
  computed: {
    isOnline() {
      let flag = false
      this.$store.state.contacts.forEach(item => {
        if (item.username === this.$route.query.userName) {
          flag = true
        }
      });
      return flag
    },

  }
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .model-select {
    right: 350px;
  }
}
@media screen and (max-width: 750px) {
  .model-select {
    right: 10px;
  }
}
.chatTitle {
  position: fixed;
  z-index: 10;
  top: 0;
  display: flex;
  /* align-items: center; */
  line-height: 66px;
  padding-left: 5px;
  height: 66px;
  width: 100%;
  background-color: #f5f5f5;
  font-size: 20px;
  flex-wrap: 600;
  border-bottom: 3px solid #f0f0f0;
}

.back {
  cursor: pointer;
  padding: 0 10px;
}
.msg_title {
  width: 100%;
}
.model-select {
  width: 120px; 
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}
</style>
