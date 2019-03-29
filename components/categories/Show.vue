<template>
  <div class="blog-page blog-page-posts-show">
    Hello
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CategoriesShow',
  serverPrefetch () {
    return this.fetchCategory()
  },
  computed: {
    ...mapGetters({
      category: 'wordpress/CURRET'
    }),
    relatedCategories () {
      return null
    }
  },
  filters: {
    prettyDate: function (date) {
      let newDate = new Date(date)
      let dateFormat = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
      return newDate.toLocaleDateString('en-GB', dateFormat)
    }
  },
  // Client-side only
  mounted () {
    if (!this.categories) {
      this.fetchCategory()
    }
  },
  methods: {
    fetchCategory () {
      return this.$store.dispatch('wordpress/loadCategory', { slug: this.$route.params.slug })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../blog/scss/blog';
  @import './scss/category';
</style>
