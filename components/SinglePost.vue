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
  // Server-side only
  // This will be called by the server renderer automatically
  serverPrefetch () {
    // return the Promise from the action
    // so that the component waits before rendering
    return this.fetchPost()
  },
  // Client-side only
  mounted () {
    // If we didn't already do it on the server
    // we fetch the item (will first show the loading text)
    if (!this.title) {
      this.fetchPost()
    }
  },
  methods: {
    fetchPost () {
      let self = this
      return this.$store.dispatch('wordpress/loadPost', { id: this.$route.params.id }).then(res => {
        self.title = res.post.title
        self.content = res.post.content
      }).catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */
  .single-post {
    margin: 40px 40px 150px 40px;
  }

</style>
