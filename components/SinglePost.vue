<template>
  <div class="single-post">
    Single post base template
  </div>
</template>

<script>
export const SinglePost = {
  name: 'SinglePost',
  methods: {
    loadPostData() {
      this.$store.dispatch('wp/loadPost').then(res => {
        success(res)
      }).catch(err => {
        failure(err)
      })
    }
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */

</style>