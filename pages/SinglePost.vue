<template>
  <div class="single-post-page">
    Single post page
    <post />
  </div>
</template>

<script>
import Post from '@develodesign/vsf-wp/components/SinglePost'

export default {
  name: 'SinglePost',
  components: { Post }
}
</script>

<style scoped>
  /* Always export scoped styles to not break the app */

</style>
