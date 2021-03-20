<template>
  <div class="contacts">
    <h3 class="contactstitle">在线用户{{contacts.length}}</h3>
    <listItem
      v-for="(item, index) in contacts"
      :key="index"
      :contactsInfo="item"
    />
  </div>
</template>

<script>
import listItem from '@/components/common/contactsList/listItem'
export default {
  name: 'contactsList',
  data() {
    return {
      contacts: [],
    }
  },
  components: { listItem },
  created() {
       //获取在线用户列表
      this.$socket.on('sendList', (data)=> {
        console.log(data);
        this.contacts = data
      })
  },
}
</script>

<style scoped>
.contacts {
  width: 250px;
}
.contactstitle {
  height: 40px;
  line-height: 40px;
}
</style>
