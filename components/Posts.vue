<template>
  <div class="posts-list">
    <div v-for="(post) in posts" :key="post.id">
      <router-link :to="localizedRoute(`/single-post/${post.id}`)" class="cl-tertiary links">
        {{ post.title }}
      </router-link>
      - {{ post.date | date }}
      <!-- <div class="content" v-html="$options.filters.truncate(post.content, 10, '...')"/> -->
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
  filters: {
    truncate: function (text, length, suffix) {
      return text.substring(0, length) + suffix
    }
  },
  created () {
    this.$store.dispatch('wordpress/loadListOfPosts')
  }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */
  .posts-list {
    margin: 40px 40px 150px 40px;
  }
</style>
