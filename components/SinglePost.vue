<template>
  <div class="single-post">
    Single post base template
  </div>
</template>

<script>
export const SinglePost = {
  name: 'SinglePost',
  created () {
    this.$store.dispatch('wordpress/loadPost').then(res => {
      debugger
      success(res)
    }).catch(err => {
      failure(err)
    })
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */

</style>