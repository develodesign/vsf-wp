<template>
  <div class="single-post">
    {{ title }}
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  data () {
    return {
      title: ''
    }
  },
  created () {
    let self = this
    this.$store.dispatch('wordpress/loadPost').then(res => {
      self.title = res.post.title
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */

</style>
