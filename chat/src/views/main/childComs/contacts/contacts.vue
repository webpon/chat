<template>
  <div>
    <contactsList />
    <chatBackground />
  </div>
</template>

<script>
import contactsList from './contactsLists'
import chatBackground from './chatBackground'
export default {
  name: 'contacts',
  data() {
    return {}
  },
  components: { contactsList, chatBackground },
}
</script>

<style scpoed></style>
