<template>
  <div class="posts-list">
    Posts list base template
  </div>
</template>

<script>
export const Posts = {
  name: 'Posts',
  methods: {
    loadPostsList() {
      this.$store.dispatch('wp/loadPostsList').then(res => {
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