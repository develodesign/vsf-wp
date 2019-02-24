<template>
  <div class="posts-list">
    <div v-for="(post) in posts" :key="post.id">
      {{ post.title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Posts',
  computed: {
    ...mapGetters({
      posts: 'wordpress/posts'
    })
  },
  created () {
    this.$store.dispatch('wordpress/loadListOfPosts')
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */

</style>
