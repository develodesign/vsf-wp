<template>
  <div class="single-post">
    Single post base template
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  beforeMount () {
    this.$store.dispatch('wordpress/loadPost').then(res => {
      debugger
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */

</style>
