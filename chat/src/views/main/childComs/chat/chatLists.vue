<template>
  <div class="list_warper">
    <div class="msg_container">
      <div class="formContainer">
        <a-input placeholder="搜索">
          <a-icon slot="prefix" type="search" />
        </a-input>
        <div class="plus">
          <a-icon slot="prefix" type="plus" class="test" />
        </div>
      </div>
    </div>
    <div class="listContainer">
      <div v-for="(item, index) in $store.state.chatList" :key="index">
        <listItem :userInfo="item" />
        <div class="line" v-show="index !== $store.state.chatList.length - 1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import listItem from '@/components/common/list/listItem'
export default {
  name: '',
  components: {
    listItem,
  },
  methods: {
    active() {
      console.log(this.$store.state.isMobile)
    },
  },
  beforeDestroy() {
    //移除监听事件"aMsg"
    this.bus.$off('chatUser')
    //移除监听事件,避免重复监听
    console.log('beforeDestroy');
    // this.$socket.off('emitEvent');
  },
}
</script>

<style scoped lang="scss">
@media screen and (max-width: 750px) {
  .line {
    height: 1px;
    background-color: #eee;
    margin-left: 65px;
    z-index: 100;
  }

  .listContainer {
    background-color: #fff;
  }
}

.plus {
  width: 28px;
  height: 28px;
  padding-top: 3px;
  background-color: #eae8e7;
  border-radius: 5px;
  margin-left: 10px;

  .anticon-plus {
    position: relative;
    left: 1px;
    top: 1px;
  }
}
</style>
<style scoped>
.msg_container {
  display: flex;
  padding: 24px 5px 13px 7.5px;
  background-color: #fffbfb;
}

.formContainer {
  display: flex;
  width: 100%;
}

.ant-input-affix-wrapper {
  width: 80%;
}

.list_warper .ant-input {
  height: 28px !important;
  background-color: #eae8e7 !important;
  border-radius: 6px !important;
}

.anticon-plus {
  width: 26px;
  height: 26px;
}

.anticon-search {
  position: absolute;
  top: -7px;
  left: -7px;
}

.list_warper {
  height: 100vh;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;
  font-size: 0.7rem;
  font-family: '\5FAE\8F6F\96C5\9ED1', Helvetica, '黑体', Arial, Tahoma;
  position: relative;
  z-index: 100;
}

/*滚动条样式*/
.list_warper::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

.list_warper::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  height: 4px;
}

.list_warper::-webkit-scrollbar-track {
  -weblist_warperkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
  height: 4px;
}
</style>
