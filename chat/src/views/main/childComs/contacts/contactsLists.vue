<template>
  <div class="contacts">
    <h3 class="contactstitle">在线用户 ({{ $store.state.contacts.length }})</h3>
    <div class="contacts_container" ref="contacts">
      <listItem
        v-for="(item, index) in $store.state.contacts"
        :key="index" :contactsInfo="item" />
    </div>
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
  .contacts_container {
    height: calc(100vh - 50px);
    padding-bottom: 60px;
  }
}

@media screen and (max-width: 750px) {
  .contacts_container {
    height: calc(100vh - 110px);
    padding-bottom: 60px;
  }
}

.contactstitle {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 0;
}

.contacts_container {
  overflow-y: auto;
}
</style>
