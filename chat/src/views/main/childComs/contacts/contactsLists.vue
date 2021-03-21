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
        this.contacts = data
        console.log(data);
        this.$store.commit('updateContacts',data)
        console.log(this.$store.state.contacts);
      })
  },
  watch:{
    contacts(newData,oldData){
      
    }
  },
  destroyed() {
     //移除监听事件,避免重复监听
    console.log('beforeDestroy');
    this.$socket.off('sendList');
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
