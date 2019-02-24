<template>
  <div class="single-post">
    <h1 class="title">{{ title }}</h1>
    <div class="content" v-html="content"/>
  </div>
</template>

<script>
export default {
  name: 'SinglePost',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  created () {
    let self = this
    this.$store.dispatch('wordpress/loadPost').then(res => {
      // debugger
      self.title = res.post.title
      self.content = res.post.content
    }).catch(err => {
      console.error(err)
    })
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */
  .single-post {
    margin: 40px 40px 150px 40px;
  }

</style>
