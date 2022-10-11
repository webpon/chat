<template>
  <div>
    <div v-if="msg.to === $route.query.userName && msg.from !== $store.state.myInfo.username">
      <!-- 群聊别人的信息 -->
      <messageItem :sendmsg="msg" :time="getTime(msg.time)"/>
    </div>
    <div v-else-if="msg.from === $route.query.userName">
      <!-- 别人的信息 -->
      <messageItem :sendmsg="msg" :time="getTime(msg.time)"/>
    </div>
    <div v-else-if="msg.from === $store.state.myInfo.username">
      <!-- 自己的信息 -->
      <sendmessage :sendmsg="msg" :time="getTime(msg.time)"/>
    </div>
  </div>
</template>

<script>
import messageItem from './messageItem.vue'
import sendmessage from './sendmessage.vue'
export default {
  name: '',
  data() {
    return {
      myInfo : JSON.parse(localStorage.myInfo)
    }
  },
  props: {
    msg: {
      type: Object,
      default: {},
    },
  },
  components: {
    messageItem,
    sendmessage,
  },
  methods:{
    getTime(t){
      if (t === undefined){
        return '很久以前'
      }
      //将字符串转换成时间格式
      let timePublish = new Date(t);
      let timeNow = new Date();
      console.log(timePublish,timeNow)
      let minute = 1000 * 60;
      let hour = minute * 60;
      let day = hour * 24;
      let month = day * 30;
      let year = month * 12;
      let diffValue = timeNow - timePublish;
      let diffMonth = diffValue / month;
      let diffWeek = diffValue / (7 * day);
      let diffDay = diffValue / day;
      let diffHour = diffValue / hour;
      let diffMinute = diffValue / minute;
      let diffYear = diffValue / year;
      let result = null
      if (diffValue < 0) {
        result = "刚刚";
      } else if (diffYear > 1) {
        result = parseInt(diffYear) + "年前";
      } else if (diffMonth > 1) {
        result = parseInt(diffMonth) + "月前";
      } else if (diffWeek > 1) {
        result = parseInt(diffWeek) + "周前";
      } else if (diffDay > 1) {
        result = parseInt(diffDay) + "天前";
      } else if (diffHour > 1) {
        result = parseInt(diffHour) + "小时前";
      } else if (diffMinute > 1) {
        result = parseInt(diffMinute) + "分钟前";
      } else {
        result = "刚刚";
      }
      return result;
    }
  }
}
</script>

<style scoped></style>
