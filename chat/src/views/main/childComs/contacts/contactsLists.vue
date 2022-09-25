<template>
  <div class="contacts">
    <h3 class="contactstitle">在线用户{{$store.state.contacts.length}}</h3>
    <listItem v-for="(item, index) in $store.state.contacts" :key="index" :contactsInfo="item" />
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
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 750px) {
  .contacts {
    width: 250px;
  }
}
.contactstitle {
  height: 40px;
  line-height: 40px;
}
</style>
